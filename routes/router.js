var express = require('express');
var router = express.Router();
var handlers = require('./handlers');


router.get('/', handlers.main);

router.get('/signin', handlers.getSignin);
router.post('/signin', handlers.postSignin);

router.get('/logout', handlers.logout);

router.get('/signup', handlers.getSignup);
router.post('/signup', handlers.postSignup);

router.get('/interview', handlers.getInterviewFirst);
router.post('/interview', handlers.postInterviewFirst);

router.post('/questions', handlers.getQuestions);

module.exports = router;