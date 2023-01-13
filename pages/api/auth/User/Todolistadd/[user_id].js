const { conn } =require("../../../../../DB/pgconfig")
const format = require('pg-format')
async function todolistadd(req,res) {
    const { user_id } = req.query;
    const { Date ,todolist_name,category_id} = req.body
    try{
        const todolist_id = await conn(`INSERT INTO todolist (todolist_name,todolist_due,fk_category_id,fk_todolist_user_id) VALUES ($1,$2,$3,$4) RETURNING todolist_id `,[todolist_name,Date,category_id,user_id])
        
        // await conn(format(`INSERT INTO lists (lists_text) VALUES %L`,[Data]))
        // console.log(format(`INSERT INTO lists (lists_text,fk_todolist_id) VALUES %L`,Data))
        // console.log(Data)
        res.status(200).json({Data:"Add todolist success!!!",todolist_id:todolist_id[0].todolist_id})
        // res.status(200).json(req.body)
    }catch(err){
        // console.log(err)
        res.status(500).json("TODOLISTADD SERVER ERROR !!!")
    }
}

export default todolistadd