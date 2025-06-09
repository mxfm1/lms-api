// /src/app/api/course/route.ts

import { courseSearchAdapter, optionalSearch } from "@/app/layers/application/dto/course-dto"
import { searchCoursesUseCase } from "@/app/layers/application/use-cases/courses"
import { getCourses } from "@/app/layers/infraestructure/repositories/courses"

export const runtime = 'edge'

// export async function POST(req: Request) {
//   const body = await req.json()
//   console.log("POST /api/course received:", body)
//   return new Response(JSON.stringify({ message: "ok", data: body }), {
//     status: 200,
//     headers: { "Content-Type": "application/json" }
//   })
// }


// export async function POST(req:Request){
//     try{
//         const body = await req.json()
//         console.log("API CONTENT",body)
//         return new Response(JSON.stringify({message:'ok',data:body}))
//     }catch(error){
//         console.log('Error')
//         return new Response()
//     }
// }


export async function GET(req:Request){
    try{
        // const courses = await getCourses()
        // if(!courses){
        //     return new Response(JSON.stringify({message:"Error retreiving the data"}))
        // }
        // return new Response(JSON.stringify(courses))
    }catch(error){
        console.log("API ERROR",error)
        return new Response(JSON.stringify({error:error}))
    }
}