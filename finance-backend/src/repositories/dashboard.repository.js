import pool from '../config/pool.js'

export async function getSummary() {
    const res = await pool.query(`
        SELECT
            COALESCE(SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END), 0) AS total_income,
            COALESCE(SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END), 0) AS total_expenses,
            COALESCE(SUM(CASE WHEN type = 'income' THEN amount ELSE -amount END), 0) AS net_balance
        FROM financial_records
        WHERE deleted_at IS NULL
    `)
    return res.rows[0]
}

export async function getCategoryTotals() {
    const res = await pool.query(`
        SELECT category, type,
            SUM(amount) AS total
        FROM financial_records
        WHERE deleted_at IS NULL
        GROUP BY category, type
        ORDER BY total DESC
    `)
    return res.rows
}

export async function getTrends() {
    const res = await pool.query(`
        SELECT
            TO_CHAR(DATE_TRUNC('month', date), 'YYYY-MM') AS month,
            type,
            SUM(amount) AS total
        FROM financial_records
        WHERE deleted_at IS NULL
        AND date >= NOW() - INTERVAL '6 months'
        GROUP BY month, type
        ORDER BY month ASC
    `)
    return res.rows
}

export async function getRecentActivity() {
    const res = await pool.query(`
        SELECT id, user_id, amount, type, category, date::text as date, notes, created_at
        FROM financial_records
        WHERE deleted_at IS NULL
        ORDER BY created_at DESC
        LIMIT 10
    `)
    return res.rows
}