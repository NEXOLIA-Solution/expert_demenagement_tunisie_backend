const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306
});

let dbStatus = {
    connected: false,
    message: "Not tested yet",
    serverTime: null
};

connection.connect((err) => {
    if (err) {
        console.error('❌ DB CONNECTION FAILED :', err.message);

        dbStatus = {
            connected: false,
            message: err.message,
            serverTime: null
        };

        return;
    }

    console.log('✅ MySQL/MariaDB CONNECTED');

    connection.query('SELECT NOW() AS time', (err, result) => {
        if (err) return;

        dbStatus = {
            connected: true,
            message: "Database connected successfully",
            serverTime: result[0].time
        };

        console.log('🟢 DB STATUS READY');
    });
});

module.exports = {
    connection,
    getDBStatus: () => dbStatus
};