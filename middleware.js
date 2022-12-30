import { NextResponse } from "next/server";

//  jose ใช้แทน jwt ได้
const jose = require('jose')
//อันนี้ jwt Error
// import Jwt  from "jsonwebtoken";
export default async function middleware(req) {
    //get(cookie name)
    const cookies = req.cookies.get("jwt_token")?.value

    const url = req.url;
    //ดักที่ตัว api/hello
        if (url.includes('/api/hello')) {
            if (!cookies) {
                //ตัวนี้คือไม่มี Token ให้้ย้ายไปหน้า Login
                return NextResponse.redirect('http://localhost:3000/Login')
            } else {
                //ใช้ jose แทน jwt /// jose verify Token
                const { payload } = await jose.jwtVerify(cookies, new TextEncoder().encode(process.env.SECRET_TOKEN));
                try {
                    const username = payload.role
                    if (username === 'a') {
                        console.log("You are Admin ",payload)
                    } else {
                        console.log("You are not Admin na" ,payload)
                    }
                } catch (err) {
                    console.log(err);
                    res.status(401).send("Role Admin ไม่ถูกต้อง ");
                }
            }
        }
}
//ตัวกรอง middleware ให้ทำงานบน path ที่เรากำหนดเฉาะได้
export const config = {
    matcher: '/api/hello',
}