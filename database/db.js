import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
    user: "postgres",
    password: process.env.DATABASE_PASSWORD, 
    host: "localhost",
    port: 5432,
    database: "etracker",
});

export default pool;