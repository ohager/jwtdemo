var express = require('express');
var jwt = require('jsonwebtoken');
var userRepo = require('../repos/user-repo');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('login', { title: 'Express' });
});

router.post('/', function(req, res, next){

	// imagine user and password are correct
	var user = userRepo.login(req.body.username, req.body.password);

	if(!user){
		res.redirect('/login');
		return
	}

	var authorizedUser = {
		name: user.name,
		id : user.id
	};

	var token = jwt.sign(authorizedUser, 'secret', {
		expiresIn: 8 * 60 * 60 // 8 hours
	});

	res.cookie('jwt', token, {httpOnly : true});
	res.redirect('/home');

});

module.exports = router;
