'use strict';

var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _require = require('easy-express-controllers');

var httpPost = _require.httpPost;
var route = _require.route;
var nonRoutable = _require.nonRoutable;

var SubjectDAO = require('../dataAccess/subjectDAO');

var subjectController = (function () {
    function subjectController() {
        _classCallCheck(this, subjectController);
    }

    _createDecoratedClass(subjectController, [{
        key: 'all',
        value: function all() {
            var subjectDao, subjects;
            return regeneratorRuntime.async(function all$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        subjectDao = new SubjectDAO(this.request.user.id);
                        context$2$0.next = 3;
                        return regeneratorRuntime.awrap(subjectDao.loadSubjects());

                    case 3:
                        subjects = context$2$0.sent;

                        this.send({ results: subjects });

                    case 5:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this);
        }
    }, {
        key: 'setInfo',
        decorators: [httpPost],
        value: function setInfo(_id, newName, newParent) {
            var subjectDao, _ref, affectedSubjects;

            return regeneratorRuntime.async(function setInfo$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        subjectDao = new SubjectDAO(this.request.user.id);
                        context$2$0.next = 3;
                        return regeneratorRuntime.awrap(subjectDao.updateSubjectInfo(_id, newName, newParent || null));

                    case 3:
                        _ref = context$2$0.sent;
                        affectedSubjects = _ref.affectedSubjects;

                        this.send({ affectedSubjects: affectedSubjects });

                    case 6:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this);
        }
    }, {
        key: 'delete',
        decorators: [httpPost],
        value: function _delete(_id) {
            var subjectDao, _ref2, booksUpdated;

            return regeneratorRuntime.async(function _delete$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        subjectDao = new SubjectDAO(this.request.user.id);
                        context$2$0.next = 3;
                        return regeneratorRuntime.awrap(subjectDao.deleteSubject(_id));

                    case 3:
                        _ref2 = context$2$0.sent;
                        booksUpdated = _ref2.booksUpdated;

                        this.send({ success: true, booksUpdated: booksUpdated });

                    case 6:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this);
        }
    }]);

    return subjectController;
})();

module.exports = subjectController;