var express = require('express');
var passport = require('passport');
var passportJwt = require('passport-jwt');
var JwtStrategy = passportJwt.Strategy;
var ExtractJwt = passportJwt.ExtractJwt;
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var secret = require('./secret');

var login = require('./routes/login');
var home = require('./routes/home');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/login', login);
app.use('/', home);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});



// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {

	res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});




// extends by a cookie extractor
ExtractJwt.fromCookie = function(cookieName){
	return function(req) {
		var token = null;
		if (req && req.cookies)
		{
			token = req.cookies[cookieName];
		}
		return token;
	};
};

var opts = {
	jwtFromRequest: ExtractJwt.fromCookie('jwt'),
	secretOrKey: secret
};

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
	// jwt_payload is the decoded token content, that was created on login.
	console.log(JSON.stringify(jwt_payload));
	done(null, {
			name: jwt_payload.name,
			id: jwt_payload.id,
			refresh_id : jwt_payload.refresh_id,
			expiresSecs: jwt_payload.exp -jwt_payload.iat
	});
}));
passport.initialize();


module.exports = app;
