import { Redis } from "@upstash/redis"
import { Hono } from "hono"
import { env } from "hono/adapter"
import { generateUUID, hashPassword } from "@/lib/helpers"
import { handle } from "hono/vercel"

export const runtime = 'edge'
export type EnvConfig = {
    UPSTASH_REDIS_REST_TOKEN: string;
    UPSTASH_REDIS_REST_URL:string;
}

const app = new Hono() // Sin basePath

app.post('/', async (c) => { // ruta raíz
    try {
        const { UPSTASH_REDIS_REST_TOKEN, UPSTASH_REDIS_REST_URL } = env<EnvConfig>(c)
        const body = await c.req.json()
        const { name, email, password } = body

        if (!name || !email || !password) {
            return c.json({ message: 'Missing required fields' }, { status: 400 })
        }

        const redis = new Redis({
            url: UPSTASH_REDIS_REST_URL,
            token: UPSTASH_REDIS_REST_TOKEN
        })
        const userId = generateUUID()
        console.log("CREATED USER ID", userId)
        const hashedPw = await hashPassword(password)

        if (!hashedPw) {
            return c.json({ message: 'There was an error creating this user, please try again later' }, { status: 400 })
        }

        const newUser = {
            name,
            email,
            password: hashedPw
        }
        const user = await redis.hset(userId, newUser)

        return c.json({
            message: 'user created successfully',
            user,
        }, {
            status: 200
        })
    } catch (error) {
        console.error("HUBO UN ERROR", error)
        return c.json({ message: 'Internal Server Error' }, { status: 500 })
    }
})

export async function POST(req: Request) {
    // Aquí Next.js manda un POST a /api/user y delegamos a Hono
    return handle(app)(req)
}
