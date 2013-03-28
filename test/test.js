var rewire = require("rewire");
var should = require("should");
var sinon = require('sinon');
var Ping = rewire('../lib/ping');
var mocks = {
    config: rewire('./mocks/config.mock'),
    request: rewire('./mocks/request.mock'),
    mailer: rewire('./mocks/mailer.mock'),
    http: rewire('./mocks/http.mock')
};



Ping.__set__({
    config: mocks.config,
    request: mocks.request
});


//region Creating a new monitor test suit

/*describe('Creating a new monitor', function(){

    describe('With all attributes', function () {
        var monitor,
            monitorConfig = {
                alias: 'Test Alias',
                website: 'http://google.com',
                interval: 1,
                validate: function() { return true; }
            };

        before(function (done) {
            monitor = new Ping(monitorConfig);
            done();
        });


        it('should have an alias attribute', function () {
            monitor.should.have.property('alias', monitorConfig.alias);
        });

        it('should have a website attribute', function () {
            monitor.should.have.property('website', monitorConfig.website);
        });

        it('should have an interval attribute', function () {
            monitor.should.have.property('interval', monitorConfig.interval * (60 * 1000));
        });

        it('should have a validate attribute', function () {
            monitor.validate.should.equal(monitorConfig.validate);
        });
    });


    describe('With only website attribute', function () {
        var monitor,
            monitorConfig = {
                website: 'http://google.com'
            };

        before(function (done) {
            monitor = new Ping(monitorConfig);
            done();
        });


        it('should have the website as an alias attribute', function () {
            monitor.should.have.property('alias', monitorConfig.website);  //Use website attribute as an alias
        });

        it('should have a website attribute', function () {
            monitor.should.have.property('website', monitorConfig.website);
        });

        it('should have an interval attribute', function () {
            monitor.should.have.property('interval', 5 * (60 * 1000));  //Default interval
        });

        it('should have a validate attribute', function () {
            monitor.validate.should.equal(monitor.defaultValidator);  //Default validate function
        });
    });


    describe('With wrong types', function () {
        var monitor,
            monitorConfig = {
                website: 'http://google.com',
                interval: '',  //Bad value / wrong type
                validate: true  //Bad value / wrong type
            };

        before(function (done) {
            monitor = new Ping(monitorConfig);
            done();
        });

        it('should have an interval attribute', function () {
            monitor.should.have.property('interval', 5 * (60 * 1000));  //Default interval
        });

        it('should have a validate attribute', function () {
            monitor.validate.should.equal(monitor.defaultValidator);  //Default validate function
        });
    });
});*/

//endregion Creating a new monitor test suit


//region Handle common responses test suit

describe('Common responses', function () {
    var monitor,
        monitorConfig = {
            alias: 'Test Alias',
            website: 'http://google.com',
            interval: 1,
            validate: null  //Use default validate function
        },
        statusCodesToCheck = [200, 404, 500],
        statusCodeIndex = 0,
        spy;

    before(function (done) {

        done();
    });

    beforeEach(function (done) {
        //Change the status code to simulate
        mocks.request.__set__({
            statusCodeToSimulate: statusCodesToCheck[statusCodeIndex]
        });
        statusCodeIndex++;

        spy = sinon.spy();

        Ping.__set__({
            isOk: spy
        });

        //Re-create the monitor with the mocked request object
        monitor = new Ping(monitorConfig);

        done();
    });

    describe('200', function () {
        it('should have an alias attribute', function () {
            spy.called.should.equal(true);
        });
    });

    /*describe('404', function () {
        it('should have an alias attribute', function () {
            monitor.should.have.property('alias', monitorConfig.alias);
        });
    });

    describe('500', function () {
        it('should have an alias attribute', function () {
            monitor.should.have.property('alias', monitorConfig.alias);
        });
    });*/
});

//endregion Handle common responses test suit






//This allows you to mock almost everything within the module e.g. the fs-module.
//Just pass the variable name as first parameter and your mock as second.
/*myModule.__set__("fs", {
    readFile: function (path, encoding, cb) {
        cb(null, "Success!");
    }
});*/


//You can set different variables with one call.
/*myModule.__set__({
    fs: fsMock,
    http: httpMock,
    someOtherVar: "hello"
});*/


//You may also override globals. These changes are only within the module, so
//you don't have to be concerned that other modules are influenced by your mock.



// But be careful, if you do something like this you'll change your global
// console instance.
//myModule.__set__("console.log", function () { /* be quiet */ });

// There is another difference to require:
// Every call of rewire() returns a new instance.
//rewire("./myModule.js") === rewire("./myModule.js"); // = false