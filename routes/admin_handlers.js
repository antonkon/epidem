exports.admin = function(req, res) {
    res.render('admin', { title: 'Вход в панель управления', err: false, user: false });
}

exports.admin_one = function(req, res) {
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