var express = require('express');
var auth = require('../scripts/auth');
var router = express.Router();

router.get('/',	auth.authenticate, function(req, res, next) {
	res.render('home', { user : req.user.name, expiry: req.user.expiresSecs });
});

module.exports = router;
