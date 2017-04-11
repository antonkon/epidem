var model = require('./models/model').Register;
var async = require('async');

exports.main = function(req, res, next) {
    // главная  , user: loadUser(req, res, next)
    res.render('main', { title: 'Главная' });
};

exports.getSignin = function(req, res) {
    // страница войти
    res.render('signin', { title: 'Вход', err: false });
};

exports.getSignup = function(req, res) {
    // страница регистрация
    res.render('signup', { title: 'Регистрация', err: false });
};

exports.postSignin = function(req, res) {
    // обработка данных для входа
    var email = req.body.email;
    var pwd = req.body.pwd;

    async.waterfall([
        function(callback) {
            model.findOne({ email: email }, callback);
        },
        function(user, callback) {
            if (user) {
                if (user.checkPwd(pwd)) {
                    // 200 ok
                    callback(null, user);
                } else {
                    // 403
                    res.render('signin', { title: 'Ошибка входа', err: 'Неверное имя пользователя или пароль.' });
                }
            } else {
                // res.json(user);
                // ошибка: такого пользователя нет
                res.render('signin', { title: 'Ошибка входа', err: 'Неверное имя пользователя или пароль.' });
            }
        },
    ], function(err, user) {
        if (err) next(err);

        req.session.user = user._id;

        res.redirect('/');
    });

    // res.render('signin', { title: 'Вход' });
};

exports.postSignup = function(req, res) {
    // обработка данных для регистрации
    console.log(req.body);
    var user = new model({
        login: req.body.login,
        pwd: req.body.pwd,
        email: req.body.email
    });

    user.save(function(err, user, next) {
        if (err) {
            if (err.name === 'MongoError' && err.code === 11000) {
                // ошибка регистрации: user с такими данными уже есть
                res.render('signup', {
                    title: 'Ошибка регистрации',
                    err: 'Пользователь с такими данными уже зарегистрирован !'
                });
            } else {
                // другая ошибка
                next(err);
            }
        } else {
            // регистрация успешна
            res.render('confim', { title: 'Подтвердите E-mail' });
        }
    });
};

exports.logout = function(req, res) {
    // разлогинить
    if (req.session.user) {
        delete req.session.user;
        res.redirect('/');
    }
};

exports.getInterview = function(req, res) {
    // страница опросника
    res.render('interview', { title: 'Опрос', err: false });
}

exports.postInterview = function(req, res) {
    // страница опросника

}