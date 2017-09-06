var CompanyData = require("./../data/CompanyData.js");
var Company = require("./../model/Company.js");
var BaseAPI = require("./BaseAPI.js");
var HttpStatus = require('http-status-codes');
var ResponseBuilder = require("./ResponseBuilder.js");

var companyData = new CompanyData();
var responseBuilder = new ResponseBuilder();

class CompanyAPI {

    constructor(app) {
        this.baseUrl = BaseAPI.getUrl() + "/companies";
        this.app = app;
        this.publishEndPoints();
    }

    publishEndPoints() {
        this.createCompany();
        this.getAllCompanies();
        this.getCompanyById();
        this.updateCompany();
        this.removeCompanyById();
    }

    /**
     * Create a Company from request body parameters and send to CompanyData
     * Res.end the created Company
     */
    createCompany(){
        this.app.post(this.baseUrl + '/create', function (req, res) {
            var company = new Company(0, req.body.name);
            console.log("CompanyAPI: Company to create " + company.name);
            CompanyData.create(company).then(function (result) {
                res = ResponseBuilder.createResponse(res, HttpStatus.CREATED);
                res.end(JSON.stringify(result));
            }).catch(function(result){
                res.end("Company could not be created");
            })
        })
    }

    /**
     * Read all Companies
     from CompanyData
     */
    getAllCompanies() {
        this.app.get(this.baseUrl + '', function (req, res) {
            CompanyData.getAll().then(function (result) {
                res = ResponseBuilder.createResponse(res, HttpStatus.OK);
                res.end(JSON.stringify(result));
            }).catch(function(result){
                res.end("could not get all companies");
            })
        })
    }

    /**
     * Find Company by Id
     */
    getCompanyById() {
        this.app.get(this.baseUrl + '/:id', function (req, res) {
            CompanyData.getById(req.params.id).then(function (result) {
                res = ResponseBuilder.createResponse(res, HttpStatus.OK);
                res.end(JSON.stringify(result));
            }).catch(function(result){
                res.end("could not get company by id");
            })
        })
    }

    /**
     * Update a Company
     */
    updateCompany(){
        this.app.put(this.baseUrl + '/update', function (req, res) {
            var company = new Company(req.body.id, req.body.name);
            CompanyData.update(company).then(function (result) {
                res = ResponseBuilder.createResponse(res, HttpStatus.OK);
                res.end(result);
            }).catch(function(result){
                res.end("could not update company");
            })
        })
    }

    /**
     * Remove a Company
     */
    removeCompanyById(){
        this.app.delete(this.baseUrl + '/remove/:id', function (req, res) {
            CompanyData.removeById(req.params.id).then(function (result) {
                res = ResponseBuilder.createResponse(res, HttpStatus.ACCEPTED);
                res.end(result);
            }).catch(function(result){
                res.end("could not remove company");
            })
        })
    }
}

module.exports = CompanyAPI;