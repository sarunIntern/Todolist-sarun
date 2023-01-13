const { conn } =require("../../../../../DB/pgconfig")

async function todolist(req,res) {
    try{
        const user = await conn("SELECT * FROM todolist ORDER BY todolist_id ASC")
    
        res.status(200).json(user)
    }catch(err){
        // console.log(err)
        res.status(500).send("LISTUSER SERVER ERROR !!!")
    }
}

export default todolist