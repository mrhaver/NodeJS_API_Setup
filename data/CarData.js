var Car = require("./../model/Car.js");
var MySQLConnection = require("./MySQLConnection.js");

var databaseConnection = new MySQLConnection();

class CarData {

    constructor() {

    }

    getAllCars() {
        return new Promise(function (resolve, reject) {
            var con = databaseConnection.getConnection();
            con.query("SELECT * FROM car;", function (err, result, fields) {
                if (err) reject(err);
                var i;
                var cars = [];
                for (i = 0; i < result.length; i++) {
                    var car = new Car(result[i].id, result[i].name, result[i].color);
                    cars.push(car);
                }
                console.log(cars);
                resolve(cars);
            });
        })
    }
}

module.exports = CarData;

