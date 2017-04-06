var model = require('./models/model').Register;

exports.main = function(req, res, next) {
	// главная
	res.render('main', { title: 'Главная', user: false });
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
	res.render('signup', { title: 'Регистрация', user: false, err: false});
};

exports.postSignin = function(req, res) {
	// обработка данных для входа
	console.log(req.body);
	model.findOne({email: req.body.email}, function(err, user){
		if (err) return next(err);
		if (!user) {
			// ошибка: такого пользователя нет
			res.render('signin', { title: 'Ошибка входа', user: false, err: 'Неверное имя пользователя или пароль.' });
		} else {
			res.json(user);
		}
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
		if (err){
			if (err.name === 'MongoError' && err.code === 11000) {
				// ошибка регистрации: user с такими данными уже есть
				res.render('signup', {
					title: 'Ошибка регистрации',
					user: false,
					err: 'Пользователь с такими данными уже зарегистрирован !'});
			} else {
				// другая ошибка
    			next(err);
    		}
  		} else {
  			// регистрация успешна
  			res.render('confim', { title: 'Подтвердите E-mail', user: false});
  		}
	});	
};

exports.logout = function(req, res) {
	// разлогинить

};

exports.getInterview = function(req, res) {
	// страница опросника
	res.render('interview', { title: 'Опрос', err: false, user:false});

}

exports.postInterview = function(req, res){
	// обработка данных пользователя анкеты и начало опроса
	res.render('quest', { title: 'Опрос', err: false, user:false});
}