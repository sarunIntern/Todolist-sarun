const { conn } =require("../../../../../../DB/pgconfig")

async function todolisteditname(req,res) {
    const { todolist_id } = req.query;
    const {Date} = req.body
    try{
        await conn("UPDATE todolist SET todolist_due = $1 WHERE todolist_id = $2 ",[Date,todolist_id])
        res.status(200).send("Edit todolist due date success!!")
    }catch(err){
        console.log(err)
        res.status(500).send("TODOLISTEDITDUEDATE SERVER ERROR !!!")
    }
}

export default todolisteditname