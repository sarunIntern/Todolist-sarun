
export async function logout (req,res){
    try {
        const { cookies } = req
        const jwt = cookies.jwt_token
        if (!jwt) {
            res.status(400).json("You are not login")
        }else{
            res.setHeader('Set-Cookie', cookies.serialize('jwt_token', null, {
                httpOnly: true,
                maxAge: -1 ,
                path:"/",  // 1 week
              }));
        }
        res.status(200).send("Logout success full!!")
    } catch (err) {
        // console.log(err)
        res.status(500).send("serverERROR")
    }

}