module.exports = {
    pingOnStart: true,
    log: true,
    strikes: 1,
    stopOnLastStricke: true,

    mail: {
        account: {
            email: 'shuki.duki77@gmail.com',
            password: 'feedback123'
        },
        message: {
            //from: account.email,     //Defaults to the account email. Uncomment to specify a different address
            //replyTo: account.email,  //Defaults to the account email. Uncomment to specify a different address
            to: 'Alon Kaduri <alon.kaduri@conduit.com>',  //'you@example.com, another@example.com',  //Comma separated addresses. Name can be formatted as well: 'Receiver Name <receiver@gmail.com>'
            cc: '',   //Optional
            bcc: '',  //Optional
            subject: function(alias, url) {
                //Edit the mail subject as you like

                return (alias + ' is down !');
            },
            content: function(alias, url, statusCode, statusCodeMsg) {
                //Edit the mail body as you like

                var time =  module.exports.mail.utils.getFormatedDate(Date.now());
                var htmlMsg = '<p>Time: ' + time + '</p>';
                htmlMsg +='<p>Website: ' + ((alias !== url) ? (alias + ' (' + url + ')') : url) + '</p>';
                htmlMsg += '<p>Message: ' + statusCodeMsg + ' (' + statusCode + ')</p>';

                return htmlMsg;
            }
        },
        utils: {
            getFormatedDate: function (time) {
                //Edit the time format as you like

                var currentDate = new Date(time);

                currentDate = currentDate.toISOString();
                currentDate = currentDate.replace(/T/, ' ');
                currentDate = currentDate.replace(/\..+/, '');

                return currentDate;
            }
        }
    }
};