import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";


export async function middleware(req){
    //Tolen will exist if user is logged in
    const token = await getToken({req, secret: process.env.JWT_SECRET});
    const {pathname} = req.nextUrl;
    // Allow if the following is true
    // 1. If the token exists
    // 2. If its a request for the next-auth session & provider fetching
    if(token && pathname === '/login'){
        return NextResponse.redirect('/');
    }
    
    if(pathname.includes('/api/auth') || token){
        return NextResponse.next();
    }

    if(!token && pathname !== '/login'){
        return NextResponse.redirect('/login');
    }
}
