const { conn } =require("../../../../../DB/pgconfig")

async function categorydelete(req,res) {
    const { category_id } = req.query;
    try{
        if(category_id != null){
       await conn("WITH A AS (DELETE FROM lists WHERE fk_lists_category_id = $1), B AS (DELETE FROM todolist WHERE fk_category_id = $1) DELETE FROM category WHERE category_id = $1"
       ,[category_id])
        res.status(200).json("Delete category success!!!")
        // res.status(200).json(category_name)
    }else{
        res.status(400).json("You can not delete this category")
    }
    }catch(err){
        // console.log(err)
        res.status(500).json("CATEGORYDELETE SERVER ERROR !!!")
    }
}

export default categorydelete