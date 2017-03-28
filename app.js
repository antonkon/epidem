var express = require('express'),
	router = require('./routes/router'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	errorHandler = require('errorhandler'),
	app = express();


// Configuration
app.engine('ejs', require('ejs-locals'));
app.set('views', __dirname + '/templates');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/media'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride());

if ('development' == app.get('env')) {
  app.use(errorHandler());
}

app.use('/', router);

app.listen(3000, function(){
	console.log("Сервер запущен:");
});
