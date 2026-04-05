import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import authRouter from './routes/auth.route.js'
import userRouter from './routes/users.route.js'
import recordsRouter from './routes/records.route.js'
import dashboardRouter from './routes/dashboard.route.js'
import errorHandler from './middleware/errorHandler.js'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use(helmet())

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/records', recordsRouter)
app.use('/api/v1/dashboard', dashboardRouter)

app.use(errorHandler)

export default app