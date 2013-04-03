var Ping = require('./lib/ping');
var websites = require('./websites');
var express = require('express');
var engine = require('ejs-locals');

var adminUser = {
        username: '1',
        password: '1'
    },
    server,
    urls = [],    
    monitors = [];

//General app configurations (middlewares)
var app = express();
app.use(express.compress());  //Gzip the responses
var cacheMaxAge = 86400;  //One day
app.use(express.static(__dirname + '/public', { maxAge: cacheMaxAge * 1000 }));  //serves static files from the public folder
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.session({
    secret: 'Yippee ki-yay motherfucker',
    cookie: { maxAge: new Date(Date.now() + cacheMaxAge * 1000) }
}));

//Error handling configuration
app.configure('development', function () {
    app.use(express.errorHandler({ dumpExceptions:true, showStack:true }));
});
app.configure('production', function () {
    app.use(express.errorHandler());
});

//Setup template engine
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('ejs', engine);


//Validates restricted requests
function checkAuth(req, res, next) {
    if (!req.session.user_id) {
        res.render('login', { user: '', message: 'Not authorized' });
    } else {
        //Prevent from restricted pages being cached
        res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
        next();
    }
}


//Login page
app.get('/login', function (req, res) {
    res.render('login', { user: '', message: '' });
});


//Login action handler
app.post('/login', function (req, res) {
    var post = req.body;
    if (post.username === adminUser.username && post.password === adminUser.password) {
        req.session.user_id = adminUser.username;
        res.redirect('/');
    } else {
        res.render('login', { user: '', message: 'Bad user/pass' });
    }
});


app.get('/logout', function (req, res) {
    req.session.user_id = '';
    res.render('login', { user: '', message: '' });
});


//Anything else - Main page
app.get('*', checkAuth, function (req, res) {
    res.render('index', { user: req.session.user_id || '' });
});


/* Start the server */
var port = process.env.PORT || 8005;
app.listen(port, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});





 
/*
websites.forEach(function (website) {
    var monitor = new Ping ({
        alias: website.alias,
        website: website.url,
        interval: website.interval,
        validate: (typeof website.validate === 'function') ? website.validate : null
    });
    
    urls.push(website.url);
    monitors.push(monitor);
});*/
 
 
//TODO: Create admin for managing websites
/*server = http.createServer(function (req, res) {
    var data = "Monitoring the following websites: \n \n" + urls.join("\n");
 
    res.end(data);
});

server.listen(port);
console.log('Listening to port %s', port);
*/