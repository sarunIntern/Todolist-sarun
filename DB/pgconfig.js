const { Pool } = require("pg");

var host = 'localhost'
if(process.env.NODE_ENV == 'production'){
    host = 'postgres14'
}
const pool = new Pool({
    user:process.env.POSTGRES_USER,
    password:process.env.POSTGRES_PASSWORD,
    host:host,
    port:process.env.POSTGRES_PORT,
    database:process.env.POSTGRES_DATABASE,

})

async function conn(conn_query,values = []){
    try{
        const client = await pool.connect();
        const results = await client.query(conn_query , values)
        client.release(); 
        return results.rows
    }catch(err){
        client.end();

        throw Error(err.massage)
    }
}
 
module.exports = {conn}