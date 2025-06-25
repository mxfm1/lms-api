import { Course } from "../../entities/course";

export interface CourseRepository{
    getCourses: () => Promise<Course[]>,
    getCourseById:(id:string) => Promise<Course>
}