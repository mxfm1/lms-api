import { db } from "@/db"
import { profile } from "@/db/schema"
import { ProfileUser } from "../dto/profile"

export const createProfile = async({
    id,
    name,
    userId,
    lastName,
    profileImage,
    email,
    company,
    jobName
}:ProfileUser) => {
    const [newProfile] = await db.insert(profile).values({
        id,
        userId,
        name,
        lastName,
        imageURL: profileImage,
        companyName:company,
        email,
        jobName
    }).returning()
    return newProfile;
}