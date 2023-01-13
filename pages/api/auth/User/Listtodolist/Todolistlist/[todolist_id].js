const { conn } =require("../../../../../../DB/pgconfig")

async function todolistids(req,res) {
    const { todolist_id } = req.query;
    try{
        const todolists = await conn(`SELECT * FROM todolist WHERE todolist_id = $1 ORDER BY todolist_id ASC`,[todolist_id])
        if(todolists.length < 1){
            res.status(200).json({todolists:todolists,lists:todolists,category:todolists})
        }else{
            const todolist_ids = await todolists[0].fk_category_id
            const category = await conn("SELECT * FROM category WHERE category_id = $1 ",[todolist_ids])
            const lists = await conn("SELECT * FROM lists WHERE fk_todolist_id = $1 ORDER BY lists_id ASC",[todolist_id])
            res.status(200).json({todolists:todolists,lists:lists,category:category})
        }
        // const listjoins = await conn(`SELECT * FROM todolist JOIN lists ON todolist_id = fk_todolist_id JOIN category ON category_id = fk_category_id WHERE fk_todolist_user_id = $1 ORDER BY todolist_id ASC`,[todolist])
        
    }catch(err){
        console.log(err)
        res.status(500).send("LISTUSERIDS SERVER ERROR !!!")
    }
}

export default todolistids