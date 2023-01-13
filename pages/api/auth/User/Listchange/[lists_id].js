const {conn} = require('../../../../../DB/pgconfig')


async function Listchangestatus(req,res) {
    const { lists_id } = req.query;
    const {Value} = req.body
    try{
       await conn("UPDATE lists SET lists_status = $1 WHERE lists_id = $2 ",[Value,lists_id])
        res.status(200).send("List Update Success!!")
    }catch(err){
        console.log(err)
        res.status(500).send("LISTP SERVER ERROR !!!")
    }
}

export default Listchangestatus