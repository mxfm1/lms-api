import { getCourses, SearchCourses } from "../../infraestructure/repositories/courses";
import { searchCourses } from "../dto/course-dto";

export const searchCoursesUseCase = async(dto:searchCourses) => {
    const {query,category} =  dto 
    if(!query || !category){
        return await getCourses()
    }
    return await SearchCourses({query,category})
}