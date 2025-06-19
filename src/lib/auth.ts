import { db } from '@/db'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'

export const auth = betterAuth({
    database: drizzleAdapter(db,{
        provider: "pg"
    }),
    emailAndPassword:{
        enabled:true,
        minPasswordLength: 8,
        maxPasswordLength: 128,
        autoSignIn: true
    },
    account: {
        accountLinking: {
            enabled: true
        }
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }
    }
})