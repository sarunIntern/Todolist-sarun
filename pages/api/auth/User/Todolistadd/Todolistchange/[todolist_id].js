const { conn } =require("../../../../../../DB/pgconfig")

async function todolistchange(req,res) {
    const { todolist_id } = req.query;
    const {Value} = req.body
    try{
        await conn("UPDATE todolist SET todolist_status = $1 WHERE todolist_id = $2 ",[Value,todolist_id])
        res.status(200).send("Change todolist status success!!")
    }catch(err){
        console.log(err)
        res.status(500).send("TODOLISTCHANGE SERVER ERROR !!!")
    }
}

export default todolistchange