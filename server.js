var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');

var CompanyAPI = require("./controllers/CompanyAPI.js");
var BaseAPI = require("./controllers/BaseAPI.js");

var portNumber = 8081;
var app = express();
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

var companyAPI = new CompanyAPI(app);

var server = app.listen(portNumber, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})
