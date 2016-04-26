'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ObjectId = require('mongodb').ObjectID;
var DAO = require('./dao');

var PendingBookEntryDAO = (function (_DAO) {
    _inherits(PendingBookEntryDAO, _DAO);

    function PendingBookEntryDAO(userId) {
        _classCallCheck(this, PendingBookEntryDAO);

        _get(Object.getPrototypeOf(PendingBookEntryDAO.prototype), 'constructor', this).call(this);
        this.userId = userId;
    }

    _createClass(PendingBookEntryDAO, [{
        key: 'getLatest',
        value: function getLatest(count) {
            var db;
            return regeneratorRuntime.async(function getLatest$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        context$2$0.next = 2;
                        return regeneratorRuntime.awrap(_get(Object.getPrototypeOf(PendingBookEntryDAO.prototype), 'open', this).call(this));

                    case 2:
                        db = context$2$0.sent;
                        context$2$0.prev = 3;
                        context$2$0.next = 6;
                        return regeneratorRuntime.awrap(db.collection('pendingEntries').find({}).sort({ _id: 1 }).limit(count).toArray());

                    case 6:
                        return context$2$0.abrupt('return', context$2$0.sent);

                    case 7:
                        context$2$0.prev = 7;

                        _get(Object.getPrototypeOf(PendingBookEntryDAO.prototype), 'dispose', this).call(this, db);
                        return context$2$0.finish(7);

                    case 10:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this, [[3,, 7, 10]]);
        }
    }, {
        key: 'add',
        value: function add(item) {
            var db;
            return regeneratorRuntime.async(function add$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        context$2$0.next = 2;
                        return regeneratorRuntime.awrap(_get(Object.getPrototypeOf(PendingBookEntryDAO.prototype), 'open', this).call(this));

                    case 2:
                        db = context$2$0.sent;
                        context$2$0.prev = 3;
                        context$2$0.next = 6;
                        return regeneratorRuntime.awrap(db.collection('pendingEntries').insert(item));

                    case 6:
                        context$2$0.prev = 6;

                        _get(Object.getPrototypeOf(PendingBookEntryDAO.prototype), 'dispose', this).call(this, db);
                        return context$2$0.finish(6);

                    case 9:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this, [[3,, 6, 9]]);
        }
    }, {
        key: 'remove',
        value: function remove(_id) {
            var db;
            return regeneratorRuntime.async(function remove$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        context$2$0.next = 2;
                        return regeneratorRuntime.awrap(_get(Object.getPrototypeOf(PendingBookEntryDAO.prototype), 'open', this).call(this));

                    case 2:
                        db = context$2$0.sent;
                        context$2$0.prev = 3;
                        context$2$0.next = 6;
                        return regeneratorRuntime.awrap(db.collection('pendingEntries').remove({ _id: ObjectId(_id) }));

                    case 6:
                        context$2$0.prev = 6;

                        _get(Object.getPrototypeOf(PendingBookEntryDAO.prototype), 'dispose', this).call(this, db);
                        return context$2$0.finish(6);

                    case 9:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this, [[3,, 6, 9]]);
        }
    }, {
        key: 'getPendingForUser',
        value: function getPendingForUser(userId) {
            var db;
            return regeneratorRuntime.async(function getPendingForUser$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        context$2$0.next = 2;
                        return regeneratorRuntime.awrap(_get(Object.getPrototypeOf(PendingBookEntryDAO.prototype), 'open', this).call(this));

                    case 2:
                        db = context$2$0.sent;
                        context$2$0.prev = 3;
                        context$2$0.next = 6;
                        return regeneratorRuntime.awrap(db.collection('pendingEntries').find({ userId: userId }).count());

                    case 6:
                        return context$2$0.abrupt('return', context$2$0.sent);

                    case 7:
                        context$2$0.prev = 7;

                        _get(Object.getPrototypeOf(PendingBookEntryDAO.prototype), 'dispose', this).call(this, db);
                        return context$2$0.finish(7);

                    case 10:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this, [[3,, 7, 10]]);
        }
    }]);

    return PendingBookEntryDAO;
})(DAO);

exports['default'] = PendingBookEntryDAO;
module.exports = exports['default'];