const { conn } =require("../../../../../../DB/pgconfig")

async function categorydelete(req,res) {
    const { category_id } = req.query;
    try{
        await conn("DELETE FROM category WHERE category_id = $1 ",[category_id])
        res.status(200).send("Delete Category success!!")
    }catch(err){
        console.log(err)
        res.status(500).send("DELETECATEGORY SERVER ERROR !!!")
    }
}

export default categorydelete