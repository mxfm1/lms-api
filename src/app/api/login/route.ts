import { getUserByEmail } from "@/app/layers/application/data-access/user"
import { registerUserWithEmailUseCase, userLoginWithEmailUseCase } from "@/app/layers/application/use-cases/user"
import { loginPresenter } from "@/app/layers/presenter/user"
import { NextResponse } from "next/server"

export async function POST(req:Request){
    try{
        const { email,password} = await req.json()
        console.log("DATA FROM FRONTEND",email,password)
        const signUpUser = await userLoginWithEmailUseCase({email,password})

        const safeData = loginPresenter(signUpUser)

        const response = NextResponse.json({
            success:true,
            data: safeData,
            message: 'Iniciaste sesión'
        })
        
        // para usuarios web

        // response.cookies.set('auth_token',safeData.token.token,{
        //     httpOnly: true,
        //     secure:true,
        //     path:"/",
        //     sameSite:'lax',
        //     maxAge: 60 * 60 * 24 * 7
        // })
        return response
    }   
    catch(error:any){
        console.log("API ERROR",error)
        return NextResponse.json({
            success:false,
            message: error.message || 'Error Inesperado en la api de login'
        },{
            status:401
        })
    }
}