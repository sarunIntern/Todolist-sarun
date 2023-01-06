const { conn } =require("../../../../../DB/pgconfig")

async function todolistadd(req,res) {
    const { user_id } = req.query;
    const { Date ,todolist_name,category_id} = req.body
    try{
        await conn("INSERT INTO todolist (todolist_name,todolist_due,fk_category_id,fk_user_id) VALUES ($1,$2,$3,$4)",[todolist_name,Date,category_id,user_id])
        res.status(200).json("Add todolist success!!!")
    }catch(err){
        // console.log(err)
        res.status(500).json("TODOLISTADD SERVER ERROR !!!")
    }
}

export default todolistadd