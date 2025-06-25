import { auth } from "@/lib/auth";
import { RegisterEmailUserAdapter } from "../dto/user-dto";
import { generateUUID } from "@/lib/helpers";
import { db } from "@/db";
import { profile, session, user } from "@/db/schema";
import { deleteUserSession, getUserByEmail, registerUserWithEmail, signUpUserWithEmail } from "../data-access/user";
import { createProfile } from "../data-access/profile";
import { AuthError, credError } from "../../../../lib/errors/AuthErrors";


export const registerUserWithEmailUseCase = async({email,name,lastName,password}:RegisterEmailUserAdapter) => {
    
    const prevUser = await getUserByEmail(email)
    if(prevUser){
        throw new Error('Este email ya se está utilizando..')
    }
    
    const user = await registerUserWithEmail({name,email,password})

    const id = generateUUID()
    const profile = await createProfile({
        id,
        userId:user.user.id,
        name,
        lastName: lastName ? lastName : '',
        email: user.user.email,
    })

    return {profile,user}
}

export const deleteUserSessionUseCase = async(token:string) => {
    await deleteUserSession(token)
}

export const userLoginWithEmailUseCase = async({email,password}:{email:string,password:string}) => {
    const user = await getUserByEmail(email)
    if(!user){
        throw new AuthError()
    }

    const loggedUser = await signUpUserWithEmail({email,password})
    if(!loggedUser){
        throw new credError()
    }
    return loggedUser
}