var passport = require('passport');
var uuid = require('node-uuid');
var _ = require('lodash');
var secret = require('../secret');
var jwt = require('jsonwebtoken');

var refreshIds = [];

function __findById(id){
	return _.findIndex(refreshIds);
}

function __removeId(id){
	var x = __findById(id);
	if(x < 0) return;
	refreshIds.splice(x, 1);
}

function __createId(){
	var id = uuid.v1();
	refreshIds.push(id);
	return id;
}

var JWT_COOKIE_NAME = 'jwt';

module.exports = {
	JwtCookieName : JWT_COOKIE_NAME,
	authenticate : passport.authenticate('jwt', { session: false, failureRedirect : '/login' }),

	createJwt : function(payload){
		return jwt.sign(payload, secret, {
			expiresIn: "1m"
		});
	},
	getJwtPayload : function(token){
		return jwt.decode(token);
	},
	isValidRefreshId: function(id){
		return __findById(id) >= 0;
	},
	createRefreshId: function(){
		return __createId();
	},
	revokeRefreshId : function(id){
		__removeId(id);
	}
};


