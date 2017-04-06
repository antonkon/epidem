var mongoose = require('mongoose');
mongoose.connect('mongodb://192.168.88.253/epidem');

var schema = new mongoose.Schema({
	login: {
		type: String,
		unique: true,
		required: true
	},
	pwd: {
		type: String,
		required: true
	},
	email: {
		type: String,
		unique: true,
		required: true
	},
	date: { 
		type: Date, 
		default: Date.now 
	},
	isValid: { 
		type: Boolean, 
		default: false
	}
});

exports.Register = mongoose.model('register', schema);
