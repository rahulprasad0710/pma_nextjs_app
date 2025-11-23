import "dotenv/config";

import { defineConfig } from "drizzle-kit";

console.log({
    DATABASE_URL: process.env.DATABASE_URL,
});
export default defineConfig({
    out: "./src/db",
    schema: "./src/db/schema.ts",
    dialect: "postgresql",

    dbCredentials: {
        url: process.env.DATABASE_URL!,
        ssl: {
            rejectUnauthorized: false, // This allows self-signed certificates
        },
    },
});
