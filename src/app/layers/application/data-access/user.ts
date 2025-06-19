import { auth } from "@/lib/auth"
import { RegisterEmailUserAdapter } from "../dto/user-dto"
import { db } from "@/db"
import { eq } from "drizzle-orm"
import { user } from "@/db/schema"

export const deleteUserSession = async(token:string) => {
    await auth.api.revokeSession({
        body:{
            token: token
        },
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const registerUserWithEmail = async({name,email,password}:RegisterEmailUserAdapter) => {
    return await auth.api.signUpEmail({
        body: {
            name,
            email,
            password
        }
    })
}

export const getUserByEmail = async(email:string) => {
    return await db.query.user.findFirst({
        where: eq(user.email,email)
    })
}