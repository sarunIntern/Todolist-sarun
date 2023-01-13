const jose = require('jose')
export default async function requesttokens(req,res){
      const {Cookie} = await req.body
    try {
        if (!Cookie) {
            res.status(200).json(null)
        }else{
            const { payload } = await jose.jwtVerify(Cookie, new TextEncoder().encode(process.env.SECRET_TOKEN));
            // const decode = Jwt.verify(Token,process.env.SECRET_TOKEN)
            res.status(200).json({token:payload})
        }
        
    } catch (err) {
        // console.log(err)
        
        res.status(500).send("REQUESTIONTOKEN SERVER ERROR !!!")
    }
}