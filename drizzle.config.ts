import { defineConfig } from 'drizzle-kit'

const DB_URL = process.env.DATABASE_URL!;

export default defineConfig({
    schema: './src/db/schema.ts',
    out: './drizzle/migrations',
    dialect: 'postgresql',
    dbCredentials: {
        url:  DB_URL
    }
})