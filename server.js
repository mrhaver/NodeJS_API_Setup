var express = require('express');
var mysql = require('mysql');
var app = express();
var portNumber = 8081;

var HelloWorldAPI = require("./controllers/HelloWorldAPI.js");
var CarAPI = require("./controllers/CarAPI.js");
var BaseAPI = require("./controllers/BaseAPI.js");

app.get('/helloWorld', function (req, res) {
    res.end("hello world");
})

var helloWorldAPI = new HelloWorldAPI(app);
var carAPI = new CarAPI(app);

var server = app.listen(portNumber, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})
