const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "Vinayak@291",
    database: 'quickcode'
});

module.exports= connection;