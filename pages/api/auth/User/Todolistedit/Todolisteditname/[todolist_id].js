const { conn } =require("../../../../../../DB/pgconfig")

async function todolisteditduedate(req,res) {
    const { todolist_id } = req.query;
    const {todolist_name} = req.body
    try{
        await conn("UPDATE todolist SET todolist_name = $1 WHERE todolist_id = $2 ",[todolist_name,todolist_id])
        res.status(200).send("Edit todolist name success!!")
    }catch(err){
        console.log(err)
        res.status(500).send("TODOLISTEDITNAME SERVER ERROR !!!")
    }
}

export default todolisteditduedate