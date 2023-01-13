const { conn } =require("../../../../../DB/pgconfig")
const format = require('pg-format')
async function listadd(req,res) {
    const { todolist_id } = req.query;
    const { Data} = req.body
    try{
      
        await conn(format(`INSERT INTO lists (lists_text,fk_todolist_id) VALUES %L`,Data))
        // console.log(format(`INSERT INTO lists (lists_text,fk_todolist_id) VALUES %L`,Data))
        // console.log(Data)
        res.status(200).json("Add listadd success!!!")
        // res.status(200).json(req.body)
    }catch(err){
        // console.log(err)
        res.status(500).json("LISTADD SERVER ERROR !!!")
    }
}

export default listadd