const{Pool} = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PASSWORD,
    port: process.env.PGPORT
});

const connectDb = async () => {
    try{
        const res =await pool.query('SELECT NOW()');
        console.log('connected to database at: ', res.rows[0].now);
    }catch(err){
        console.error("Error on connecting to database : ", err.message);
        process.exit(-1);
    }
};

connectDb();

module.exports = {
    query: (text, params) => pool.query(text, params),
}
