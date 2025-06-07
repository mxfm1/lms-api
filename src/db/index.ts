import postgres from "postgres"
import { drizzle } from 'drizzle-orm/postgres-js'


const DB_URL = process.env.DATABASE_URL!
const isProd = process.env.NODE_ENV === 'production'

if(!DB_URL){
    throw new Error('No database url provided. needed for use')
}

export const client = postgres(DB_URL,{
    ssl: isProd
})

const db = drizzle(client)
export {db, DB_URL}

