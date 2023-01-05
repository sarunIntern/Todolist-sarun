const { conn } = require("../../../../../DB/pgconfig")
export default async function (req, res) {
    const { user_id } = req.query;
    const { role } = req.body;
    try {
        const Bool = await conn("SELECT * FROM users WHERE user_id = $1 ", [user_id])
        if (Bool.length > 0) {  
            await conn("UPDATE users SET user_role = $1 WHERE user_id = $2 ", [role,user_id])
            res.status(200).send("User role has been change")
        } else {
            res.status(401).send("Don't have user")
        }
    } catch (err) {
        res.status(500).send("CANNOT UPDATE ROLE USER SERVER ERROR !!!")
    }

}