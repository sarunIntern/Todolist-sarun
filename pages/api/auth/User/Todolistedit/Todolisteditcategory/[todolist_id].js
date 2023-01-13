const { conn } =require("../../../../../../DB/pgconfig")

async function todolisteditcategory(req,res) {
    const { todolist_id } = req.query;
    const {category_id} = req.body
    try{
        await conn("UPDATE todolist SET fk_category_id = $1 WHERE todolist_id = $2 ",[category_id,todolist_id])
        res.status(200).send("List insert success!!")
    }catch(err){
        console.log(err)
        res.status(500).send("LISTINSERTONE SERVER ERROR !!!")
    }
}

export default todolisteditcategory