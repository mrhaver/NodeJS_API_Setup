var url = "/api";

/**
 * An API controller handles the request and the response 
 * Reacts like an REST API
 */
class ResponseBuilder{

    /**
     * create a response with the status as header
     * @param {*} response 
     * @param {*} status 
     */
    static createResponse(response, status){
        response.header("Content-Type", "application/json");
        response.header("Status", status);
        return response;
    }
}

module.exports = ResponseBuilder;