import { db } from "@/db"
import { auth } from "@/lib/auth"
import { NextRequest, NextResponse } from "next/server"
import { profile } from "@/db/schema"
import { generateUUID } from "@/lib/helpers"
import { registerUserWithEmailUseCase } from "@/app/layers/application/use-cases/user"

export async function POST(req: NextRequest){
    try{
        const {name,lastName,email,password, confirmPassword} = await req.json()

        console.log("DATA FROM FRONTEND",name,lastName,email,password,confirmPassword)
        
        const {profile,user} = await registerUserWithEmailUseCase({
            name,
            email,
            password
        })
        console.log("DATAB FROM REGISTER",profile,user)

        const response = NextResponse.json({
            success:true,
            message: "Usuario creado",
            token: user.token,
            user,
            profile,
        })
        // const clientType = req.headers.get("X-Client-Type")
        // if(clientType === 'web'){
        //     for(const cookie of result.cookies){
        //         response.headers.append("Set-Cookie",cookie)
        //     }
        // }
        return response;

    }catch(error){
        console.error("API ERROR", error)
        return NextResponse.json(
            { error: "Error inesperado", message: (error as any)?.message },
            { status: 500 }
        )
    }
}