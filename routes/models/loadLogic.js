var interview = require('./model').Interview;
var fs = require('fs');
var conf = require('config');

module.exports = function() {

    try {
        var Logics = JSON.parse(fs.readFileSync(__dirname + "/" + conf.get('file_logic')));
    } catch (e) {
        console.log(e);
    }

    var logic = new interview({
        name: "logic",
        response: Logics
    });

    interview.find({ name: "logic" }, function(err, lo) {
        if (err) throw err;

        if (lo.length == 0) {
            // логики вообще нет
            logic.save(function(err) {
                if (err) throw err;

                console.log("Логика сохранена !");
            });
        } else {
            // обновление
            interview.update({ name: "logic" }, { $set: { response: Logics } }, function(err) {
                if (err) throw err;

                console.log("Логика обновлена !");
            });
        }
    });
};