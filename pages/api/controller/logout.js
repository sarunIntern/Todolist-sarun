const cookie = require('cookie')
export default async function logout (req,res){
    
    try {
        const { cookies } = req
        const jwt = cookies.jwt_token
        if (!jwt) {
            res.status(400).json("You are not login")
        }else{
            console.log("kokai")
            res.setHeader('Set-Cookie', cookie.serialize('jwt_token', String(jwt), {
                httpOnly: true,
                maxAge: -1 ,
                path:"/",  
              }));
            res.status(200).send("Logout success full!!")
        }
        
    } catch (err) {
        // console.log(err)
        res.status(500).send("LOGOUT SERVER ERROR !!!")
    }

}