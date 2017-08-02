var adminRegister = require('./admin_model').AdminRegister;
var conf = require('config');

module.exports = function() {
	
	var admin = new adminRegister({
        login: conf.admin_data.login,
        pwd: conf.admin_data.pwd,
		mainAdmin: true
    });

    adminRegister.find({ login: conf.admin_data.login}, function(err, qu) {
        if (err) throw err;

        if (qu.length == 0) {
            // админа нет
            admin.save(function(err) {
                if (err) throw err;

                console.log("Админ сохранен !");
            });
        } else {
            // сохранение успешно
             adminRegister.update({ login: conf.admin_data.login }, { $set: { pwd: conf.admin_data.pwd } }, function(err) {
                if (err) throw err;

                console.log("Админ обновлен !");
            });
        }
    });
}