var express = require('express');
var userRepo = require('../repos/user-repo');
var auth = require('../scripts/auth');

var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
	res.clearCookie(auth.JwtCookieName);
	res.render('login', { title: 'Express' });
});

router.get('/refresh', function(req, res, next){

	var jwtToken = req.cookies[auth.JwtCookieName];
	var payload = auth.getJwtPayload(jwtToken);

	if(auth.isValidRefreshId(payload.refresh_id)){
		var token = auth.createJwt(payload);
		res.cookie(auth.JwtCookieName, token, {httpOnly : false});
		res.redirect(req.query.returnUrl);
		return;
	}
	res.redirect('/login');
});

router.post('/', function(req, res, next){

	// imagine user and password are correct
	var user = userRepo.login(req.body.username, req.body.password);

	if(!user){
		res.redirect('/login');
		return
	}

	// will be our jwt-payload
	var authorizedUser = {
		name: user.name,
		id : user.id,
		refresh_id : auth.createRefreshId()
	};

	var token = auth.createJwt(authorizedUser);
	res.cookie(auth.JwtCookieName, token, {httpOnly : false});
	res.redirect('/');

});

module.exports = router;
