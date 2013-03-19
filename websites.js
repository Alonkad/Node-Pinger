/*
    List of websites to be monitored
*/
module.exports = [
    {
        //Web-Dialog Admin Site
        alias: 'Web-Dialog Admin Site',
        url: 'http://services.cap1dev.conduit-apps.com/cwd/admin/login',
        interval: 1,
        validate: function(statusCode, body) {
            //This function should return true if the response is valid and false if not

            return (statusCode !== 200);
        }
    },
 
    {
        //Web-Dialog Service
        alias: 'Web-Dialog Service',
        url: 'http://services.cap1dev.conduit-apps.com/service/cwd/dialogVersions.json',
        interval: 1
    }/*,
 
    {
        //This Site
        url: 'http://cap1dev.conduit-apps.com/Apps/alon/error.php',
        interval: 5
    }*/
];