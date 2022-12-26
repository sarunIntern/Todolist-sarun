
const { conn } = require("../../../DB/pgconfig")
export default async function login(req, res) {
    const { password, email } = req.body;
    try {
        const user = await conn("SELECT * FROM users WHERE user_email = $1 ", [email])
        if (user.length < 1) {
            res.status(500).send("Email addres is not register")
        } else {
            if (user[0].user_password == password) {
                if (user[0].user_status) {
                    res.status(200).send(user)
                } else {
                    res.status(400).send("You are not verify in your email please Verify")
                    // res.status(200).send(user)
                }
            } else {
                res.status(400).send("Your password is incorrect")
            }
        }
    } catch (err) {
        // console.log(err)
        res.status(500).send("serverERROR")
    }
}

