var request = require('request'),
    mailer = require('./mailer'),
    statusCodes = require('http').STATUS_CODES;
 

//Ping Constructor
function Ping (opts) {
    // holds website to be monitored
    this.website = '';
 
    // ping intervals in minutes
    this.timeout = 15;
 
    // interval handler
    this.handle = null;

    //Counts the number of bad requests
    this.strikes = 0;
 
    // initialize the app
    this.init(opts)
}

//Methods
Ping.prototype = {
    init: function (opts) {
        var self = this;
        self.website = opts.website;
        self.timeout = (opts.timeout * (60 * 1000));

        //start monitoring
        self.start();
    },

    start: function () {
        var self = this,
            time = Date.now();
 
        console.log("\nLoading... " + self.website + "\nTime: " + self.getFormatedDate(time) + "\n");
 
        //create an interval for pings
        self.handle = setInterval(function () {
            self.ping();
        }, self.timeout);

        //Do first ping now
        self.ping();
    },

    stop: function () {
        clearInterval(this.handle);
        this.handle = null;
    },

    ping: function () {
        var self = this,
            currentTime = Date.now();
 
        try {
            //send request
            request(self.website, function (error, res, body) {
                //Website is up
                if (!error && res.statusCode === 200) {
                    self.isOk();
                }
 
                //No error but website not ok
                else if (!error) {
                    self.isNotOk(res.statusCode);
                }
 
                //Loading error
                else {
                    self.isNotOk();
                }
            });
        }
        catch (err) {
            self.isNotOk();
        }
    },
 
    isOk: function () {
        this.strikes = 0;
        this.log('UP', 'OK');
    },

    isNotOk: function (statusCode) {
        var self = this,
            time =  self.getFormatedDate(Date.now()),
            msg = statusCodes[statusCode + ''],
 
            htmlMsg = '<p>Time: ' + time;
            htmlMsg +='</p><p>Website: ' + self.website;
            htmlMsg += '</p><p>Message: ' + msg + '</p>';
 
        this.log('DOWN', msg);
 
        this.strikes++;
        if(this.strikes === 3) {  //Send an email only on the 3rd strike
            mailer({
                from: 'shuki.duki77@gmail.com',
                to: 'alon.kaduri@conduit.com',
                subject: self.website + ' is down',
                body: htmlMsg
            }, function (error, res) {
                if (error) {
                    console.log(error);
                }
            });
        }
    },
 
    log: function (status, msg) {
        var self = this,
            time = Date.now(),
            output = '';
 
        output += "\nWebsite: " + self.website;
        output += "\nTime: " + self.getFormatedDate(time);
        output += "\nStatus: " + status;
        output += "\nMessage:" + msg  + "\n";
 
        console.log(output);
    },
 
    getFormatedDate: function (time) {
        var currentDate = new Date(time);
 
        currentDate = currentDate.toISOString();
        currentDate = currentDate.replace(/T/, ' ');
        currentDate = currentDate.replace(/\..+/, '');
 
        return currentDate;
    }
};

module.exports = Ping;
