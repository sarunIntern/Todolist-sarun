const { conn } =require("../../DB/pgconfig")

async function listuser(req,res) {
    try{
        const user = await conn("SELECT * FROM quote")
        res.status(200).json(user)
    }catch(err){
        res.status(500).send("serverERROR")
        console.log(err)
    }
}

export default listuser