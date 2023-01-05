const { conn } = require("../../../DB/pgconfig")
const bcrypt = require('bcrypt');
// const saltRounds = 10;

export default async function register(req, res) {
    const { username, password, email } = req.body;
    // const user = await conn("SELECT * FROM users WHERE user_email = $1 ", [email])
    try {
        const Email = await conn("SELECT * FROM users WHERE user_email = $1 ", [email])
        const Username = await conn("SELECT * FROM users WHERE username = $1 ", [username])
        if (Email.length >= 1 || Username.length >= 1) {
            res.status(400).json('Email or Username has already exist')
        } else {
            var salt =  bcrypt.genSaltSync(10);
            var hash =  bcrypt.hashSync(password, salt);
            await conn("INSERT INTO users (username,user_password,user_email) VALUES ($1,$2,$3)", [username,hash, email])
            const user = await conn("SELECT * FROM users WHERE user_email = $1 ", [email])
            res.status(200).json(
                {
                    msg: "Register Success",
                    data: user[0]
                })
        }
    } catch (err) {
        console.log(err)
        res.status(500).send("REGISTER SERVER ERROR !!!")
    }
}

