var rewire = require("rewire");
var should = require("should");
var Ping = rewire('../lib/ping');
var mocks = {
    config: rewire('./mocks/config.mock'),
    request: rewire('./mocks/request.mock'),
    mailer: rewire('./mocks/mailer.mock'),
    http: rewire('./mocks/http.mock')
};



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


Ping.__set__({
    config: configMock
});


describe('Creating a new monitor', function () {
    var monitor;

    before(function (done) {
        monitor = new Ping ({
            alias: 'a',
            website: 'a',
            interval: 1,
            validate: null
        });

        done();
    });

    it('should have an alias attribute', function () {
        monitor.should.have.property('alias', 'a');
    });
});



// But be careful, if you do something like this you'll change your global
// console instance.
//myModule.__set__("console.log", function () { /* be quiet */ });

// There is another difference to require:
// Every call of rewire() returns a new instance.
//rewire("./myModule.js") === rewire("./myModule.js"); // = false