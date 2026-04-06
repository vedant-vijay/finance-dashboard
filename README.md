# Finance Backend 

A production-grade REST API for a finance dashboard system with role-based access control, financial record management, and analytics.

---

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL
- **Authentication:** JWT (access token + refresh token via httpOnly cookie)
- **Validation:** Zod
- **Migration:** node-pg-migrate

---

## Prerequisites

- Node.js v18+
- PostgreSQL running locally

---

## Setup

**1. Clone the repository**
```bash
git clone <repository-url>
cd finance-backend
```

**2. Install dependencies**
```bash
npm install
```

**3. Create a PostgreSQL database**
```bash
psql -U postgres
CREATE DATABASE finance_db;
\q
```

**4. Configure environment variables**

Create a `.env` file in the root directory:
```env
PORT=3000
DATABASE_URL=postgres://postgres:yourpassword@localhost:5432/finance_db
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=15m
JWT_REFRESH_SECRET=your_jwt_refresh_secret_key
JWT_REFRESH_EXPIRES_IN=7d
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

**5. Run migrations**
```bash
npm run migrate:up
```

**6. Start the server**
```bash
npm start
```

Server runs at `http://localhost:3000`

---

## Roles

| Role | Permissions |
|------|-------------|
| `viewer` | View records, view dashboard |
| `analyst` | Viewer + create and update records |
| `admin` | Analyst + delete records, manage users |

---

## API Endpoints

All endpoints are prefixed with `/api/v1`.

Authenticated routes require:
```
Authorization: Bearer <accessToken>
```

---

### Auth

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/auth/register` | Public | Register a new user |
| POST | `/auth/login` | Public | Login and get tokens |
| POST | `/auth/refresh` | Public | Get new access token via refresh token cookie |
| POST | `/auth/logout` | Authenticated | Logout and clear refresh token |

**Register**
```json
POST /api/v1/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456",
  "role": "viewer"
}
```

**Login**
```json
POST /api/v1/auth/login
{
  "email": "john@example.com",
  "password": "123456"
}
```

---

### Users

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/users/me` | Authenticated | Get own profile |
| GET | `/users` | Admin | Get all users |
| GET | `/users/:id` | Admin | Get user by ID |
| POST | `/users` | Admin | Create a user |
| PATCH | `/users/:id` | Admin | Update user name, email or role |
| PATCH | `/users/:id/status` | Admin | Activate or deactivate user |
| DELETE | `/users/:id` | Admin | Delete a user |

**Create User**
```json
POST /api/v1/users
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "123456",
  "role": "analyst"
}
```

**Update User**
```json
PATCH /api/v1/users/:id
{
  "name": "Updated Name",
  "role": "admin"
}
```

**Update Status**
```json
PATCH /api/v1/users/:id/status
{
  "isActive": false
}
```

---

### Records

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/records` | Viewer+ | Get all records with optional filters |
| GET | `/records/:id` | Viewer+ | Get record by ID |
| POST | `/records` | Analyst, Admin | Create a record |
| PATCH | `/records/:id` | Analyst, Admin | Update a record |
| DELETE | `/records/:id` | Admin | Soft delete a record |

**Create Record**
```json
POST /api/v1/records
{
  "amount": 5000,
  "type": "income",
  "category": "salary",
  "date": "2025-01-15",
  "notes": "January salary"
}
```

**Filters on GET /records**
```
/api/v1/records?type=income
/api/v1/records?category=salary
/api/v1/records?from=2025-01-01&to=2025-12-31
/api/v1/records?page=1&limit=10
```

---

### Dashboard

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/dashboard/summary` | Viewer+ | Total income, expenses and net balance |
| GET | `/dashboard/categories` | Viewer+ | Totals grouped by category and type |
| GET | `/dashboard/trends` | Viewer+ | Monthly totals for last 6 months |
| GET | `/dashboard/recent` | Viewer+ | Last 10 financial records |

---

## Project Structure

```
finance-backend/
├── src/
│   ├── config/
│   │   └── pool.js            # PostgreSQL connection pool
│   ├── repositories/          # Direct database queries
│   ├── services/              # Business logic
│   ├── controllers/           # Request and response handling
│   ├── routes/                # Route definitions
│   ├── middleware/
│   │   ├── auth.js            # JWT authentication
│   │   ├── roleGuard.js       # Role-based access control
│   │   ├── validate.js        # Zod request validation
│   │   ├── rateLimiter.js     # Rate limiting
│   │   └── errorHandler.js    # Global error handler
│   ├── schemas/               # Zod validation schemas
│   ├── utils/
│   │   ├── jwt.js             # JWT sign and verify helpers
│   │   └── response.js        # Standardized response helpers
│   └── app.js                 # Express app setup
├── migrations/                # SQL migration files
├── server.js                  # Entry point
├── .env.example
└── package.json
```

---

## Authentication Flow

- On login, an **access token** (15 minutes) is returned in the response body
- A **refresh token** (7 days) is set as an `httpOnly` cookie automatically
- Use the access token in the `Authorization` header for all protected routes
- When the access token expires, call `POST /api/v1/auth/refresh` — the refresh token cookie is sent automatically by the browser
- On logout, the refresh token cookie is cleared and the token is invalidated in the database

---

## Assumptions

- Role assignment during registration is optional — defaults to `viewer` if not provided
- Deleted records are soft deleted via `deleted_at` timestamp and excluded from all queries
- Rate limiting is applied globally at 100 requests per 15 minutes, and stricter at 10 requests per 15 minutes on auth endpoints
- Pagination defaults to page 1 with 10 records per page if not specified
- Redis-based access token blacklisting is not implemented — access tokens are short-lived (15 minutes) to minimize risk window on logout

---

## npm Scripts

```bash
npm start              # Start the server
npm run migrate:up     # Run all pending migrations
npm run migrate:create <name>  # Create a new migration file
```