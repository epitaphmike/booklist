'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _dao = require('./dao');

var _dao2 = _interopRequireDefault(_dao);

var _blueimpMd5 = require('blueimp-md5');

var _blueimpMd52 = _interopRequireDefault(_blueimpMd5);

var _mongodb = require('mongodb');

var salt = 'dfsdfsd';

var newUsersSubjects = [{ name: 'History', path: null }, { name: 'Science', path: null }, { name: 'Literature', path: null }, { name: 'Economics', path: null }, { name: 'Law', path: null }, { name: 'Technology', path: null }];

var UserDAO = (function (_DAO) {
    _inherits(UserDAO, _DAO);

    function UserDAO() {
        _classCallCheck(this, UserDAO);

        _get(Object.getPrototypeOf(UserDAO.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(UserDAO, [{
        key: 'createUser',
        value: function createUser(email, password) {
            var db, _ret;

            return regeneratorRuntime.async(function createUser$(context$2$0) {
                var _this = this;

                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        context$2$0.next = 2;
                        return regeneratorRuntime.awrap(_get(Object.getPrototypeOf(UserDAO.prototype), 'open', this).call(this));

                    case 2:
                        db = context$2$0.sent;
                        context$2$0.prev = 3;
                        context$2$0.next = 6;
                        return regeneratorRuntime.awrap((function callee$2$0() {
                            var newUser, subjectsToInsert;
                            return regeneratorRuntime.async(function callee$2$0$(context$3$0) {
                                while (1) switch (context$3$0.prev = context$3$0.next) {
                                    case 0:
                                        newUser = { email: email, password: this.saltAndHashPassword(password), token: this.saltAndHashToken(email) };
                                        context$3$0.next = 3;
                                        return regeneratorRuntime.awrap(db.collection('users').insert(newUser));

                                    case 3:
                                        subjectsToInsert = newUsersSubjects.map(function (s) {
                                            return _extends({}, s, { userId: '' + newUser._id });
                                        });
                                        context$3$0.next = 6;
                                        return regeneratorRuntime.awrap(db.collection('subjects').insert(subjectsToInsert));

                                    case 6:
                                        return context$3$0.abrupt('return', {
                                            v: newUser
                                        });

                                    case 7:
                                    case 'end':
                                        return context$3$0.stop();
                                }
                            }, null, _this);
                        })());

                    case 6:
                        _ret = context$2$0.sent;

                        if (!(typeof _ret === 'object')) {
                            context$2$0.next = 9;
                            break;
                        }

                        return context$2$0.abrupt('return', _ret.v);

                    case 9:
                        context$2$0.next = 14;
                        break;

                    case 11:
                        context$2$0.prev = 11;
                        context$2$0.t0 = context$2$0['catch'](3);

                        console.log(context$2$0.t0);

                    case 14:
                        context$2$0.prev = 14;

                        _get(Object.getPrototypeOf(UserDAO.prototype), 'dispose', this).call(this, db);
                        return context$2$0.finish(14);

                    case 17:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this, [[3, 11, 14, 17]]);
        }
    }, {
        key: 'lookupUser',
        value: function lookupUser(email, password) {
            var db;
            return regeneratorRuntime.async(function lookupUser$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        context$2$0.next = 2;
                        return regeneratorRuntime.awrap(_get(Object.getPrototypeOf(UserDAO.prototype), 'open', this).call(this));

                    case 2:
                        db = context$2$0.sent;
                        context$2$0.prev = 3;
                        context$2$0.next = 6;
                        return regeneratorRuntime.awrap(db.collection('users').findOne({ email: new RegExp(email, 'i'), password: this.saltAndHashPassword(password) }));

                    case 6:
                        return context$2$0.abrupt('return', context$2$0.sent);

                    case 7:
                        context$2$0.prev = 7;

                        _get(Object.getPrototypeOf(UserDAO.prototype), 'dispose', this).call(this, db);
                        return context$2$0.finish(7);

                    case 10:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this, [[3,, 7, 10]]);
        }
    }, {
        key: 'checkUserExists',
        value: function checkUserExists(email, password) {
            var db;
            return regeneratorRuntime.async(function checkUserExists$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        context$2$0.next = 2;
                        return regeneratorRuntime.awrap(_get(Object.getPrototypeOf(UserDAO.prototype), 'open', this).call(this));

                    case 2:
                        db = context$2$0.sent;
                        context$2$0.prev = 3;
                        context$2$0.next = 6;
                        return regeneratorRuntime.awrap(db.collection('users').findOne({ email: new RegExp(email, 'i') }));

                    case 6:
                        return context$2$0.abrupt('return', !!context$2$0.sent);

                    case 7:
                        context$2$0.prev = 7;

                        _get(Object.getPrototypeOf(UserDAO.prototype), 'dispose', this).call(this, db);
                        return context$2$0.finish(7);

                    case 10:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this, [[3,, 7, 10]]);
        }
    }, {
        key: 'lookupUserByToken',
        value: function lookupUserByToken(token) {
            var db;
            return regeneratorRuntime.async(function lookupUserByToken$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        context$2$0.next = 2;
                        return regeneratorRuntime.awrap(_get(Object.getPrototypeOf(UserDAO.prototype), 'open', this).call(this));

                    case 2:
                        db = context$2$0.sent;
                        context$2$0.prev = 3;
                        context$2$0.next = 6;
                        return regeneratorRuntime.awrap(db.collection('users').findOne({ token: token }));

                    case 6:
                        return context$2$0.abrupt('return', context$2$0.sent);

                    case 7:
                        context$2$0.prev = 7;

                        _get(Object.getPrototypeOf(UserDAO.prototype), 'dispose', this).call(this, db);
                        return context$2$0.finish(7);

                    case 10:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this, [[3,, 7, 10]]);
        }
    }, {
        key: 'findById',
        value: function findById(_id) {
            var db;
            return regeneratorRuntime.async(function findById$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        context$2$0.next = 2;
                        return regeneratorRuntime.awrap(_get(Object.getPrototypeOf(UserDAO.prototype), 'open', this).call(this));

                    case 2:
                        db = context$2$0.sent;
                        context$2$0.prev = 3;
                        context$2$0.next = 6;
                        return regeneratorRuntime.awrap(db.collection('users').findOne({ _id: (0, _mongodb.ObjectID)(_id) }));

                    case 6:
                        return context$2$0.abrupt('return', context$2$0.sent);

                    case 7:
                        context$2$0.prev = 7;

                        _get(Object.getPrototypeOf(UserDAO.prototype), 'dispose', this).call(this, db);
                        return context$2$0.finish(7);

                    case 10:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this, [[3,, 7, 10]]);
        }
    }, {
        key: 'saltAndHashPassword',
        value: function saltAndHashPassword(password) {
            return (0, _blueimpMd52['default'])('' + salt + password + salt);
        }
    }, {
        key: 'saltAndHashToken',
        value: function saltAndHashToken(email) {
            return (0, _blueimpMd52['default'])('' + salt + email + salt);
        }
    }]);

    return UserDAO;
})(_dao2['default']);

exports['default'] = UserDAO;
module.exports = exports['default'];