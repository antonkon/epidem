var express = require('express'),
	router = require('./routes/router'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	errorHandler = require('errorhandler'),
	cookieParser = require('cookie-parser'),
	session = require('express-session'),
	mongostore = require('connect-mongo/es5')(session),
	app = express();


// Configuration
app.engine('ejs', require('ejs-locals'));
app.set('views', __dirname + '/templates');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/media'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'epidem gpo',
  key: 'sid',
  cookie: { 
  	secure: true,
  	httpOnly: true,
  	path: '/',
  	maxAge: null },
  store: new mongostore({ 
    url: 'mongodb://192.168.1.2/epidem',
  })
}));
app.use(methodOverride());

app.use(function(err, req, res, next) {
	console.log('1');
	if ('development' == app.get('env')) {
  		var error = errorHandler();
  		error(err, req, res, next);
	} else {
		res.send(500);
	}

});

app.use('/', router);

app.listen(3000, function(){
	console.log("Сервер запущен:");
});
