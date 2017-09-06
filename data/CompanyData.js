var MySQLConnection = require("./MySQLConnection.js");
var Company = require("./../model/Company.js");

var databaseConnection = new MySQLConnection();
var tableName = "COMPANY";
var className = "CompanyData";

/**
 * This data class is responsible for the connection with the database and database queries
 */
class CompanyData {

    /**
     * Create a new company in the database
     * Create company object from parameter company
     * If query is succes, resolve the created company
     * @param {*} company 
     */
    static create(company) {
        return new Promise(function (resolve, reject) {
            CompanyData.handleQuery("INSERT INTO " + tableName + " (`id`, `name`) VALUES (NULL, ?);", [company.name], "CREATE").then(function (result) {
                resolve(result);
            }).catch(function (result) {
                reject(result);
            })
        })

    }

    /**
     * Get all companies from the database
     */
    static getAll() {
        return new Promise(function (resolve, reject) {
            CompanyData.handleQuery("SELECT * FROM " + tableName + ";", [], "GET").then(function (result) {
                resolve(result);
            }).catch(function (result) {
                reject(result);
            })
        })
    }

    /**
     * Get a company by id
     * @param {*} id 
     */
    static getById(id) {
        return new Promise(function (resolve, reject) {
            CompanyData.handleQuery("SELECT * FROM " + tableName + " WHERE id = ?;", [id], "GET").then(function (result) {
                if (result != null) {
                    resolve(result[0]);
                }
            }).catch(function (result) {
                reject(result);
            })
        })
    }

    /**
     * Update a certain company in the database
     * Create a company object from the company param and edit existing database object
     * @param {*} company 
     */
    static update(company) {
        return new Promise(function (resolve, reject) {
            CompanyData.handleQuery("UPDATE " + tableName + " SET `name`=? WHERE `id`=?;", [company.name, company.id], "UPDATE").then(function (result) {
                resolve(result);
            }).catch(function (result) {
                reject(result);
            })
        })
    }

    /**
     * Remove company by id
     */
    static removeById(id) {
        return new Promise(function (resolve, reject) {
            CompanyData.handleQuery("DELETE FROM " + tableName + " WHERE `id`=?;", [id], "DELETE").then(function (result) {
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
    static handleQuery(query, parameters, queryType) {
        console.log(className + ": Executing query: " + query + " with parameters " + parameters);
        return new Promise(function (resolve, reject) {
            var con = databaseConnection.getConnection();
            con.query(query, parameters, function (err, result, fields) {
                if (err) {
                    console.log(className + ": query failed");
                    reject(err);
                    return;
                }

                if (result == null) {
                    return;
                }

                if (queryType == "CREATE") {
                    // return the created company
                    var company = new Company(result.insertId, parameters[0]);
                    resolve(company);
                }

                if (queryType == "GET") {
                    // create list of companies
                    var i;
                    var companies = [];
                    for (i = 0; i < result.length; i++) {
                        var company = new Company(result[i].id, result[i].name);
                        companies.push(company);
                    }
                    resolve(companies);
                }

                if (queryType == "UPDATE") {
                    resolve(tableName + " updated");
                }

                if (queryType == "DELETE") {
                    resolve(tableName + " removed");
                }
            });
        })
    }
}

module.exports = CompanyData;

