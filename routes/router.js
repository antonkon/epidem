var express = require('express');
var router = express.Router();
var handlers = require('./handlers');


router.get('/', handlers.main);

router.get('/signin', handlers.getSignin);
router.post('/signin', handlers.postSignin);

router.get('/logout', handlers.logout);

router.get('/signup', handlers.getSignup);
router.post('/signup', handlers.postSignup);

// отдает страницу с интервью
router.get('/interview', handlers.getInterviewFirst);
// Записывает пользовательские данные в сессию
router.post('/interview', handlers.postInterviewFirst);

// обработчик ответов опросника
router.post('/questions', handlers.questions);

module.exports = router;