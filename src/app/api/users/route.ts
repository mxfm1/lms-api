import { getCourses } from "@/app/layers/infraestructure/repositories/courses"

export async function GET(req:Request){
    try{

        const courses = await getCourses()
        // if(!courses){
        //     return new Response(JSON.stringify({"message":'There was a mistake retreiving the data'}))
        // }
        return new Response(JSON.stringify(courses))
    }catch(error){
        console.log("ERROR FROM API",error)
    }
}