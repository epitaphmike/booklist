'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DAO = require('./dao');
var ObjectId = require('mongodb').ObjectID;

var SubjectDAO = (function (_DAO) {
    _inherits(SubjectDAO, _DAO);

    function SubjectDAO(userId) {
        _classCallCheck(this, SubjectDAO);

        _get(Object.getPrototypeOf(SubjectDAO.prototype), 'constructor', this).call(this);
        this.userId = userId;
    }

    _createClass(SubjectDAO, [{
        key: 'deleteSubject',
        value: function deleteSubject(_id) {
            var db, subjectToDelete, booksToUpdate;
            return regeneratorRuntime.async(function deleteSubject$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        context$2$0.next = 2;
                        return regeneratorRuntime.awrap(_get(Object.getPrototypeOf(SubjectDAO.prototype), 'open', this).call(this));

                    case 2:
                        db = context$2$0.sent;
                        context$2$0.next = 5;
                        return regeneratorRuntime.awrap(db.collection('subjects').findOne({ _id: ObjectId(_id), userId: this.userId }));

                    case 5:
                        subjectToDelete = context$2$0.sent;

                        if (subjectToDelete) {
                            context$2$0.next = 8;
                            break;
                        }

                        return context$2$0.abrupt('return');

                    case 8:
                        context$2$0.next = 10;
                        return regeneratorRuntime.awrap(db.collection('books').find({ subjects: _id, userId: this.userId }, { _id: 1 }).toArray());

                    case 10:
                        context$2$0.t0 = function (o) {
                            return o._id;
                        };

                        booksToUpdate = context$2$0.sent.map(context$2$0.t0);
                        context$2$0.next = 14;
                        return regeneratorRuntime.awrap(db.collection('books').update({ _id: { $in: booksToUpdate } }, { $pull: { subjects: _id } }, { upsert: false, multi: true }));

                    case 14:
                        context$2$0.next = 16;
                        return regeneratorRuntime.awrap(db.collection('subjects').remove({ _id: ObjectId(_id) }));

                    case 16:
                        return context$2$0.abrupt('return', { booksUpdated: booksToUpdate.map(String) });

                    case 17:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this);
        }
    }, {
        key: 'updateSubjectInfo',
        value: function updateSubjectInfo(_id, newName, newParent) {
            var db, newPath, _existingParent, newSubject, existing, existingParent, pieces, affectedSubjects;

            return regeneratorRuntime.async(function updateSubjectInfo$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        context$2$0.next = 2;
                        return regeneratorRuntime.awrap(_get(Object.getPrototypeOf(SubjectDAO.prototype), 'open', this).call(this));

                    case 2:
                        db = context$2$0.sent;
                        context$2$0.prev = 3;

                        if (_id) {
                            context$2$0.next = 15;
                            break;
                        }

                        newPath = null;

                        if (!newParent) {
                            context$2$0.next = 11;
                            break;
                        }

                        context$2$0.next = 9;
                        return regeneratorRuntime.awrap(db.collection('subjects').findOne({ _id: ObjectId(newParent) }));

                    case 9:
                        _existingParent = context$2$0.sent;

                        newPath = (_existingParent.path || ',') + ('' + _existingParent._id) + ',';

                    case 11:
                        newSubject = { name: newName, path: newPath, userId: this.userId };
                        context$2$0.next = 14;
                        return regeneratorRuntime.awrap(db.collection('subjects').insert(newSubject));

                    case 14:
                        return context$2$0.abrupt('return', { affectedSubjects: [newSubject] });

                    case 15:
                        context$2$0.next = 17;
                        return regeneratorRuntime.awrap(db.collection('subjects').findOne({ _id: ObjectId(_id) }));

                    case 17:
                        existing = context$2$0.sent;
                        context$2$0.next = 20;
                        return regeneratorRuntime.awrap(db.collection('subjects').update({ _id: ObjectId(_id) }, { $set: { name: newName } }));

                    case 20:
                        existingParent = undefined;

                        if (existing.path == null) {
                            existingParent = null;
                        } else {
                            pieces = existing.path.split(',');

                            existingParent = pieces[pieces.length - 2];
                        }

                        if (!(existingParent != newParent)) {
                            context$2$0.next = 26;
                            break;
                        }

                        context$2$0.next = 25;
                        return regeneratorRuntime.awrap(this.updateSubjectParent(_id, newParent));

                    case 25:
                        affectedSubjects = context$2$0.sent;

                    case 26:
                        return context$2$0.abrupt('return', { affectedSubjects: affectedSubjects || [Object.assign(existing, { name: newName })] });

                    case 27:
                        context$2$0.prev = 27;

                        _get(Object.getPrototypeOf(SubjectDAO.prototype), 'dispose', this).call(this, db);
                        return context$2$0.finish(27);

                    case 30:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this, [[3,, 27, 30]]);
        }
    }, {
        key: 'updateSubjectParent',
        value: function updateSubjectParent(_id, newParent) {
            var db, _ret;

            return regeneratorRuntime.async(function updateSubjectParent$(context$2$0) {
                var _this = this;

                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        context$2$0.next = 2;
                        return regeneratorRuntime.awrap(_get(Object.getPrototypeOf(SubjectDAO.prototype), 'open', this).call(this));

                    case 2:
                        db = context$2$0.sent;
                        context$2$0.prev = 3;
                        context$2$0.next = 6;
                        return regeneratorRuntime.awrap((function callee$2$0() {
                            var existingSubject, existingSubjectAndParent, newParentObj, newParentPath, newDescendantPathPiece, descendantsToUpdate;
                            return regeneratorRuntime.async(function callee$2$0$(context$3$0) {
                                while (1) switch (context$3$0.prev = context$3$0.next) {
                                    case 0:
                                        if (!(newParent == null)) {
                                            context$3$0.next = 8;
                                            break;
                                        }

                                        context$3$0.next = 3;
                                        return regeneratorRuntime.awrap(db.collection('subjects').findOne({ _id: ObjectId(_id), userId: this.userId }));

                                    case 3:
                                        existingSubject = context$3$0.sent;

                                        if (!(existingSubject == null)) {
                                            context$3$0.next = 6;
                                            break;
                                        }

                                        return context$3$0.abrupt('return', {
                                            v: undefined
                                        });

                                    case 6:
                                        context$3$0.next = 13;
                                        break;

                                    case 8:
                                        context$3$0.next = 10;
                                        return regeneratorRuntime.awrap(db.collection('subjects').find({ _id: { $in: [ObjectId(_id), ObjectId(newParent)] }, userId: this.userId }).toArray());

                                    case 10:
                                        existingSubjectAndParent = context$3$0.sent;

                                        if (!(existingSubjectAndParent.length !== 2)) {
                                            context$3$0.next = 13;
                                            break;
                                        }

                                        return context$3$0.abrupt('return', {
                                            v: undefined
                                        });

                                    case 13:
                                        context$3$0.next = 15;
                                        return regeneratorRuntime.awrap(newParent ? db.collection('subjects').findOne({ _id: ObjectId(newParent) }) : null);

                                    case 15:
                                        newParentObj = context$3$0.sent;
                                        newParentPath = newParentObj ? (newParentObj.path || ',') + (newParentObj._id + ',') : null;
                                        newDescendantPathPiece = '' + (newParentPath || ',') + _id + ',';
                                        context$3$0.next = 20;
                                        return regeneratorRuntime.awrap(db.collection('subjects').update({ _id: ObjectId(_id) }, { $set: { path: newParentPath } }));

                                    case 20:
                                        context$3$0.next = 22;
                                        return regeneratorRuntime.awrap(db.collection('subjects').find({ path: { $regex: '.*,' + _id + ',' } }).toArray());

                                    case 22:
                                        descendantsToUpdate = context$3$0.sent;
                                        context$3$0.next = 25;
                                        return regeneratorRuntime.awrap(Promise.all(descendantsToUpdate.map(function (s) {
                                            return db.collection('subjects').update({ _id: s._id }, { $set: { path: s.path.replace(new RegExp('.*,' + _id + ','), newDescendantPathPiece) } });
                                        })));

                                    case 25:
                                        context$3$0.next = 27;
                                        return regeneratorRuntime.awrap(db.collection('subjects').find({ $or: [{ path: { $regex: '.*,' + _id + ',' } }, { _id: ObjectId(_id) }] }).toArray());

                                    case 27:
                                        context$3$0.t0 = context$3$0.sent;
                                        return context$3$0.abrupt('return', {
                                            v: context$3$0.t0
                                        });

                                    case 29:
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
                        context$2$0.prev = 9;

                        _get(Object.getPrototypeOf(SubjectDAO.prototype), 'dispose', this).call(this, db);
                        return context$2$0.finish(9);

                    case 12:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this, [[3,, 9, 12]]);
        }
    }, {
        key: 'loadSubjects',
        value: function loadSubjects() {
            var db;
            return regeneratorRuntime.async(function loadSubjects$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        context$2$0.next = 2;
                        return regeneratorRuntime.awrap(_get(Object.getPrototypeOf(SubjectDAO.prototype), 'open', this).call(this));

                    case 2:
                        db = context$2$0.sent;
                        context$2$0.prev = 3;
                        context$2$0.next = 6;
                        return regeneratorRuntime.awrap(db.collection('subjects').find({ userId: this.userId }).toArray());

                    case 6:
                        return context$2$0.abrupt('return', context$2$0.sent);

                    case 7:
                        context$2$0.prev = 7;

                        _get(Object.getPrototypeOf(SubjectDAO.prototype), 'dispose', this).call(this, db);
                        return context$2$0.finish(7);

                    case 10:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this, [[3,, 7, 10]]);
        }
    }]);

    return SubjectDAO;
})(DAO);

module.exports = SubjectDAO;

//security checks - make sure you own the subject, and also the new parent (if applicable)