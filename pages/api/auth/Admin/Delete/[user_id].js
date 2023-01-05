const { conn } = require("../../../../../DB/pgconfig")
export default async function (req, res) {
    const { user_id } = req.query;
    try {
        const user = await conn("SELECT * FROM users WHERE user_id = $1 ", [user_id])
        if (user.length > 0) {  
            await conn("DELETE FROM users WHERE user_id = $1 ", [user_id])
            res.status(200).send("User has been delete!!")
        } else {
            res.status(401).send("Don't have user")
        }
    } catch (err) {
        console.log(err)
        res.status(500).send("CANNOT DELETE USER SERVER ERROR !!!")
    }

}