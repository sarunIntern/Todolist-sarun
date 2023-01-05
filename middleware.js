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
                //ใช้ jose แทน jwt /// jose verify Token
                const { payload } = await jose.jwtVerify(cookies, new TextEncoder().encode(process.env.SECRET_TOKEN));
                try {
                    const username = payload.role
                    if (username === 'a') {
                        console.log("You are Admin ",payload)
                    } else {
                        return NextResponse.redirect('http://localhost:3000/Loadtoredirect')
                    }
                } catch (err) {
                    console.log(err);
                    res.status(401).send("Error Admin");
                }
            }
        }
        //ป้องกัน API ของ Role Admin
        if (url.includes('/api/auth/Admin')) {
            if (!cookies) {
                //ตัวนี้คือไม่มี Token ให้้ย้ายไปหน้า Login
                return NextResponse.redirect('http://localhost:3000/Loadtoredirect')
            } else {
                //ใช้ jose แทน jwt /// jose verify Token
                const { payload } = await jose.jwtVerify(cookies, new TextEncoder().encode(process.env.SECRET_TOKEN));
                try {
                    const username = payload.role
                    if (username === 'a') {
                        console.log("You are Admin ",payload)
                    } else {
                        return NextResponse.redirect('http://localhost:3000/verifycation/Redirect')
                    }
                } catch (err) {
                    console.log(err);
                    res.status(401).send("Error Admin");
                }
            }
        }
}
//ตัวกรอง middleware ให้ทำงานบน path ที่เรากำหนดเฉพาะได้
export const config = {
    matcher: ['/admin/:path*','/api/auth/Admin:path*'],
}