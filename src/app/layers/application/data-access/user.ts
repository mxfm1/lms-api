import { auth } from "@/lib/auth"
import { RegisterEmailUserAdapter, SignInUserEmailAdapter } from "../dto/user-dto"
import { db } from "@/db"
import { eq } from "drizzle-orm"
import { user } from "@/db/schema"
import { credError } from "@/lib/errors/AuthErrors"

const isDev = process.env.NODE_ENV === 'development'

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


export const signUpUserWithEmail = async({email,password}:SignInUserEmailAdapter) => {
    try{
        return await auth.api.signInEmail({
        body:{
            email,password
        }
    })
    }catch(error:any){
        if(!isDev){
            if(error.statusCode === '401'){
                throw new credError()
            }
            throw new credError("No se pudo iniciar sesión. Intenta nuevamente mas tarde")
        }else{
            console.log("API ERROR",error)
            if(error.statusCode === 401 ){
                throw new credError()
            }
            throw new credError("No se pudo iniciar sesión. Intenta nuevamente mas tarde")
        }
    }
}