const mysql = require("mysql");
const dbConfig = require("../config/db.config");

//create a connection to the database
const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});

//open the Mysql connection
connection.connect(error => {
    if (error) throw error;
    console.log("connected to the database");
});

module.exports = connection;