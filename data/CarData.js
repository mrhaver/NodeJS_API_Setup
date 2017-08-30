var Car = require("./../model/Car.js");
var MySQLConnection = require("./MySQLConnection.js");

var databaseConnection = new MySQLConnection();
var tableName = "CAR";

/**
 * This data class is responsible for the connection with the database and database queries
 */
class CarData {

    /**
     * Create a new car in the database
     * Create car object from parameter car
     * @param {*} car 
     */
    static create(car) {
        return new Promise(function(resolve, reject){
            CarData.handleCarQuery("INSERT INTO " + tableName + " (`id`, `name`, `color`) VALUES (NULL, 'Fiat', 'Geel');").then(function(result){
                resolve(result);
            })
            .catch(function(result){
                reject(result);
            })
        })
        
    }

    /**
     * Get all cars from the database
     */
    static getAll() {
        return new Promise(function (resolve, reject) {
            CarData.handleCarQuery("SELECT * FROM " + tableName + ";").then(function(result){
                resolve(result);
            })
            .catch(function(result){
                reject(result);
            })
        })
    }

    /**
     * Get a car by id
     * @param {*} id 
     */
    static getById(id) {
        return new Promise(function (resolve, reject) {
            CarData.handleCarQuery("SELECT * FROM " + tableName + " WHERE id = ?;", [id]).then(function(result){
                if(result.length == 1){
                    resolve(result[0]);
                }
                else{
                    resolve(result);
                }
            })
            .catch(function(result){
                reject(result);
            })
        })
    }

    /**
     * Update a certain car in the database
     * Create a car object from the car param and edit existing database object
     * @param {*} car 
     */
    static update(car) {
        return new Promise(function (resolve, reject) {
            CarData.handleCarQuery("UPDATE " + tableName + " SET `color`='geel' WHERE `id`='12';").then(function(result){
                resolve(result);
            })
            .catch(function(result){
                reject(result);
            })
        })
    }

    /**
     * Remove car by id
     */
    static removeById(id) {
        return new Promise(function (resolve, reject) {
            CarData.handleCarQuery("DELETE FROM " + tableName + " WHERE `id`=?;", [id]).then(function(result){
                resolve(result);
            })
            .catch(function(result){
                reject(result);
            })
        })
    }

    /**
     * Every query will be executed by this function
     * @param {*} query 
     */
    static handleCarQuery(query, parameters){
        console.log("CarData: Executing query: " + query + " with parameters " + parameters);
        return new Promise(function (resolve, reject){
            var con = databaseConnection.getConnection();
            con.query(query, parameters, function (err, result, fields) {
                if (err){
                    console.log("CarData: query failed");
                    reject(err);
                } 
                var i;
                var cars = [];
                if(result != null){
                    for (i = 0; i < result.length; i++) {
                        var car = new Car(result[i].id, result[i].name, result[i].color);
                        cars.push(car);
                    }
                    resolve(cars);
                }
                else{
                    console.log("CarData: result is null");
                    reject("result is null");
                }
            });
        })
    }

}

module.exports = CarData;

