var modelAdmin = require('./models/admin_model').AdminRegister;
var modelRegister = require('./models/model').Register;
var modelRegister_del = require('./models/model').Register_del;
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
        modelAdmin.find({}, function(err, admins) {
            if (err) throw err;

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
                modelAdmin.find({}, function(err, admins) {
                    if (err) throw err;

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
            modelAdmin.find({}, function(err, admins) {
                if (err) throw err;

                res.render('admin_reg', { title: 'Регистрация', err: false, admins: admins });
            });
        }
    });
}

exports.admin_users = function(req, res) {
    if (!req.session.admin) {
        res.redirect('/admin');
    } else {
        async.parallel([
            function(callback) {
                modelRegister.find({ isValid: false }, callback);
            },
            function(callback) {
                modelRegister.find({ isValid: true }, callback);
            }
        ], function(err, result) {
            if (err) next(err);

            res.render('admin_users', { title: 'Пользователи', err: false, users_f: result[0], users_t: result[1] });
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
}

exports.admin_del = function(req, res) {
    var login = req.body.login;

    modelAdmin.remove({ login: login }, function(err) {
        if (err) throw err;

        res.json("ok");
    });
}

exports.user_del = function(req, res) {
    var email = req.body.email;

    modelRegister.findOne({ email: email }, function(err, user_del) {
        if (err) throw err;

        var user_delete = new modelRegister_del({
            login: user_del.login,
            hashedPwd: user_del.hashedPwd,
            salt: user_del.salt,
            email: user_del.email,
            number: user_del.number,
            org: user_del.org,
            isValid: user_del.isValid
        });

        user_delete.save(function(err, user) {
            if (err) throw err;
        });

        modelRegister.remove({ email: email }, function(err) {
            if (err) throw err;

            res.json("ok");
        });
    });
}

exports.user_valid = function(req, res) {
    var email = req.body.email;

    modelRegister.update({ email: email }, { $set: { isValid: true } }, function(err) {
        if (err) throw err;

        res.json("ok");
    });
}