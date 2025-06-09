import { courseSearchAdapter, optionalSearch } from "@/app/layers/application/dto/course-dto"
import { NextRequest } from "next/server"

export async function GET(req: NextRequest,{params}:{params:{id:string}}){
    try{
        const courseId = params.id
        const data = optionalSearch(req)
        
    }catch(error){  
        console.log('API ERROR',error)
    }
}