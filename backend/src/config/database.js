import mysql from 'mysql2';

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'admin',
    database: 'merch_shop'
}).promise();

export default pool;