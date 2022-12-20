const { conn } =require("../../../DB/pgconfig")
import { useRouter } from "next/router";
async function listuserID(req,res) {
    
    const {user_id} = req.query;
    try{
        const user = await conn("SELECT * FROM users WHERE user_id = $1",[user_id])
        res.status(200).json(user)
    }catch(err){
        
        res.status(500).send("serverERROR")
    }
}

export default listuserID