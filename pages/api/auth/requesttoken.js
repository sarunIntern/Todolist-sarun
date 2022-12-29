
export default async function(req,res){
    try {
        const { cookies } = req;
        const jwt = cookies.jwt_token
        if (!jwt) {
            res.status(400).json("You are not login")
        }else{
            
            res.status(200).send(jwt)
        }
        
    } catch (err) {
        // console.log(err)
        res.status(500).send("serverERROR")
    }
}