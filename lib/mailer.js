var nodemailer = require('nodemailer'),
    config = require('../config'),
    mailer;
 
mailer = (function () {
 
    var smtpTrans;
 
    //nodemailer configuration
    try {
        smtpTrans = nodemailer.createTransport('SMTP', {
            service: 'Gmail',
            auth: {
                user: config.mail.account.email,
                pass: config.mail.account.password
            }
        });
    }
    catch (err) {
        smtpTrans = null;
        return;
    }


    function send(mailOpts, callback) {

        if(smtpTrans === null) {
            callback(true, 'Nodemailer could not create Transport');
            return;
        }

        //Send mail
        try {
            smtpTrans.sendMail(mailOpts, function (error, response) {
                //if sending fails
                if (error) {
                    callback(true, error);
                }
                //Yay!! message sent
                else {
                    callback(false, response.message);
                }
            });
        }
        catch (err) {
            callback(true, 'Nodemailer could not send Mail');
        }
    }

    return {
        send: send
    }
})();
 
module.exports = mailer;