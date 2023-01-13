import { NextResponse } from "next/server";

//  jose ใช้แทน jwt ได้
const jose = require('jose')
//อันนี้ jwt Error
// import Jwt  from "jsonwebtoken";
export default async function middleware(req) {
    //get(cookie name)
    const cookies = req.cookies.get("jwt_token")?.value

    const url = req.url;
    //ดักที่ตัว /admin
    if (url.includes('/admin')) {
        if (!cookies) {
            //ตัวนี้คือไม่มี Token ให้้ย้ายไปหน้า Login

            return NextResponse.redirect('http://localhost:3000/Loadtoredirect')
        } else {
            try {
                //ใช้ jose แทน jwt /// jose verify Token
                const { payload } = await jose.jwtVerify(cookies, new TextEncoder().encode(process.env.SECRET_TOKEN));
                const role = payload.role
                if (role === 'a') {
                    console.log("You are Admin ", payload)
                } else {
                    return NextResponse.redirect('http://localhost:3000/Loadtoredirect')
                }
            } catch (err) {
                console.log(err);
                return NextResponse.redirect('http://localhost:3000/Loadtoredirect2')
            }
        }
    }
    //ป้องกัน API ของ Role Admin
    if (url.includes('/api/auth/Admin')) {
        if (!cookies) {
            //ตัวนี้คือไม่มี Token ให้้ย้ายไปหน้า Login
            return new NextResponse(
                JSON.stringify({ success: false, message: 'authentication failed' }),
                { status: 401, headers: { 'content-type': 'application/json' } }
              )
        } else {
            try {
                //ใช้ jose แทน jwt /// jose verify Token
                const { payload } = await jose.jwtVerify(cookies, new TextEncoder().encode(process.env.SECRET_TOKEN));
                const role = payload.role
                if (role === 'a') {
                    console.log("You are Admin ", payload)
                } else {
                    return NextResponse.redirect('http://localhost:3000/verifycation/Redirect')
                }
            } catch (err) {
                console.log(err);
                return NextResponse.redirect('http://localhost:3000/Loadtoredirect2')
            }
        }
    }
    //ดักที่ตัว /admin
    if (url.includes('/user')) {
        if (!cookies) {
            //ตัวนี้คือไม่มี Token ให้้ย้ายไปหน้า Login
            return NextResponse.redirect('http://localhost:3000/Loadtoredirect')
        } else {
            try {
                //ใช้ jose แทน jwt /// jose verify Token
                const { payload } = await jose.jwtVerify(cookies, new TextEncoder().encode(process.env.SECRET_TOKEN));
                const user_id = await payload.user_id
                req.user_id = await user_id
            } catch (err) {
                console.log(err);
                return NextResponse.redirect('http://localhost:3000/Loadtoredirect2')
            }
        }
    }
    if (url.includes('/api/auth/User')) {
        if (!cookies) {
            //ตัวนี้คือไม่มี Token ให้้ย้ายไปหน้า Login
            return new NextResponse(
                JSON.stringify({ success: false, message: 'authentication failed' }),
                { status: 401, headers: { 'content-type': 'application/json' } }
              )
        } else {
            try {
                //ใช้ jose แทน jwt /// jose verify Token
                const { payload } = await jose.jwtVerify(cookies, new TextEncoder().encode(process.env.SECRET_TOKEN));
                const user_id = await payload.user_id
                req.user_id = await user_id
            } catch (err) {
                console.log(err);
                return NextResponse.redirect('http://localhost:3000/Loadtoredirect2')
            }
        }
    }
}
//ตัวกรอง middleware ให้ทำงานบน path ที่เรากำหนดเฉพาะได้
export const config = {
    matcher: ['/admin/:path*', '/api/auth/Admin:path*','/user/:path*','/api/auth/User:path*'],
}