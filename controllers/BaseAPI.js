var url = "/api";

/**
 * An API controller handles the request and the response 
 * Reacts like an REST API
 */
class BaseAPI{

    static getUrl(){
        return url;
    }

    static CREATE(url, createObject, dataObject){
        this.app.post(url + '/create', function (req, res) {
            // var car = new Car(0, req.body.name, req.body.color);
            console.log(dataObject.toString() + ": creating object " + createObject.toString());
            dataObject.create(createObject).then(function (result) {
                res = ResponseBuilder.createResponse(res, HttpStatus.CREATED);
                res.end(JSON.stringify(result));
            }).catch(function(result){
                res.end("object: " + createObject.toString() + " could not be created");
            })
        })
    }

}

module.exports = BaseAPI;