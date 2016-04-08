var express = require('express');
var passport = require('passport');

var router = express.Router();

router.get('/',	passport.authenticate('jwt', { session: false}), function(req, res, next) {
	res.render('home', { user : req.user.name });
});

module.exports = router;
