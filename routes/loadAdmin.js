var admin_model = require('./models/admin_model').AdminRegister;

module.exports = function(req, res, next) {
    if (!req.session.admin) {
        res.locals.admin = null;
        return next();
    }

    admin_model.findById(req.session.admin, function(err, admin) {
        if (err) return next(err);

        res.locals.admin = admin;
        next();
    });
};