import { db } from "@/db";
import { and, eq, ilike } from "drizzle-orm";
interface searchOptions{
    query?:string;
    category:string;
}

export const SearchCourses = async({
    query,
    category
}:searchOptions) => {
    const filters = []

    // if(query){
    //     filters.push(ilike(courses.title,`${query}`))
    // }

    // if(category){
    //     filters.push(eq(courses.category,category))
    // }

    // return await db.select().from(courses).where(
    //     filters.length > 0 ? and(...filters) : undefined
    // ).execute()
}

export const getCourses = async() => {
    return 
}
