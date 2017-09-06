class HelloWorldAPI {

    constructor(app) {
        this.app = app;

        this.helloWorldEndPoint();
    }

    helloWorldEndPoint(){
        this.app.get('/helloWorldAPI', function (req, res) {
            res.end("Hello world api!!!!");
        })
    }
}

module.exports = HelloWorldAPI;