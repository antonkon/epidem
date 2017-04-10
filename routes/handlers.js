var model = require('./models/model').Register;
var async = require('async');

exports.main = function(req, res, next) {
    // главная
    console.log(req.session.num);
    if (req.session.num) {
        req.session.num++;
        console.log("1");
    } else {
        req.session.num = 0;
        console.log("2");
    }
    req.session.save(function(err) {
        console.log("3");
    });
    res.render('main', { title: req.session.num, user: false });
};

exports.getQuestions = function(req, res) {
    // отправить вопросы (в json формате)
};

exports.getSignin = function(req, res) {
    // страница войти
    res.render('signin', { title: 'Вход', user: false, err: false });
};

exports.getSignup = function(req, res) {
    // страница регистрация
    res.render('signup', { title: 'Регистрация', user: false, err: false });
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
                    res.render('signin', { title: 'Ошибка входа', user: false, err: 'Неверное имя пользователя или пароль.' });
                }
            } else {
                // res.json(user);
                // ошибка: такого пользователя нет
                res.render('signin', { title: 'Ошибка входа', user: false, err: 'Неверное имя пользователя или пароль.' });
            }
        },
    ], function(err, user) {
        if (err) next(err);

        req.session.user = user._id;

        res.render('signin', { title: 'Вход', user: user.login, err: false });
    });

    // res.render('signin', { title: 'Вход', user: true });
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
                    user: false,
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
    res.render('interview', { title: 'Опрос', err: false, user: false });
}

exports.postInterview = function(req, res) {
    // страница опросника

}