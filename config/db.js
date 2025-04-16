import pg from 'pg';  // Default import
const { Pool } = pg;  // Destructure the Client from the pg module
import dotenv from 'dotenv';
const env = dotenv.config();

const pool = new Pool({
    user: process.env.PSQL_USER ,
    host: process.env.PSQL_HOST ,
    database: process.env.PSQL_DATABASE ,
    password: atob(process.env.PSQL_PASSWORD) ,
    port: process.env.PSQL_PORT ,
    ssl: {rejectUnauthorized: false}
});

process.on('SIGINT', function() {
    pool.end();
    console.log('Application successfully shutdown');
    process.exit(0);
});
export default pool;