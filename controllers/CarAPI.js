var CarData = require("./../data/CarData.js");
var Car = require("./../model/Car.js");
var BaseAPI = require("./BaseAPI.js");
var HttpStatus = require('http-status-codes');
var ResponseBuilder = require("./ResponseBuilder.js");

var carData = new CarData();
var responseBuilder = new ResponseBuilder();

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
     * Create a car from request body parameters and send to CarData
     * Res.end the created car
     */
    createCar(){
        this.app.post(this.baseUrl + '/create', function (req, res) {
            var car = new Car(0, req.body.name, req.body.color);
            console.log("CarAPI: car to create " + car.name);
            CarData.create(car).then(function (result) {
                res = ResponseBuilder.createResponse(res, HttpStatus.CREATED);
                res.end(JSON.stringify(result));
            }).catch(function(result){
                res.end("car could not be created");
            })
        })
    }

    /**
     * Read all cars from CarData
     */
    getAllCars() {
        this.app.get(this.baseUrl + '', function (req, res) {
            CarData.getAll().then(function (result) {
                res = ResponseBuilder.createResponse(res, HttpStatus.OK);
                res.end(JSON.stringify(result));
            }).catch(function(result){
                res.end("could not get all cars");
            })
        })
    }

    /**
     * Find car by Id
     */
    getCarById() {
        this.app.get(this.baseUrl + '/:id', function (req, res) {
            CarData.getById(req.params.id).then(function (result) {
                res = ResponseBuilder.createResponse(res, HttpStatus.OK);
                res.end(JSON.stringify(result));
            }).catch(function(result){
                res.end("could not get car by id");
            })
        })
    }

    /**
     * Update a car
     */
    updateCar(){
        this.app.put(this.baseUrl + '/update', function (req, res) {
            var car = new Car(req.body.id, req.body.name, req.body.color);
            CarData.update(car).then(function (result) {
                res = ResponseBuilder.createResponse(res, HttpStatus.OK);
                res.end(result);
            }).catch(function(result){
                res.end("could not update car");
            })
        })
    }

    /**
     * Remove a car
     */
    removeCarById(){
        this.app.delete(this.baseUrl + '/remove/:id', function (req, res) {
            CarData.removeById(req.params.id).then(function (result) {
                res = ResponseBuilder.createResponse(res, HttpStatus.ACCEPTED);
                res.end(result);
            }).catch(function(result){
                res.end("could not remove car");
            })
        })
    }
}

module.exports = CarAPI;