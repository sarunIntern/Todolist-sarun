const { conn } =require("../../../../../../DB/pgconfig")

async function listdeletesone(req,res) {
    const { lists_id } = req.query;
    try{
        await conn("DELETE FROM lists WHERE lists_id = $1 ",[lists_id])
        res.status(200).send("Delete lists success!!")
    }catch(err){
        console.log(err)
        res.status(500).send("DELETELIST SERVER ERROR !!!")
    }
}

export default listdeletesone