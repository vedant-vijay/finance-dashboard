import pool from '../config/pool.js'

export async function getRecordById(id){
    const query = 'SELECT id, user_id, amount, type, category, date::text as date, notes, created_at, updated_at FROM financial_records where id = $1 AND deleted_at IS NULL'
    const res = await pool.query(query, [id])

    return res.rows[0]
}

export async function createRecord(userId, amount, type, category, date, notes) {
    const query = `
        INSERT INTO financial_records(user_id, amount, type, category, date, notes) 
        VALUES($1, $2, $3, $4, $5, $6) 
        RETURNING id, user_id, amount, type, date::text as date, category, notes, created_at, updated_at
    `
    const res = await pool.query(query, [userId, amount, type, category, date, notes])
    return res.rows[0]
}

export async function updateRecord(id, fields) {
    const keys = Object.keys(fields)
    if (keys.length === 0) throw new Error('No fields to update')
    const values = Object.values(fields)
    const setClause = keys.map((key, i) => `"${key}" = $${i + 1}`).join(', ')
    const res = await pool.query(
        `UPDATE financial_records SET ${setClause}, updated_at = current_timestamp 
        WHERE id = $${keys.length + 1} AND deleted_at IS NULL 
        RETURNING id, user_id, amount, type, date::text as date, category, notes, created_at, updated_at`,
        [...values, id]
    )
    return res.rows[0]
}

export async function softDeleteRecord(id) {
    await pool.query(
        'UPDATE financial_records SET deleted_at = current_timestamp WHERE id = $1',
        [id]
    )
}

export async function getAllRecords(filters = {}) {
    const { type, category, from, to, page = 1, limit = 10 } = filters
    const conditions = ['deleted_at IS NULL']
    const values = []

    if (type) {
        values.push(type)
        conditions.push(`type = $${values.length}`)
    }
    if (category) {
        values.push(category)
        conditions.push(`category = $${values.length}`)
    }
    if (from) {
        values.push(from)
        conditions.push(`date >= $${values.length}`)
    }
    if (to) {
        values.push(to)
        conditions.push(`date <= $${values.length}`)
    }

    const offset = (page - 1) * limit
    values.push(limit, offset)

    const query = `
        SELECT id, user_id, amount, type, category, date::text as date, notes, created_at, updated_at 
        FROM financial_records
        WHERE ${conditions.join(' AND ')}
        ORDER BY date DESC
        LIMIT $${values.length - 1} OFFSET $${values.length}
    `

    const res = await pool.query(query, values)
    return res.rows
}
