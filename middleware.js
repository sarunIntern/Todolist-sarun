import { NextResponse } from "next/server";
//  jose ใช้แทน jwt ได้
const jose = require('jose')
export default async function middleware(req) {
    const cookies = req.cookies.get("jwt_token")?.value
    // const jwt = cookies.jwt_token
    const url = req.url;

    if (url.includes('/api')) {
        if (!cookies) {
            //ตัวนี้คือไม่มี Token ให้้ย้ายไปหน้า Login
            return NextResponse.redirect('http://localhost:3000/Login')
        } else {
            //jose verify Token
            const { payload } = await jose.jwtVerify(cookies, new TextEncoder().encode(process.env.SECRET_TOKEN));
            try {
                const username = payload.role
                if (username !== 'a') {
                    return NextResponse.next()
                } else {
                    console.log("ERRor")
                }
            } catch (err) {
                console.log(err);
                res.status(401).send("Role Admin ไม่ถูกต้อง ");
            }
        }
    }

}
export const config = {
    matcher: '/api/:path*',
}