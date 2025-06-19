import { deleteUserSessionUseCase } from "@/app/layers/application/use-cases/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    try{
        const authHeader = req.headers.get('authorization')
        const token = authHeader?.split(' ')[1]

        if(!token){
            return NextResponse.json({success:false, message:'Token no proporcionado'},{status:400})
        }

        await deleteUserSessionUseCase(token)

        return NextResponse.json({
            success:true,
            message: "Sesion cerrada exitosamente..."
        })
    }catch(error){
        console.error('API ERROR',error)
        return NextResponse.json({
            success: false,
            message: 'Error al cerrar sesión',
            error: (error as any).message || 'Error desconocido'
        },{
            status: 500
        })
    }
}