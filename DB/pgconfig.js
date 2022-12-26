const {Client,Pool } = require("pg");

var host = 'localhost'
if(process.env.NODE_ENV == 'production'){
    host = 'psql14'
}
const pool = new Pool({
    user:process.env.POSTGRES_USER,
    password:process.env.POSTGRES_PASSWORD,
    host:host,
    port:process.env.POSTGRES_PORT,
    database:process.env.POSTGRES_DATABASE,
})

async function conn(conn_query,values = []){
        const client = await pool.connect();
    try{
        const results = await client.query(conn_query , values)
        client.release(); 
        return results.rows
    }catch(err){
        client.end();

        throw Error(err.massage)
    }
}
 
module.exports = {conn}

// import postgres from 'postgres'

// var host = 'localhost'
// if(process.env.NODE_ENV == 'production'){
//     host = 'psql14'
// }

// const sql = postgres('postgres://username:password@host:port/database', {
//   host                 : host,            // Postgres ip address[s] or domain name[s]
//   port                 : process.env.POSTGRES_PORT,          // Postgres server port[s]
//   database             : process.env.POSTGRES_DATABASE,            // Name of database to connect to
//   username             : process.env.POSTGRES_USER,            // Username of database user
//   password             : process.env.POSTGRES_PASSWORD,            // Password of database user

// })

// export default sql