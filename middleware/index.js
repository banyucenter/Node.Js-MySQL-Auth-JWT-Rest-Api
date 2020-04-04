var express = require('express');
var auth = require('./auth');
var router = express.Router();
var verifikasi = require('./verifikasi');

router.post('/api/v1/login', auth.login);
router.post('/api/v1/register', auth.registrasi);
router.get('/api/v1/test', auth.test);
router.get('/api/v1/user', verifikasi(2), auth.rahasiauser);
router.get('/api/v1/admin', verifikasi(1), auth.rahasiaadmin);

module.exports = router;