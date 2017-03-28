exports.main = function(req, res) {
	// главная
	res.render('main', { title: 'Главная', user: false });
};

exports.getQuestions = function(req, res) {
	// отправить вопросы (в json формате)
};

exports.getSignin = function(req, res) {
	// страница войти
	res.render('signin', { title: 'Вход', user: false });
};

exports.getSignup = function(req, res) {
	// страница регистрация
};

exports.postSignin = function(req, res) {
	// обработка данных для входа
	console.log('111');
	res.render('signin', { title: 'Вход', user: true });
};

exports.postSignup = function(req, res) {
	// обработка данных для регистрации
};

exports.logout = function(req, res) {
	// разлогинить
};