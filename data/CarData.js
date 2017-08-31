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
     * If query is succes, resolve the created car
     * @param {*} car 
     */
    static create(car) {
        return new Promise(function (resolve, reject) {
            CarData.handleCarQuery("INSERT INTO " + tableName + " (`id`, `name`, `color`) VALUES (NULL, ?, ?);", [car.name, car.color], "CREATE").then(function (result) {
                resolve(result);
            })
                .catch(function (result) {
                    reject(result);
                })
        })

    }

    /**
     * Get all cars from the database
     */
    static getAll() {
        return new Promise(function (resolve, reject) {
            CarData.handleCarQuery("SELECT * FROM " + tableName + ";", [], "GET").then(function (result) {
                resolve(result);
            }).catch(function (result) {
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
            CarData.handleCarQuery("SELECT * FROM " + tableName + " WHERE id = ?;", [id], "GET").then(function (result) {
                if (result != null) {
                    resolve(result[0]);
                }
            }).catch(function (result) {
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
            CarData.handleCarQuery("UPDATE " + tableName + " SET `name`=?, `color`=? WHERE `id`=?;", [car.name, car.color, car.id], "UPDATE").then(function (result) {
                resolve(result);
            }).catch(function (result) {
                reject(result);
            })
        })
    }

    /**
     * Remove car by id
     */
    static removeById(id) {
        return new Promise(function (resolve, reject) {
            CarData.handleCarQuery("DELETE FROM " + tableName + " WHERE `id`=?;", [id], "DELETE").then(function (result) {
                resolve(result);
            }).catch(function (result) {
                reject(result);
            })
        })
    }

    /**
     * Every query will be executed by this function
     * @param {*} query 
     */
    static handleCarQuery(query, parameters, queryType) {
        console.log("CarData: Executing query: " + query + " with parameters " + parameters);
        return new Promise(function (resolve, reject) {
            var con = databaseConnection.getConnection();
            con.query(query, parameters, function (err, result, fields) {
                if (err) {
                    console.log("CarData: query failed");
                    reject(err);
                    return;
                }

                if (result == null) {
                    return;
                }

                if (queryType == "CREATE") {
                    // return the created car
                    var car = new Car(result.insertId, parameters[0], parameters[1]);
                    resolve(car);
                }

                if (queryType == "GET") {
                    // create list of cars
                    var i;
                    var cars = [];
                    for (i = 0; i < result.length; i++) {
                        var car = new Car(result[i].id, result[i].name, result[i].color);
                        cars.push(car);
                    }
                    resolve(cars);
                }

                if (queryType == "UPDATE") {
                    resolve("car updated");
                }

                if (queryType == "DELETE") {
                    resolve("car removed");
                }



                // this block for create queries
            });
        })
    }
}

module.exports = CarData;

