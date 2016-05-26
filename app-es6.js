require('regenerator/runtime');
require('./utils/promiseUtils');
require('./private/awsS3Credentials');

const express = require('express');
const app = express();
const path = require("path");
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const nodemailer = require('nodemailer');
const fs = require('fs');
const lwip = require('lwip');

import { authInfo, myAddresses } from './private/mailAuthenticationInfo';
import bookEntryQueueManager from './app/bookEntryQueueManager';
import PendingBookEntryDao from './dataAccess/pendingBookEntryDAO';
import ErrorLoggerDao from './dataAccess/errorLoggerDAO';
import UserDao from './dataAccess/userDAO';

const multer  = require('multer')

var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    RememberMeStrategy = require('passport-remember-me').Strategy;

passport.use(new LocalStrategy(
    function(email, password, done) {
        let userDao = new UserDao();

        userDao.lookupUser(email, password).then(userResult => {
            if (userResult) {
                userResult.id = '' + userResult._id;
                done(null, userResult);
            } else {
                done(null, false, {message: 'Incorrect login'});
            }
        });
    }
));

function consumeRememberMeToken(token, done) {
    let userDao = new UserDao();

    userDao.lookupUserByToken(token).then(userResult => {
        if (userResult) {
            userResult.id = '' + userResult._id;
            done(null, userResult);
        } else {
            done(null, null);
        }
    });
}

passport.use(new RememberMeStrategy(
    function(token, done) {
        consumeRememberMeToken(token, function(err, userResult) {
            if (err) { return done(err); }
            if (!userResult) { return done(null, false); }

            done(null, userResult);
        });
    },
    function(user, done) {
        return done(null, user.token);
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    return done(undefined, { id: '' + id, _id: '' + id });
});

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
app.use(cookieParser());
app.use(session({ secret: 'adam_booklist', saveUninitialized: true, resave: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate('remember-me'));

var expressWs = require('express-ws')(app);

app.listen(process.env.PORT || 3000);

app.use('/static/', express.static(__dirname + '/static/'));
app.use('/node_modules/', express.static(__dirname + '/node_modules/'));
app.use('/react-redux/', express.static(__dirname + '/react-redux/'));
app.use('/utils/', express.static(__dirname + '/utils/'));

app.ws('/bookEntryWS', function(ws, req) {

    bookEntryQueueManager.subscriberAdded(req.user.id, ws);

    //ws.on('message', function(msg) {
    //    console.log('express-ws --- ', msg);
    //});

    //setTimeout(() => {
    //    clearInterval(X);
    //    ws.close();
    //}, 12000)
});


var easyControllers = require('easy-express-controllers').easyControllers;
easyControllers.createAllControllers(app, { fileTest: f => !/-es6\.js$/i.test(f) });

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

app.post('/react-redux/login', passport.authenticate('local'), function(req, response) {
    // If this function gets called, authentication was successful. `req.user` contains the authenticated user.

    //handleSayHello()
    function handleSayHello() {
        // Not the movie transporter!
        let mailTransport = nodemailer.createTransport(authInfo);
        let emailInfo = Object.assign({}, myAddresses, {
            subject: 'You logged in!',
            html: '<h2>You logged in</h2>'
        });

        mailTransport.sendMail(emailInfo, function(err, info){ });
    }

    response.cookie('logged_in', 'true', { maxAge: 900000 });
    if (req.body.rememberme == 1) {
        response.cookie('remember_me', req.user.token, {path: '/', httpOnly: true, maxAge: 604800000});
    }
    response.send(req.user);
});

app.post('/react-redux/logout', function(req, response){
    response.clearCookie('remember_me');
    req.logout();
    response.send({});
});

const multerBookCoverUploadStorage = multer.diskStorage({
    destination: './uploads',
    filename: function (req, file, cb) {
        if (!req.user.id){
            cb('Not logged in');
        } else {
            let path = `${req.user.id}/coverUpload/${file.originalname}`,
                fullPath = __dirname + '/' + path;

            fs.stat(fullPath, function(err, results){
                if (err){
                    fs.mkdir(fullPath, (err, res) => {
                        if (err){
                            console.log(err);
                        }
                        cb(path)
                    });
                } else {
                    cb(path);
                }
            })
        }
    }
});
const upload = multer({ storage: multerBookCoverUploadStorage });

//TODO: refactor to be a controller action - will require middleware in easy-express-controllers which doesn't currently exist
app.post('/react-redux/upload', upload.single('fileUploaded'), function(req, response){
    response.send({ success: true });
});

app.post('/react-redux/createUser', function(req, response){
    let userDao = new UserDao(),
        username = req.body.username,
        password = req.body.password;

    userDao.checkUserExists(username, password).then(exists => {
        if (exists) {
            response.send({ errorCode: 's1' });
        } else {
            userDao.createUser(username, password).then(() => {
                response.send({});
            });
        }
    });
});

process.on('uncaughtException', function (err) {
    try{
        let logger = new ErrorLoggerDao();
        logger.log('exception', err);
    } catch(e) { }
});

process.on('unhandledRejection', function (err, p) {
    try{
        let logger = new ErrorLoggerDao();
        logger.log('promise rejection', err);
    } catch(e) { }
});

var AWS = require('aws-sdk');
AWS.config.region = 'us-east-1';

/*
fs.readFile('./uploads/beefcake.jpg', function (err, data) {
    console.log('file read', err, data);
    if (err) throw err; // Something went wrong!

    let s3bucket = new AWS.S3({ params: { Bucket: 'my-library-cover-uploads' } });
    let params = {
        Key: 'the/file/x.jpg',
        Body: data
    };

    s3bucket.upload(params, function (err, data) {
        if (err) {
            console.log(err, ':(')
        } else {
            console.log(data, 'hooray! :)')
        }
    });
});

lwip.open('./uploads/li_large.jpg', function (err, image) {
    if (err){
        console.log('err', err)
    }

    let width = image.width(),
        height = image.height();

    let ratio = height / width;
    let newWidth = (height * 50) / width;

    console.log('opened', width, height);
    image.resize(50, newWidth, function(err, image){
        console.log('resized', image, typeof image.writePath);

        image.writeFile('./uploads/li_finished.jpg', err => {
            console.log('root?')
            if (err) {
                console.log(err);
            }else {
                console.log('written?');
            }
        });
    });
});
*/

bookEntryQueueManager.initialize();