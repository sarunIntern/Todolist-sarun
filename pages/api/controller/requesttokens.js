const Jwt = require('jsonwebtoken')
export default async function requesttokens(req,res){
      const {Cookie} = await req.body
    try {
        if (!Cookie) {
            res.status(200).json(null)
        }else{
            try{
                const decode = Jwt.verify(Cookie,process.env.SECRET_TOKEN)
                res.status(200).json({token:Cookie,decode:decode})
            }catch(error){
                res.redirect(401, 'http://localhost:3000/Loadtoredirect2')
            }
        }
        
    } catch (err) {
        // console.log(err)
        
        res.status(500).send("REQUESTIONTOKEN SERVER ERROR !!!")
    }
}