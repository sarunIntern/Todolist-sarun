const { conn } =require("../../../../../DB/pgconfig")

async function listnullcategory(req,res) {
    const { category } = req.query;
    try{
        const catnull = await conn("SELECT * FROM category WHERE (fk_user_id IS NULL OR fk_user_id = $1 ) ORDER BY category_id ASC",[category])
        // const catnull = await conn("SELECT * FROM category WHERE fk_user_id IS NULL ORDER BY category_id ASC")
        res.status(200).json({catnull:catnull})
    }catch(err){
        // console.log(err)
        res.status(500).send("LISTUSER SERVER ERROR !!!")
    }
}

export default listnullcategory