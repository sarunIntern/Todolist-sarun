const { conn } =require("../../../../../../DB/pgconfig")

async function categoryeditname(req,res) {
    const { category_id } = req.query;
    const {category_name} = req.body
    try{
        await conn("UPDATE category SET category_name = $1 WHERE category_id = $2 ",[category_name,category_id])
        res.status(200).send("Edit Category name success!!")
    }catch(err){
        console.log(err)
        res.status(500).send("CATEGORYEDITNAME SERVER ERROR !!!")
    }
}

export default categoryeditname