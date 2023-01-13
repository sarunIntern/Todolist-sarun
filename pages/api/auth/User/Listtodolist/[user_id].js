const { conn } =require("../../../../../DB/pgconfig")

async function todolistid(req,res) {
    const { user_id } = req.query;
    try{
        const user = await conn("SELECT * FROM users WHERE user_id = $1 ",[user_id])
        if(user.length <1){
            res.status(200).json({todolists:user,category:user,user:user})
        }else{
            const todolists = await conn("SELECT * FROM todolist WHERE fk_todolist_user_id = $1 ORDER BY todolist_id ASC ",[user_id])
        
            // const listjoins = await conn(`SELECT * FROM todolist JOIN lists ON todolist_id = fk_todolist_id JOIN category ON category_id = fk_category_id WHERE fk_todolist_user_id = $1 ORDER BY todolist_id ASC`,[user_id])
            const catnull = await conn("SELECT * FROM category WHERE (fk_user_id IS NULL OR fk_user_id = $1 ) ORDER BY category_id ASC",[user_id])
            res.status(200).json({todolists:todolists,category:catnull,user:user})
        }
        
    }catch(err){
        console.log(err)
        res.status(500).send("LISTUSERID SERVER ERROR !!!")
    }
}

export default todolistid