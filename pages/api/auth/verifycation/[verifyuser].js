
const { conn } = require("../../../../DB/pgconfig")
export default async function (req,res) {
    const { verifyuser } = req.query;
    try {
        const Bool = await conn("SELECT user_status FROM users WHERE user_id = $1 ",[verifyuser])
        if (Bool.user_status && Bool.length > 0) {
            console.log("True", Bool)
            res.status(200).send('You already verify your email Please login')
        } else {
            if(Bool.length < 1){
                res.status(400).send("Your Email is not register")
            }else{
                await conn("UPDATE users SET user_status = true WHERE user_id = $1 ",[verifyuser])
                res.status(200).json('Verify Email Success!!')
            }
        
        }
    } catch (err) {
        res.status(500).send("serverError")
    }

}