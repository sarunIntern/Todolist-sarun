import jwt from "jsonwebtoken"
const middleware = (handler) =>{
    try {
        return async (req,res) =>{
            const { cookies } = req
            const token = cookies.jwt_token
            if(!token){
                console.log("NOTOKEn")
                req.heads = "Fah"
            }else{
                const decoded =  jwt.verify(token, process.env.SECRET_TOKEN);
                console.log("Current-Auth", decoded);
            }
            return handler(req,res);
        }
}
    catch (err) {
      res.status(401).send("Token ไม่ถูกต้อง");
    }
} 

export default middleware