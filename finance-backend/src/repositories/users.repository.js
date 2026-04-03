import pool from '../config/pool.js'

export async function getAllUsers() {
    const res = await pool.query('SELECT id, name, email, role, is_active, created_at FROM users')
    return res.rows
}

export async function getUserById(id) {
    const res = await pool.query('SELECT id, name, email, role, is_active, created_at FROM users WHERE id = $1', [id])
    return res.rows[0]
}

export async function createUser(name, email, hashedPassword, role) {
    const res = await pool.query(
        'INSERT INTO users(name, email, password, role) VALUES($1, $2, $3, $4) RETURNING id, name, email, role',
        [name, email, hashedPassword, role]
    )
    return res.rows[0]
}

export async function updateUser(id, fields) {
    const keys = Object.keys(fields)
    const values = Object.values(fields)
    const setClause = keys.map((key, i) => `"${key}" = $${i + 1}`).join(', ')
    const res = await pool.query(
        `UPDATE users SET ${setClause}, updated_at = current_timestamp WHERE id = $${keys.length + 1} RETURNING id, name, email, role`,
        [...values, id]
    )
    return res.rows[0]
}

export async function updateUserStatus(id, isActive) {
    const res = await pool.query(
        'UPDATE users SET is_active = $1, updated_at = current_timestamp WHERE id = $2 RETURNING id, name, email, role, is_active',
        [isActive, id]
    )
    return res.rows[0]
}

export async function deleteUser(id) {
    await pool.query('DELETE FROM users WHERE id = $1', [id])
}