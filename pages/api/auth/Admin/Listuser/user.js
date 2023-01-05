const { conn } =require("../../../../../DB/pgconfig")

async function listuser(req,res) {
    try{
        const user = await conn("SELECT * FROM users ORDER BY user_id ASC ")
        res.status(200).json(user)
    }catch(err){
        // console.log(err)
        res.status(500).send("LISTUSER SERVER ERROR !!!")
    }
}

export default listuser