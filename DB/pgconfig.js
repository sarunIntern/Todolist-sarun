const { Pool } = require("pg");

const pool = new Pool({
    user:process.env.POSTGRES_USER,
    password:process.env.POSTGRES_PASSWORD,
    host:process.env.POSTGRES_HOST,
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