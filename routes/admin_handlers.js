var modelAdmin = require('./models/admin_model').AdminRegister;
var async = require('async');

// Страница входа
exports.admin = function(req, res) {
	if (req.session.admin) {
		res.redirect('/admin_one');
	} else {	
		res.render('admin', { title: 'Вход в панель управления', err: false, flag: true });
	}
}
// переменная flag используется для правильного отображения панели меню

// Обработка входа в админку
exports.admin_post = function(req, res) {
	var login = req.body.login;
    var pwd = req.body.pwd;
	
	if (req.session.admin) {
		res.redirect('/admin_one');
	} else {
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
						res.render('admin', { title: 'Ошибка входа', err: 'Неверное имя пользователя или пароль.' });
					}
				} else {
					// res.json(admin);
					// ошибка: такого пользователя нет
					res.render('admin', { title: 'Ошибка входа', err: 'Неверное имя пользователя или пароль.' });
				}
			},
		], function(err, admin) {
			if (err) next(err);

			req.session.admin = admin._id;

			res.redirect('/admin_one');
		});
	}
}

// Станица статистики
exports.admin_one = function(req, res) {
	
	if (!req.session.admin) {
		res.redirect('/admin');
	} else {	
			res.render('admin_one', { title: 'Статистика', err: false });
	}
}


// Страница регистрации админов
exports.admin_reg = function(req, res) {
	if (!req.session.admin) {
		res.redirect('/admin');
	} else {
		
		// взять из базы имена админов
		modelAdmin.find({}, function (err, admins) {
			res.render('admin_reg', { title: 'Регистрация', err: false, admins: admins });
		});
	}
}

exports.admin_reg_post = function(req, res, next) {
	var login = req.body.login;
    var pass = req.body.pass;
	
	var user = new modelAdmin({
        login: login,
        pwd: pass
    });
	
	user.save(function(err, user, next) {
        if (err) {
            if (err.name === 'MongoError' && err.code === 11000) {
                // ошибка регистрации: user с такими данными уже есть
                modelAdmin.find({}, function (err, admins) {				
					res.render('admin_reg', {
						title: 'Ошибка регистрации',
						err: 'Пользователь с такими данными уже зарегистрирован !',
						user: true,
						admins: admins 
					});
				});
            } else {
                // другая ошибка
                if (err) throw err;
            }
        } else {
            // регистрация успешна
            modelAdmin.find({}, function (err, admins) {
				res.render('admin_reg', { title: 'Регистрация', err: false, admins: admins });
			});
        }
    });
}

exports.admin_users = function(req, res) {
	if (!req.session.admin) {
		res.redirect('/admin');
	} else {
		modelAdmin.find({}, function (err, admins) {
			res.render('admin_users', { title: 'Пользователи', err: false });
		});	
	}
}

exports.admin_data = function(req, res) {
	if (!req.session.admin) {
		res.redirect('/admin');
	} else {
		res.render('admin_data', { title: 'Справочные таблицы', err: false });
	}
}

exports.logout = function(req, res) {
    // разлогинить
    if (req.session.admin) {
        delete req.session.admin;
        res.redirect('/admin');
    }
};



