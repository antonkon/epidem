var interview = require('./model').Interview;
var fs = require('fs');

module.exports = function() {

    try {
        var Quest = JSON.parse(fs.readFileSync(__dirname + "/Questions.json"));
    } catch (e) {
        console.log(e);
    }

    // console.log(Quest);
    var quest = new interview({
        name: "questions",
        any: Quest
    });

    interview.find({ name: "questions" }, function(err, qu) {
        if (err) throw err;

        if (qu.length == 0) {
            // вопросов вообще нет
            quest.save(function(err) {
                if (err) throw err;

                console.log("Вопросы сохранены !");
            });
        } else {
            // сохранение успешно
            interview.update({ name: "questions" }, Quest, function(err) {
                if (err) throw err;

                console.log("Вопросы обновлены !");
            });
        }
    });
};