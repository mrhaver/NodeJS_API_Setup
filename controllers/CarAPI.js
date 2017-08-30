var CarData = require("./../data/CarData.js");
var BaseAPI = require("./BaseAPI.js");

class CarAPI {

    constructor(app) {
        this.baseUrl = BaseAPI.getUrl() + "/car";
        this.app = app;
        this.publishEndPoints();
    }

    publishEndPoints() {
        this.getAllCars();
        this.getCarById();
        this.createCar();
        this.updateCar();
        this.removeCarById();
    }

    /**
     * Create a car
     */
    createCar(){
        this.app.post(this.baseUrl + '/post/createCar', function (req, res) {
            var carData = new CarData();
            carData.createCar().then(function (result) {
                res.end(JSON.stringify(result));
            })
        })
    }

    /**
     * Read all cars from cardata
     */
    getAllCars() {
        this.app.get(this.baseUrl + '/get/all', function (req, res) {
            var carData = new CarData();
            carData.getAllCars().then(function (result) {
                res.end(JSON.stringify(result));
            })
        })
    }

    /**
     * Find car by Id
     */
    getCarById() {
        this.app.get(this.baseUrl + '/get/byId/:id', function (req, res) {
            var carData = new CarData();
            carData.getCarById(req.params.id).then(function (result) {
                res.end(JSON.stringify(result));
            })
        })
    }

    updateCar(){
        this.app.post(this.baseUrl + '/post/updateCar', function (req, res) {
            var carData = new CarData();
            carData.updateCar().then(function (result) {
                res.end(JSON.stringify(result));
            })
        })
    }

    removeCarById(){
        this.app.post(this.baseUrl + '/post/removeCarById/:id', function (req, res) {
            var carData = new CarData();
            carData.removeCarById(req.params.id).then(function (result) {
                res.end(JSON.stringify(result));
            })
        })
    }


}

module.exports = CarAPI;