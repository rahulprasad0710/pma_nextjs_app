import "dotenv/config";

import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

const database_url = process.env.DATABASE_URL!;

// Create connection pool
const pool = new Pool({
    host: "pmafinal2025.cj0ays22qf3h.ap-south-1.rds.amazonaws.com",
    port: 5432,
    database: "pmaFinal2025", // Remove leading slash
    user: "postgres",
    password: "rahul99awsdb",
    ssl: {
        rejectUnauthorized: false,
    },
});

// Enhanced drizzle client with better error handling
export const db = drizzle(pool, {
    logger: true, // Enable query logging for debugging
});
