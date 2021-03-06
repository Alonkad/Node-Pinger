var request = require('request'),
    mailer = require('./mailer'),
    config = require('../config'),
    statusCodes = require('http').STATUS_CODES;
 

//Ping Constructor
function Ping (opts) {
    //holds name of the website
    this.alias = '';

    //holds url to be monitored
    this.website = '';
 
    //ping intervals in minutes
    this.interval = 5;
 
    //interval handler
    this.handle = null;

    //Counts the number of bad requests
    this.strikes = 0;

    //Response validate function
    this.validate = null;
 
    //initialize the app
    return this.init(opts);
}

//Methods
Ping.prototype = {
    init: function (opts) {
        var self = this;

        self.alias = (opts.alias) ? opts.alias : opts.website;
        self.website = opts.website;
        self.interval = ((!opts.interval || isNaN(opts.interval) || opts.interval <= 0 ) ? self.interval : opts.interval)  * (60 * 1000);
        self.validate = (typeof opts.validate === 'function') ? opts.validate : self.defaultValidator;

        //start monitoring

        //TODO: Remove before production
        //self.start();

        return this;
    },

    defaultValidator: function (statusCode, body) {
        return (statusCode === 200);
    },

    start: function () {
        var self = this,
            time = Date.now();
 
        self.log("\nMonitoring: " + self.alias + " (" + self.website + ")\nTime: " + config.mail.utils.getFormatedDate(time) + "\n");
 
        //create an interval for pings
        self.handle = setInterval(function () {
            self.ping();
        }, self.interval);

        if(config.pingOnStart) {
            //Do first ping now
            self.ping();
        }
    },

    stop: function () {
        var self = this;

        self.log("Stopping monitor: " + self.alias + " (" + self.website + ")\nTime: " + config.mail.utils.getFormatedDate(Date.now()) + "\n");

        clearInterval(this.handle);
        this.handle = null;
    },

    ping: function () {
        var self = this,
            currentTime = Date.now();
 
        try {
            //send request
            request(self.website, function (error, res, body) {
                //Loading error
                if(error) {
                    self.isNotOk((res && res.statusCode) ? res.statusCode : undefined);
                    return;
                }

                //Call the custom (or default) validator
                if(self.validate(res.statusCode, body)) {
                    self.isOk();
                }
                else {
                    self.isNotOk(res.statusCode);
                }
            });
        }
        catch (err) {
            self.isNotOk();
        }
    },
 
    isOk: function () {
        this.strikes = 0;
        this.log('OK', 'UP');
    },

    isNotOk: function (statusCode) {
        var self = this,
            statusCodeMsg = (isNaN(statusCode)) ? '' : statusCodes[statusCode + ''];

        this.log(statusCodeMsg, 'DOWN');
 
        this.strikes++;
        if(this.strikes === config.strikes) {  //Send an email only when strike count reached
            //mailing options
            var mailOpts = {
                from: (config.mail.message.from) ? config.mail.message.from : config.mail.account.email,
                replyTo: (config.mail.message.replyTo) ? config.mail.message.replyTo : config.mail.account.email,
                to: config.mail.message.to,
                cc: config.mail.message.cc,
                bcc: config.mail.message.bcc,
                subject: config.mail.message.subject(self.alias, self.website),
                html: config.mail.message.content(self.alias, self.website, statusCode, statusCodeMsg)
            };

            mailer.send(mailOpts, function (error, res) {
                if (error) {
                    self.log(res);
                }
            });

            if(config.stopOnLastStricke) {
                self.stop();
            }
        }
    },
 
    log: function (msg, status) {
        if(!config.log || !msg) {
            return;
        }

        if(!status) {
            console.log(msg);
            return;
        }

        var self = this,
            time = Date.now(),
            output = '';
 
        output += "\nWebsite: " + self.website;
        output += "\nTime: " + config.mail.utils.getFormatedDate(time);
        output += "\nStatus: " + status;
        output += "\nMessage:" + msg  + "\n";
 
        console.log(output);
    }
};

module.exports = Ping;
