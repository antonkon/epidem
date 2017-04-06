var modal = require('./models/model').Register

module.exports = function(req, res, next) {
	if (!req.session.user) {
		console.log('1');
		res.locals.user = null;
		return next();
	}

	model.findById(req.session.user, function(err, user){
		if (err) return next(err);
		console.log('2');
		req.user = res.locals.user = user;
		next();
	});
};