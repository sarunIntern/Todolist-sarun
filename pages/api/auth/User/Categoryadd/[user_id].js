const { conn } =require("../../../../../DB/pgconfig")

async function categoryadd(req,res) {
    const { user_id } = req.query;
    const {category_name} = req.body
    try{
        await conn("INSERT INTO category (category_name,fk_user_id) VALUES ($1,$2)",[category_name,user_id])
        res.status(200).json("Add category success!!!")
        // res.status(200).json(category_name)
    }catch(err){
        // console.log(err)
        res.status(500).json("CATEGORY SERVER ERROR !!!")
    }
}

export default categoryadd