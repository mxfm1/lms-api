import bcrypt from "bcryptjs"

export const generateUUID = () => {
    return crypto.randomUUID()
}

export const hashPassword = async(password:string) => {
    const salt = await bcrypt.genSalt(10)
    const hashedPw = await bcrypt.hash(password,salt)
    return hashedPw;
}