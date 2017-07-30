var express = require('express');
var router = express.Router();
var handlers = require('./handlers');
var admin_handlers = require('./admin_handlers');


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
router.post('/responses', handlers.responses);

router.get('/map', handlers.map);

router.get('/charts', handlers.charts);
router.post('/charts', handlers.apiCharts)

router.get('/export', handlers.export);

router.get('/profile', handlers.profile);

router.get('/admin', admin_handlers.admin);
router.post('/admin', admin_handlers.admin_post);

router.get('/admin_logout', admin_handlers.logout);

router.get('/admin_one', admin_handlers.admin_one);

router.get('/admin_reg', admin_handlers.admin_reg);

router.get('/admin_users', admin_handlers.admin_users);

router.get('/admin_data', admin_handlers.admin_data);

module.exports = router;