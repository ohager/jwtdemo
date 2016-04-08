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

	for(var i=0; i < users.length; ++i){
		var user = users[i];
		if(user.name === name){
			return user;

		}
	}

	return null;
}

module.exports = {
	findByName: function(name){
		var user = __findByName(name);
		return !user ? null : {
			id : user.id,
			name: user.name
		};
	},
	login : function(username, password){
		var user = __findByName(username);
		if(!user) return undefined;

		return user.pass === password ? user : undefined;
	}
};