
const { conn } = require("../../../DB/pgconfig")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const cookies = require('cookie')
export default async function login(req, res) {
    const { password, email } = req.body;
    try {
        const user = await conn("SELECT * FROM users WHERE user_email = $1 ", [email])
        if (user.length < 1) {
            res.status(400).send("Email addres is not register")
        } else {
            if (user[0].user_status) {
                const isMatch = bcrypt.compareSync(password, user[0].user_password);
                if (!isMatch) {
                    return res.status(400).send("Password is incorrect!!");
                } else {
                    await conn("UPDATE users SET last_login = NOW() WHERE user_email = $1 ", [email])
                    const payload = {
                        user_id:user[0].user_id,
                        username: user[0].username,
                        email: user[0].user_email,
                        role: user[0].user_role,
                    }
                    
                    // Generate Token
                    jwt.sign(payload, process.env.SECRET_TOKEN, { expiresIn: 60 * 60 * 1  }, (err, token) => {
                        if (err) {
                            throw err;
                        }
                        res.setHeader('Set-Cookie', cookies.serialize('jwt_token', String(token), {
                            httpOnly: true,
                            maxAge: (60 * 60 * 1) + 10,
                            path:"/",  // 1 week
                          }));
                     
                        res.status(200).json({ token, payload });
                    });
                    
                }

            } else {
                res.status(400).send("You are not verify in your email please check your email")
                // res.status(200).send(user)
            }
        }
    } catch (err) {
        // console.log(err)
        res.status(500).send("LOGIN SERVER ERROR !!!")
    }
}

