exports.main = function(req, res) {
	// главная
	res.render('main', { title: 'Главная' });
};

exports.getQuestions = function(req, res) {
	// отправить вопросы (в json формате)
};

exports.getSignin = function(req, res) {
	// страница войти
	res.render('signin', { title: 'Вход' });
};

exports.getSignup = function(req, res) {
	// страница регистрация
};

exports.postSignin = function(req, res) {
	// обработка данных для входа
};

exports.postSignup = function(req, res) {
	// обработка данных для регистрации
};