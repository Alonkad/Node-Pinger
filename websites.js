/*
    List of websites to be monitored
*/
module.exports = [
    {
        //Web-Dialog Admin Site
        url: 'http://services.cap1dev.conduit-apps.com/cwd/admin/login',
        timeout: 5
    },
 
    {
        //Web-Dialog Service End-Point
        url: 'http://services.cap1dev.conduit-apps.com/service/cwd/dialogVersions.json',
        timeout: 5
    },
 
    {
        //This Site
        url: 'http://cap1dev.conduit-apps.com/Apps/alon/error.php',
        timeout: 5
    }
];