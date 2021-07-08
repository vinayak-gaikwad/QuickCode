const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "Vinayak@291",//quickcode@gladiator
    database: 'quickcode'
});

module.exports= connection;