var jwtd = jwtd || {};

jwtd.logout = function(){
	window.location = "\login";
};

jwtd.calcExpiresIn = function(expiry){
	return  expiry - (~~(Date.now()/1000));
};

jwtd.refresh = function(){
	window.location = encodeURI('login/refresh?returnUrl=' + window.location.href );
};

jwtd.countdown = function(initial, targetElement){
	var expiry = initial;
	setTimeout(jwtd.logout, expiry*1000);

	if(!targetElement) return;

	setInterval(function () {
		targetElement.textContent = --expiry;
	}, 1000);
};

function Cookies(){
	var cookies;

	function mapCookies(){
		cookies = document.cookie.split(';').reduce( function(cookies, cookie){
			var tokens = cookie.trim().split('=');
			cookies[tokens[0]] = tokens[1] || null;
			return cookies;
		}, {});
	}

	if(!cookies){
		mapCookies();
	}

	this.get = function(name) { return cookies[name]; }
}

(function(){

})();

