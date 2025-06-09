export interface CreateCourse{
    title:string;
    description:string;
    category?:string;
}

export interface searchCourses {
    query?:string;
    category?:string;
}



export const courseSearchAdapter = (req: Request) => {
    const url = new URL(req.url) || null
    const id = url.searchParams.get('id') || undefined
    const category = url.searchParams.get('category') || undefined

    return { id, category} as searchCourses
}


export const optionalSearch = async(req:Request) => {
    const {searchParams} = new URL(req.url)
    const query = searchParams.get('query')?.trim() || undefined
    const category = searchParams.get('category')?.trim() || undefined

    return {query, category}
}