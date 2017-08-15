var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "150196",
    database: "test"
});

class MySQLConnection{
    constructor(){

    }

    getConnection(){
        return con;
    }
}

module.exports = MySQLConnection;