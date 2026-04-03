import {Pool} from "pg"

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10, 
  idleTimeoutMillis: 30000, 
});

pool.query("SELECT NOW()").then(() => {
    console.log("Database connected")
    }).catch((err) => {
        console.error("Database connection failed", err.message)
        process.exit(1)
})

export default pool