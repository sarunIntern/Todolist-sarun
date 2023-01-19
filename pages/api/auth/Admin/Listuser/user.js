const { conn } =require("../../../../../DB/pgconfig")

async function listuser(req,res) {
    try{
        const user = await conn("SELECT * FROM users ORDER BY user_id ASC ")
        const verified = await conn("SELECT * FROM users WHERE user_status = true ORDER BY user_id ASC ")
        const admin = await conn("SELECT * FROM users WHERE user_role = $1 ORDER BY user_id ASC ",['a'])
        res.status(200).json({user:user,verified:verified,admin:admin})
    }catch(err){
        // console.log(err)
        res.status(500).send("LISTUSER SERVER ERROR !!!")
    }
}
// try {
//     const { cookies } = await req;
//     const jwt = await cookies.jwt_token
//     if (!jwt) {
//         res.status(401).json('your not login')
//     } else {
//         const decode = Jwt.verify(jwt, process.env.SECRET_TOKEN)
//         if (decode.role !== 'a') {
//             res.status(401).json('your not admin')
//         } else {

//         }
//     }
// } catch (err) {
//     // console.log(err)

//     res.status(500).send("REQUESTIONTOKEN SERVER ERROR !!!")
// }

export default listuser