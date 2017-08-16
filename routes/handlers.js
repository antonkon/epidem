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

    req.session.PerDataQuest = {
        okato: req.body.okato,
        age_group_id: req.body.age_group_id,
        gender: req.body.gender,
        height_group_id: req.body.height_group_id,
        weight_group_id: req.body.weight_group_id,
        smoking: req.body.smoking,
        id_social_status: req.body.id_social_status,
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
    // req.session.PerDataQuest

    // try {
    //     var logics = JSON.parse(fs.readFileSync(__dirname + "/" + conf.get('file_logic')));
    // } catch (e) {
    //     console.log(e);
    // }

    // console.log(logics);

    // var req_q = "";

    // for (key in logics) { // идём по списку логики 
    //     if (key == "state") continue; // отсееваем первый, так как там все возможные состояния, а не логика
    //     logic = logics[key]; // берём логику нозологии

    //     console.log(logic);
    //     // нужно составить ответ для сравнения с логикой
    //     for (i = 1; i <= logic[0]; i++) { // кол-во вопросов находится на первом месте массива логики
    //         console.log("q" + key[1] + "_" + i);
    //         console.log(req.body["q" + key[1] + "_" + i]);

    //         if (req.body["q" + key[1] + "_" + i] == 1) { // состовляем имя свойства и достаём
    //             req_q = req_q + "+";
    //         } else {
    //             if (req.body["q" + key[1] + "_" + i] == 0) {
    //                 req_q = req_q + "-";
    //             } else {
    //                 if (req.body["q" + key[1] + "_" + i].indexOf("|") != -1) { // если есть | то пишем |..| с содержимым
    //                     req_q = req_q + req.body["q" + key[1] + "_" + i].substring(req.body["q" + key[1] + "_" + i].indexOf("|")) + "|";
    //                 } else {
    //                     req_q = req_q + "0";
    //                 }
    //             }
    //         }
    //     } // ответ сформирован в req_q

    //     lonsole.log(req_q);
    // теперь нужно сравнить логику и ответы
    // для этого нужно пройтись по элементам массива

    // for (i = 1; i < logic.length; i++) {
    //     logic[i]
    // }

    // }

    var dataInterview = new interview({
        name: "dataInterview",
        PerDataQuest: req.session.PerDataQuest,
        noz: req.body
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
    res.render('profile', { title: 'Профиль пользователя', err: false });
}

exports.apiCharts = function(res, rec) {
    console.log(res.body);
}