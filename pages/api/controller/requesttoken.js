const Jwt = require('jsonwebtoken')
export default async function requesttoken(req,res){
    try {
        const { cookies } = await req;
        const jwt = await cookies.jwt_token
        if (!jwt) {
            res.status(200).json(null)
        }else{
            try{
                const decode = Jwt.verify(jwt,process.env.SECRET_TOKEN)
                res.status(200).json({token:jwt,Decode:decode})
            }catch(error){
                res.status(401).json('Token invalid')
            }
            
        }
    } catch (err) {
        // console.log(err)
        
        res.status(500).send("REQUESTIONTOKEN SERVER ERROR !!!")
    }
}