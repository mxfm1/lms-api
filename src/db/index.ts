import postgres from "postgres"
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from './schema'
import {neon} from '@neondatabase/serverless'

const DB_URL = process.env.DATABASE_URL!
const isProd = process.env.NODE_ENV === 'production'

if(!DB_URL){
    throw new Error('No database url provided. needed for use')
}

export const client = postgres(DB_URL,{
    ssl: true
})
const sql = neon(DB_URL)
const db = drizzle(sql)

export {db}

