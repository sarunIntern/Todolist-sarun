const token = (handler) =>{
    try {
        return async (req,res) =>{
            const { cookies } = req
            const jwt = cookies.jwt_token
            if(!jwt){
                console.log(req.heads)
                
            }else{
                console.log("HAVETOKEN")
            }
            return handler(req,res);
        }
}
    catch (err) {
      res.status(401).send("Token ไม่ถูกต้อง");
    }
} 

export default token