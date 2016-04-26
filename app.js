'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilsMailAuthenticationInfo = require('./utils/mailAuthenticationInfo');

var _appBookEntryQueueManager = require('./app/bookEntryQueueManager');

var _appBookEntryQueueManager2 = _interopRequireDefault(_appBookEntryQueueManager);

var _dataAccessPendingBookEntryDAO = require('./dataAccess/pendingBookEntryDAO');

var _dataAccessPendingBookEntryDAO2 = _interopRequireDefault(_dataAccessPendingBookEntryDAO);

var _dataAccessErrorLoggerDAO = require('./dataAccess/errorLoggerDAO');

var _dataAccessErrorLoggerDAO2 = _interopRequireDefault(_dataAccessErrorLoggerDAO);

var _dataAccessUserDAO = require('./dataAccess/userDAO');

var _dataAccessUserDAO2 = _interopRequireDefault(_dataAccessUserDAO);

require('regenerator/runtime');
require('./utils/promiseUtils');

var express = require('express');
var app = express();
var path = require("path");
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var nodemailer = require('nodemailer');

var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    RememberMeStrategy = require('passport-remember-me').Strategy;

passport.use(new LocalStrategy(function (email, password, done) {
    var userDao = new _dataAccessUserDAO2['default']();

    userDao.lookupUser(email, password).then(function (userResult) {
        if (userResult) {
            userResult.id = '' + userResult._id;
            done(null, userResult);
        } else {
            done(null, false, { message: 'Incorrect login' });
        }
    });
}));

function consumeRememberMeToken(token, done) {
    var userDao = new _dataAccessUserDAO2['default']();

    userDao.lookupUserByToken(token).then(function (userResult) {
        if (userResult) {
            userResult.id = '' + userResult._id;
            done(null, userResult);
        } else {
            done(null, null);
        }
    });
}

passport.use(new RememberMeStrategy(function (token, done) {
    consumeRememberMeToken(token, function (err, userResult) {
        if (err) {
            return done(err);
        }
        if (!userResult) {
            return done(null, false);
        }

        done(null, userResult);
    });
}, function (user, done) {
    return done(null, user.token);
}));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

var cache = {};

passport.deserializeUser(function (id, done) {
    return done(undefined, { id: '' + id, _id: '' + id });

    if (cache[id]) {
        return done(undefined, cache[id]);
    }
    var userDao = new _dataAccessUserDAO2['default']();
    userDao.findById(id).then(function (user) {
        Object.assign(user, { id: '' + user._id });
        //cache[id] = user;
        done(undefined, user);
    }, function (error) {
        return done(error);
    });
});

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));
app.use(cookieParser());
app.use(session({ secret: 'adam_booklist', saveUninitialized: true, resave: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate('remember-me'));

var expressWs = require('express-ws')(app);

app.listen(process.env.PORT || 3000);

app.use('/static/', express['static'](__dirname + '/static/'));
app.use('/node_modules/', express['static'](__dirname + '/node_modules/'));
app.use('/react-redux/', express['static'](__dirname + '/react-redux/'));
app.use('/utils/', express['static'](__dirname + '/utils/'));

app.ws('/bookEntryWS', function (ws, req) {

    _appBookEntryQueueManager2['default'].subscriberAdded(req.user.id, ws);

    //ws.on('message', function(msg) {
    //    console.log('express-ws --- ', msg);
    //});

    //setTimeout(() => {
    //    clearInterval(X);
    //    ws.close();
    //}, 12000)
});

var easyControllers = require('easy-express-controllers').easyControllers;
easyControllers.createAllControllers(app, { fileTest: function fileTest(f) {
        return !/-es6\.js$/i.test(f);
    } });

app.get('/react-redux', function (request, response) {
    if (!!request.user) {
        response.cookie('logged_in', 'true', { maxAge: 900000 });
    } else {
        response.clearCookie('logged_in');
    }
    response.sendFile(path.join(__dirname + '/react-redux/default.htm'));
});

app.get('/favicon.ico', function (request, response) {
    response.sendFile(path.join(__dirname + '/favicon.ico'));
});

app.post('/react-redux/login', passport.authenticate('local'), function (req, response) {
    // If this function gets called, authentication was successful. `req.user` contains the authenticated user.

    //handleSayHello()
    function handleSayHello() {
        // Not the movie transporter!
        var mailTransport = nodemailer.createTransport(_utilsMailAuthenticationInfo.authInfo);
        var emailInfo = Object.assign({}, _utilsMailAuthenticationInfo.myAddresses, {
            subject: 'You logged in!',
            html: '<h2>You logged in</h2>'
        });

        mailTransport.sendMail(emailInfo, function (err, info) {
            if (err) {
                console.log(err);
            } else {
                console.log('Message sent: ' + info.response);
            }
        });
    }

    response.cookie('logged_in', 'true', { maxAge: 900000 });
    if (req.body.rememberme == 1) {
        response.cookie('remember_me', req.user.token, { path: '/', httpOnly: true, maxAge: 604800000 });
    }
    response.send(req.user);
});

app.post('/react-redux/logout', function (req, response) {
    response.clearCookie('remember_me');
    req.logout();
    response.send({});
});

app.post('/react-redux/createUser', function (req, response) {
    var userDao = new _dataAccessUserDAO2['default'](),
        username = req.body.username,
        password = req.body.password;

    userDao.checkUserExists(username, password).then(function (exists) {
        if (exists) {
            response.send({ errorCode: 's1' });
        } else {
            userDao.createUser(username, password).then(function () {
                response.send({});
            });
        }
    });
});

process.on('uncaughtException', function (err) {
    try {
        var logger = new _dataAccessErrorLoggerDAO2['default']();
        logger.log('exception', err);
    } catch (e) {}
});

process.on('unhandledRejection', function (err, p) {
    try {
        var logger = new _dataAccessErrorLoggerDAO2['default']();
        logger.log('promise rejection', err);
    } catch (e) {}
});

_appBookEntryQueueManager2['default'].initialize();