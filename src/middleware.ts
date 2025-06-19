import { betterFetch } from "better-auth/react";
import {auth } from '@/lib/auth'
import { NextRequest, NextResponse } from "next/server";

type Session = typeof auth.$Infer.Session

export async function middleware(request:NextRequest){
    // const {data:session} = await betterFetch<Session>(
    //     "/api/auth/session",
    //     {
    //         baseURL: request.url,
    //         headers: {
    //             cookie: request.headers.get("cookie") || ""
    //         }
    //     }

    // )

    // if(!session){
    //     return NextResponse.redirect(new URL("/login", request.url))
    // }

    // return NextResponse.next()
}

export const config = {
    matcher: ["/dashboard"]
}