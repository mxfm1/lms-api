export type ProfileUser = {
    id:string;
    userId:string;
    name:string;
    lastName:string;
    profileImage?:string
    email?:string;
    
    // OPTIONALS
    company?:string;
    jobName?:string;
}