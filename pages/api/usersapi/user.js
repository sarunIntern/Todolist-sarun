const { conn } =require("../../../DB/pgconfig")

async function listuser(req,res) {
    try{
        const user = await conn("SELECT * FROM users")
        res.status(200).json(user)
    }catch(err){
        // console.log(err)
        res.status(500).send("serverERROR")
    }
}

export default listuser