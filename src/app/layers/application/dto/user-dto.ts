export type RegisterEmailUserAdapter = {
    email:string;
    name:string;
    lastName?:string;
    password:string;
}

export type SignInUserEmailAdapter = {
    email: string;
    password:string
}