var Ping = require('./lib/ping'),
    websites = require('./websites'),
    http = require('http'),
    server,
    port = process.env.PORT || 3008,
    urls = [],    
    monitors = [];
 
 
websites.forEach(function (website) {
    var monitor = new Ping ({
        alias: website.alias,
        website: website.url,
        interval: website.interval,
        validate: (typeof website.validate === 'function') ? website.validate : null
    });
    
    urls.push(website.url);
    monitors.push(monitor);
});
 
 
//TODO: Create admin for managing websites
server = http.createServer(function (req, res) {
    var data = "Monitoring the following websites: \n \n" + urls.join("\n");
 
    res.end(data);
});
 
 
server.listen(port);
console.log('Listening to port %s', port);