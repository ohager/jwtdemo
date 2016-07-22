var uuid = require('node-uuid');
var _ = require('lodash');

var users = [
	{
		id : 1,
		name: 'Oliver',
		pass: '123test'
	},
	{
		id : 2,
		name: 'Jesus',
		pass: 'jesus'
	},
	{
		id : 3,
		name: 'RiotGuy',
		pass: 'password'
	}
];

function __findByName(name){
	return _.find(users, {name: name});
}

module.exports = {
	findByName: function(name){
		var user = __findByName(name);
		if(!user) return null;
		delete user.pass;
		return user;
	},
	login : function(username, password){
		var user = __findByName(username);
		if(!user) return null;
		return user.pass === password ? user : null;
	}
};