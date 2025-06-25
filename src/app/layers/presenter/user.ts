interface RawAuthUserData {
    token:string;
    user: {
        id:string;
        email:string;
        name:string;
        image?:string | null;
        emailVerified:boolean;
        createdAt:Date;
        updatedAt:Date;
    }
}

export const loginPresenter = (data:RawAuthUserData) => {
    return {
        token: data.token,
        user:{
            id:data.user.id,
            email:data.user.email
        }
    }
}