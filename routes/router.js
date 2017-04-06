var express = require('express');
var router = express.Router();
var handlers = require('./handlers');

router.get('/', handlers.main);
router.get('/signin', handlers.getSignin);
router.get('/signup', handlers.getSignup);
router.get('/interview', handlers.getInterview);
router.post('/signin', handlers.postSignin);
router.post('/signup', handlers.postSignup);
router.post('/logout', handlers.logout);

module.exports = router;
