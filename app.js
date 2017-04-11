var express = require('express'),
    router = require('./routes/router'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    errorHandler = require('errorhandler'),
    session = require('express-session'),
    mongostore = require('connect-mongo/es5')(session),
    app = express();


// Configuration
app.engine('ejs', require('ejs-locals'));
app.set('views', __dirname + '/templates');
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride());

app.use(session({
    secret: 'epidem gpo',
    key: 'epi',
    cookie: {
        path: "/",
        httpOnly: true,
        maxAge: null
    },
    store: new mongostore({
        url: 'mongodb://localhost/epidem',
    })
}));

app.use(express.static(__dirname + '/media'));

app.use(require('./routes/loadUser'));

app.use(function(err, req, res, next) {
    if ('development' == app.get('env')) {
        var error = errorHandler();
        error(err, req, res, next);
    } else {
        res.send(500);
    }

});

app.use('/', router);

app.listen(3000, function() {
    console.log("Сервер запущен:");
});
