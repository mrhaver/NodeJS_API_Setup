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
        con.connect(function (err) {
            if (err) {
                console.log("error at connecting to database");
                throw err;
            }
            console.log("Connected to database");
        });
        return con;
    }
}

module.exports = MySQLConnection;