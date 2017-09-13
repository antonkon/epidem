var model = require('./models/model').Register;
var interview = require('./models/model').Interview;
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
};

exports.postSignup = function(req, res, next) {
    // обработка данных для регистрации
    console.log(req.body);
    var user = new model({
        login: req.body.login,
        pwd: req.body.pwd,
        email: req.body.email,
        number: req.body.number,
        org: req.body.org
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
                if (err) throw err;
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

exports.getInterviewFirst = function(req, res) {
    // страница опросника
    res.render('queststart', { title: 'Опрос', err: false });
}

exports.postInterviewFirst = function(req, res, next) {
    // обработка данных пользователя анкеты и начало опроса
    // запоминать данные в сессии
    //console.log(req.body);

    req.session.PerDataQuest = {
        okato: req.body.okato,
        age_group_id: req.body.age_group_id,
        gender: req.body.gender,
        height_group_id: req.body.height_group_id,
        weight_group_id: req.body.weight_group_id,
        smok: req.body.smok,
        social_status_id: req.body.social_status_id,
    };

    getQuestionsLogics(req, res, next);
}

getQuestionsLogics = function(req, res, next) {
    // Отправить вопросы
    async.parallel([
        function(callback) {
            interview.findOne({ name: "questions" }, callback);
        },
        function(callback) {
            interview.findOne({ name: "logic" }, callback);
        }
    ], function(err, result) {
        if (err) next(err);

        res.json({ "quest": result[0], "logic": result[1] });
    });


}

exports.responses = function(req, res) {
    // Ответы на вопросы

    var dataInterview = new interview({
        name: "dataInterview",
        PerDataQuest: req.session.PerDataQuest,
        response: req.body
    });

    dataInterview.interview_save();

    res.json("ok");
}

exports.map = function(req, res) {
    res.render('map', { title: 'Карта', err: false });
}

exports.charts = function(req, res) {
    res.render('charts', { title: 'Диаграммы', err: false });
}

exports.export = function(req, res) {
    res.render('export', { title: 'Экспорт', err: false });
}

exports.profile = function(req, res) {
    if (!req.session.user) {
        res.redirect('/signin');
    } else {
        model.findById(req.session.user, function(err, user) {
            if (err) return next(err);

            date = user.date.toString();
            date = date.substring(0, date.indexOf('GMT'));
            res.render('profile', { title: 'Профиль пользователя', err: false, date: date });
        });
    }
}

exports.postProfile = function(req, res, next) {
    var prop = req.body.prop;
    var prop_value = req.body.prop_value;

    model.findById(req.session.user, function(err, user) {
        if (err) return next(err);

        user[prop] = prop_value;
        user.save(function(err, user) {
            if (err) {
                if (err.code === 11000 && err.name === 'MongoError') {
                    // ошибка изменения: user с такими данными уже есть

                    res.json("err:11000");
                } else {
                    // другая ошибка
                    return next(err);
                }
            } else {

                res.json("ok");
            }
        });
    });
}

exports.apiCharts = function(req, res, next) {
    //console.log(req.body);
    var param = { name: "dataInterview" };

    for (key in req.body) {
        switch (key) {
            case "r2":
                if (req.body[key] == "M")
                    param["PerDataQuest.gender"] = "men";
                else if (req.body[key] == "G")
                    param["PerDataQuest.gender"] = "wom";
                break;
            case "r3":
                if (req.body[key] == "N")
                    param["PerDataQuest.smok"] = "No";
                else if (req.body[key] == "Y")
                    param["PerDataQuest.smok"] = "Yes";
                break;
        }
    }
    //console.log(param);

    async.parallel([
        function(callback) {
            interview.find(param, callback);
        },
        function(callback) {
            interview.find({ name: "dataInterview" }, callback);
        }
    ], function(err, result) {
        if (err) next(err);

        res.json({ "all": result[1].length, "sample": result[0].length });
    });
}