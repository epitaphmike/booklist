'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ObjectId = require('mongodb').ObjectID;
var DAO = require('./dao');

var BookDAO = (function (_DAO) {
    _inherits(BookDAO, _DAO);

    function BookDAO(userId) {
        _classCallCheck(this, BookDAO);

        _get(Object.getPrototypeOf(BookDAO.prototype), 'constructor', this).call(this);
        this.userId = userId;
    }

    _createClass(BookDAO, [{
        key: 'searchBooks',
        value: function searchBooks(search, subjects, searchChildSubjects) {
            var db, query, _subjects, allPaths, childIds;

            return regeneratorRuntime.async(function searchBooks$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        subjects = subjects || [];
                        context$2$0.next = 3;
                        return regeneratorRuntime.awrap(_get(Object.getPrototypeOf(BookDAO.prototype), 'open', this).call(this));

                    case 3:
                        db = context$2$0.sent;
                        context$2$0.prev = 4;
                        query = { userId: this.userId };

                        if (search) {
                            query.title = new RegExp(search, 'gi');
                        }

                        if (!subjects.length) {
                            context$2$0.next = 16;
                            break;
                        }

                        if (!searchChildSubjects) {
                            context$2$0.next = 15;
                            break;
                        }

                        allPaths = subjects.map(function (s) {
                            return ',' + s + ',';
                        }).join('|');
                        context$2$0.next = 12;
                        return regeneratorRuntime.awrap(db.collection('subjects').find({ path: { $regex: allPaths }, userId: this.userId }, { _id: 1 }).toArray());

                    case 12:
                        context$2$0.t0 = function (o) {
                            return '' + o._id;
                        };

                        childIds = context$2$0.sent.map(context$2$0.t0);

                        (_subjects = subjects).push.apply(_subjects, _toConsumableArray(childIds));

                    case 15:

                        query.subjects = { $in: subjects };

                    case 16:
                        context$2$0.next = 18;
                        return regeneratorRuntime.awrap(db.collection('books').find(query).toArray());

                    case 18:
                        return context$2$0.abrupt('return', context$2$0.sent);

                    case 19:
                        context$2$0.prev = 19;

                        _get(Object.getPrototypeOf(BookDAO.prototype), 'dispose', this).call(this, db);
                        return context$2$0.finish(19);

                    case 22:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this, [[4,, 19, 22]]);
        }
    }, {
        key: 'saveBook',
        value: function saveBook(book) {
            var db, result;
            return regeneratorRuntime.async(function saveBook$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        context$2$0.next = 2;
                        return regeneratorRuntime.awrap(_get(Object.getPrototypeOf(BookDAO.prototype), 'open', this).call(this));

                    case 2:
                        db = context$2$0.sent;
                        context$2$0.prev = 3;

                        book.userId = this.userId;
                        context$2$0.next = 7;
                        return regeneratorRuntime.awrap(db.collection('books').insert(book));

                    case 7:
                        result = context$2$0.sent;

                        _get(Object.getPrototypeOf(BookDAO.prototype), 'confirmSingleResult', this).call(this, result);

                    case 9:
                        context$2$0.prev = 9;

                        _get(Object.getPrototypeOf(BookDAO.prototype), 'dispose', this).call(this, db);
                        return context$2$0.finish(9);

                    case 12:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this, [[3,, 9, 12]]);
        }
    }, {
        key: 'deleteBook',
        value: function deleteBook(id) {
            var db;
            return regeneratorRuntime.async(function deleteBook$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        context$2$0.next = 2;
                        return regeneratorRuntime.awrap(_get(Object.getPrototypeOf(BookDAO.prototype), 'open', this).call(this));

                    case 2:
                        db = context$2$0.sent;
                        context$2$0.prev = 3;
                        context$2$0.next = 6;
                        return regeneratorRuntime.awrap(db.collection('books').remove({ _id: ObjectId(id) }));

                    case 6:
                        context$2$0.prev = 6;

                        _get(Object.getPrototypeOf(BookDAO.prototype), 'dispose', this).call(this, db);
                        return context$2$0.finish(6);

                    case 9:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this, [[3,, 6, 9]]);
        }
    }, {
        key: 'setBooksSubjects',
        value: function setBooksSubjects(books, add, remove) {
            var db;
            return regeneratorRuntime.async(function setBooksSubjects$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        context$2$0.next = 2;
                        return regeneratorRuntime.awrap(_get(Object.getPrototypeOf(BookDAO.prototype), 'open', this).call(this));

                    case 2:
                        db = context$2$0.sent;
                        context$2$0.prev = 3;
                        context$2$0.next = 6;
                        return regeneratorRuntime.awrap(db.collection('books').update({ _id: { $in: books.map(function (_id) {
                                    return ObjectId(_id);
                                }) } }, { $addToSet: { subjects: { $each: add || [] } } }, { upsert: false, multi: true }));

                    case 6:
                        context$2$0.next = 8;
                        return regeneratorRuntime.awrap(db.collection('books').update({ _id: { $in: books.map(function (_id) {
                                    return ObjectId(_id);
                                }) } }, { $pullAll: { subjects: remove || [] } }, { upsert: false, multi: true }));

                    case 8:
                        context$2$0.prev = 8;

                        _get(Object.getPrototypeOf(BookDAO.prototype), 'dispose', this).call(this, db);
                        return context$2$0.finish(8);

                    case 11:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this, [[3,, 8, 11]]);
        }
    }]);

    return BookDAO;
})(DAO);

exports['default'] = BookDAO;
module.exports = exports['default'];

//may implement $or another way
//if (query.title && query.subjects){
//    query.$or = [
//        { subjects: query.subjects },
//        { title: query.title }
//    ];
//    delete query.subjects;
//    delete query.title;
//}