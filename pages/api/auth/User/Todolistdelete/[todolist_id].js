const {conn} = require('../../../../../DB/pgconfig')


async function Todolistdelete(req,res) {
    const { todolist_id } = req.query;
    try{
       await conn("WITH A AS (DELETE FROM lists WHERE fk_todolist_id = $1) DELETE FROM todolist WHERE todolist_id = $1",[todolist_id])
        res.status(200).send("List has been deleted!!")
    }catch(err){
        console.log(err)
        res.status(500).send("TODOLIST DELETE SERVER ERROR !!!")
    }
}

export default Todolistdelete