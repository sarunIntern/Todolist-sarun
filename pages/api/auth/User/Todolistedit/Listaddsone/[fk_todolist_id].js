const { conn } =require("../../../../../../DB/pgconfig")

async function listaddsone(req,res) {
    const { fk_todolist_id } = req.query;
    const { lists_text } = req.body

    try{
        await conn("INSERT INTO lists (lists_text,fk_todolist_id) VALUES ($1,$2) ",[lists_text,fk_todolist_id])
        await conn("UPDATE todolist SET todolist_status = $1 WHERE todolist_id = $2 ",['p',fk_todolist_id])
        res.status(200).send("List insert success!!")
    }catch(err){
        console.log(err)
        res.status(500).send("LISTINSERTONE SERVER ERROR !!!")
    }
}

export default listaddsone