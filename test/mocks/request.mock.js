statusCodeToSimulate = 200;

module.results = {
    "200": {
        error: null,
        res: {
            statusCode: 200
        },
        body: ''
    },
    "404": {
        error: null,
        res: {
            statusCode: 404
        },
        body: ''
    },
    "500": {
        error: null,
        res: {
            statusCode: 500
        },
        body: ''
    }
};

module.exports = function(url, callback) {
    var resultToReturn = module.results[statusCodeToSimulate];

    callback(resultToReturn.error, resultToReturn.res, resultToReturn.body);
};