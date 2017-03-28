var express = require('express');
var router = express.Router();
var handlers = require('./handlers');

router.get('/', handlers.main);
router.get('/getQuestions', handlers.getQuestions);
router.get('/signin', handlers.getSignin);
router.get('/signup', handlers.getSignup);
router.post('/signin', handlers.postSignin);
router.post('/signup', handlers.postSignup);

module.exports = router;