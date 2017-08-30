var Car = require("./../model/Car.js");
var MySQLConnection = require("./MySQLConnection.js");

var databaseConnection = new MySQLConnection();

class CarData {

    constructor() {

    }

    /**
     * method to create a new car of class Car.js
     */
    createCar(car) {
        return new Promise(function (resolve, reject) {
            var con = databaseConnection.getConnection();

            con.query("INSERT INTO `test`.`Car` (`id`, `name`, `color`) VALUES (NULL, 'Fiat', 'Geel');", function (err, result, fields) {
                if (err) reject(err);
                var i;
                var cars = [];
                if(result != null){
                    for (i = 0; i < result.length; i++) {
                        var car = new Car(result[i].id, result[i].name, result[i].color);
                        cars.push(car);
                    }
                    console.log(cars);
                    resolve(cars);
                }
                else{
                    console.log("result is null");
                    reject("result is null");
                }
                
            });
        })
    }

    /**
     * method to get all cars from database
     */
    getAllCars() {
        return new Promise(function (resolve, reject) {
            var con = databaseConnection.getConnection();
            con.query("SELECT * FROM `test`.`Car`;", function (err, result, fields) {
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

    /**
     * method to get a car by id
     * @param {*} id 
     */
    getCarById(id) {
        return new Promise(function (resolve, reject) {
            var con = databaseConnection.getConnection();
            con.query("SELECT * FROM CAR WHERE id = ?;", [id], function (err, result, fields) {
                if (err) reject(err);
                var i;
                var cars = [];
                if (result != null) {
                    for (i = 0; i < result.length; i++) {
                        var car = new Car(result[i].id, result[i].name, result[i].color);
                        cars.push(car);
                    }
                }
                console.log(cars);
                resolve(cars);
            });
        })
    }

    /**
     * method to update car
     */
    updateCar() {
        return new Promise(function (resolve, reject) {
            var con = databaseConnection.getConnection();
            con.query("UPDATE CAR SET `color`='oranje' WHERE `id`='12';", function (err, result, fields) {
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

    /**
     * Remove car by id
     */
    removeCarById(id) {
        return new Promise(function (resolve, reject) {
            var con = databaseConnection.getConnection();
            con.query("DELETE FROM `test`.`Car` WHERE `id`=?;", [id], function (err, result, fields) {
                if (err) reject(err);
                var i;
                var cars = [];
                if (result != null) {
                    for (i = 0; i < result.length; i++) {
                        var car = new Car(result[i].id, result[i].name, result[i].color);
                        cars.push(car);
                    }
                }
                console.log(cars);
                resolve(cars);
            });
        })
    }

}

module.exports = CarData;

