module.exports = {
    pingOnStart: true,
    logResults: true,
    strikes: 1,
    stopOnLastStricke: false,

    mail: {
        account: {
            email: 'shuki.duki77@gmail.com',
            password: 'feedback123'
        },
        message: {
            //from: account.email,     //Defaults to the account email. Uncomment to specify a different address
            //replyTo: account.email,  //Defaults to the account email. Uncomment to specify a different address
            to: 'you@example.com, another@example.com',  //Comma separated addresses. Name can be formatted as well: 'Receiver Name <receiver@gmail.com>'
            cc: '',   //Optional
            bcc: '',  //Optional
            subject: function(alias, url) {
                return alias + ' is down !';
            },
            content: function(alias, url, statusCode, statusCodeMsg) {
                time =  module.exports.mail.utils.getFormatedDate(Date.now());
                var htmlMsg = '<p>Time: ' + time + '</p>';
                htmlMsg +='<p>Website: ' + alias + ' (' + url + ')</p>';
                htmlMsg += '<p>Message: ' + statusCodeMsg + ' (' + statusCode + ')</p>';

                return htmlMsg;
            }
        },
        utils: {
            getFormatedDate: function (time) {
                var currentDate = new Date(time);

                currentDate = currentDate.toISOString();
                currentDate = currentDate.replace(/T/, ' ');
                currentDate = currentDate.replace(/\..+/, '');

                return currentDate;
            }
        }
    }
};