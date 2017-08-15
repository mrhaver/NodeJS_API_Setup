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
    }

    getAllCars() {
        this.app.get(this.baseUrl + '/get/all', function (req, res) {
            var carData = new CarData();
            carData.getAllCars().then(function (result) {
                res.end(JSON.stringify(result));
            })
        })
    }
}

module.exports = CarAPI;