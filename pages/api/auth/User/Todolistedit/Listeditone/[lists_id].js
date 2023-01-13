const { conn } =require("../../../../../../DB/pgconfig")

async function listeditone(req,res) {
    const { lists_id } = req.query;
    const { lists_text } = req.body

    try{
        await conn("UPDATE lists SET lists_text = $1 WHERE lists_id = $2 ",[lists_text,lists_id])
      
        res.status(200).send("List edit success!!")
    }catch(err){
        console.log(err)
        res.status(500).send("LISTEDITONE SERVER ERROR !!!")
    }
}

export default listeditone