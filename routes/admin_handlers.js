var modelAdmin = require('./models/admin_model').AdminRegister;
var async = require('async');

exports.admin = function(req, res) {
    res.render('admin', { title: 'Вход в панель управления', err: false, user: 3 });
}

exports.admin_post = function(req, res) {
	var login = req.body.login;
    var pwd = req.body.pwd;
	
    async.waterfall([
        function(callback) {
            modelAdmin.findOne({ login: login }, callback);
        },
        function(admin, callback) {
            if (admin) {
                if (admin.checkPwd(pwd)) {
                    // 200 ok
                    callback(null, admin);
                } else {
                    // 403
                    res.render('admin', { title: 'Ошибка входа', err: 'Неверное имя пользователя или пароль.', user: false });
                }
            } else {
                // res.json(admin);
                // ошибка: такого пользователя нет
                res.render('admin', { title: 'Ошибка входа', err: 'Неверное имя пользователя или пароль.', user: false });
            }
        },
    ], function(err, admin) {
        if (err) next(err);

        req.session.admin = admin._id;

        res.redirect('/admin_one');
    });
}

exports.admin_one = function(req, res) {
	// сделать проверку на вход
	
    res.render('admin_one', { title: 'Статистика', err: false, user: true });
}

exports.admin_reg = function(req, res) {
    res.render('admin_reg', { title: 'Регистрация', err: false, user: true });
}

exports.admin_users = function(req, res) {
    res.render('admin_users', { title: 'Пользователи', err: false, user: true });
}

exports.admin_data = function(req, res) {
    res.render('admin_data', { title: 'Справочные таблицы', err: false, user: true });
}