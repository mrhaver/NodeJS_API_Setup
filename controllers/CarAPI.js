var CarData = require("./../data/CarData.js");
var BaseAPI = require("./BaseAPI.js");

var carData = new CarData();

class CarAPI {

    constructor(app) {
        this.baseUrl = BaseAPI.getUrl() + "/cars";
        this.app = app;
        this.publishEndPoints();
    }

    publishEndPoints() {
        this.createCar();
        this.getAllCars();
        this.getCarById();
        this.updateCar();
        this.removeCarById();
    }

    /**
     * 
     */
    createCar(){
        this.app.post(this.baseUrl + '/create', function (req, res) {
            CarData.create().then(function (result) {
                res.end(JSON.stringify(result));
            })
            .catch(function(result){
                res.end("mislukt");
            })
        })
    }

    /**
     * Read all cars from cardata
     */
    getAllCars() {
        this.app.get(this.baseUrl + '', function (req, res) {
            CarData.getAll().then(function (result) {
                res.end(JSON.stringify(result));
            })
        })
    }

    /**
     * Find car by Id
     */
    getCarById() {
        this.app.get(this.baseUrl + '/:id', function (req, res) {
            CarData.getById(req.params.id).then(function (result) {
                res.end(JSON.stringify(result));
            })
        })
    }

    /**
     * Update a car
     */
    updateCar(){
        this.app.put(this.baseUrl + '/post/updateCar', function (req, res) {
            CarData.update().then(function (result) {
                res.end(JSON.stringify(result));
            })
        })
    }

    /**
     * Remove a car
     */
    removeCarById(){
        this.app.delete(this.baseUrl + '/post/removeCarById/:id', function (req, res) {
            CarData.removeById(req.params.id).then(function (result) {
                res.end(JSON.stringify(result));
            })
        })
    }
}

module.exports = CarAPI;