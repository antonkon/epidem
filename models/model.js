var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", function () {
	var regSchema = mongoose.Schema({
		login: String,
		pwd: String,
		mail: String
	});

	regSchema.methods.printLogin = function () {
		console.log(this.login);
	}

	var reg = mongoose.model('Reg', regSchema);

	var user = new reg({
		login: 'sharik',
		pwd: '23423',
		mail: 'feu@we.e'
	});

	user.printLogin();

	user.save(function(err, user) {
		if (err) return console.error(err);
		user.printLogin();
	});

	reg.find(function (err, reg) {
		if (err) return console.error(err);
		console.log('1'+ reg);
	});
});



