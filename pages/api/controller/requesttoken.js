const Jwt = require('jsonwebtoken')
export default async function requesttoken(req,res){
    try {
        const { cookies } = req;
        const jwt = cookies.jwt_token
        if (!jwt) {
            res.status(200).json(null)
        }else{
            const decode = Jwt.verify(jwt,process.env.SECRET_TOKEN)
            res.status(200).json({token:jwt,Decode:decode})
        }
        
    } catch (err) {
        // console.log(err)
        res.status(500).send("serverERROR")
    }
}