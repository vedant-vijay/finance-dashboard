import pool from '../config/pool.js'

export async function findUserByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1'
    const res = await pool.query(query, [email])
    return res.rows[0]
}

export async function createUser(name, email, hashedPassword, role) {
    const query = 'INSERT INTO users(name, email, password, role) VALUES($1, $2, $3, $4) RETURNING name, email, role'
    const res = await pool.query(query, [name, email, hashedPassword, role])
    return res.rows[0]
}

export async function updateRefreshToken(userId, refreshToken) {
    const query = 'UPDATE users SET refresh_token = $1 WHERE id = $2'
    await pool.query(query, [refreshToken, userId])
}

export async function findUserByRefreshToken(refreshToken) {
    const query = 'SELECT * FROM users WHERE refresh_token = $1'
    const res = await pool.query(query, [refreshToken])
    return res.rows[0]
}