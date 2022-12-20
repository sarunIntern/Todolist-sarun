// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const { conn } =require("../../../DB/pgconfig")

async function register(req,res){
  if(req.method === "POST"){
    try{
      return res.status(200).json("Register")
    }catch {
        /*console.log(err);*/
      return res.status(500).send("Server Error!");
      }
    }else{
      res.status(500).send("Server Error!");
    }

}
export default register