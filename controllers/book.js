'use strict';

var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _amazonDataAccessAmazonOperationQueue = require('../amazonDataAccess/amazonOperationQueue');

var _amazonDataAccessAmazonOperationQueue2 = _interopRequireDefault(_amazonDataAccessAmazonOperationQueue);

var _dataAccessBookDAO = require('../dataAccess/bookDAO');

var _dataAccessBookDAO2 = _interopRequireDefault(_dataAccessBookDAO);

var _dataAccessPendingBookEntryDAO = require('../dataAccess/pendingBookEntryDAO');

var _dataAccessPendingBookEntryDAO2 = _interopRequireDefault(_dataAccessPendingBookEntryDAO);

var _appBookEntryQueueManager = require('../app/bookEntryQueueManager');

var _appBookEntryQueueManager2 = _interopRequireDefault(_appBookEntryQueueManager);

var _require = require('easy-express-controllers');

var httpPost = _require.httpPost;
var route = _require.route;
var nonRoutable = _require.nonRoutable;

var AmazonSearch = require('../amazonDataAccess/AmazonSearch.js');

var bookController = (function () {
    function bookController() {
        _classCallCheck(this, bookController);
    }

    _createDecoratedClass(bookController, [{
        key: 'saveFromIsbn',
        decorators: [httpPost],
        value: function saveFromIsbn(isbn) {
            var userId, addingItem;
            return regeneratorRuntime.async(function saveFromIsbn$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        userId = this.request.user.id;
                        context$2$0.prev = 1;
                        addingItem = { userId: userId, isbn: isbn };
                        context$2$0.next = 5;
                        return regeneratorRuntime.awrap(_appBookEntryQueueManager2['default'].addPendingBook(userId, addingItem));

                    case 5:

                        this.send({ success: true });
                        context$2$0.next = 11;
                        break;

                    case 8:
                        context$2$0.prev = 8;
                        context$2$0.t0 = context$2$0['catch'](1);

                        this.send({ failure: true });

                    case 11:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this, [[1, 8]]);
        }
    }, {
        key: 'deleteBook',
        decorators: [httpPost],
        value: function deleteBook(id) {
            var bookDao;
            return regeneratorRuntime.async(function deleteBook$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        bookDao = new _dataAccessBookDAO2['default']();
                        context$2$0.next = 3;
                        return regeneratorRuntime.awrap(bookDao.deleteBook(id));

                    case 3:
                        this.send({ success: true });

                    case 4:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this);
        }
    }, {
        key: 'searchBooks',
        value: function searchBooks(search, subjects, searchChildSubjects) {
            var bookDao, bookResults;
            return regeneratorRuntime.async(function searchBooks$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        bookDao = new _dataAccessBookDAO2['default'](this.request.user.id);
                        context$2$0.next = 3;
                        return regeneratorRuntime.awrap(bookDao.searchBooks(search, subjects, searchChildSubjects));

                    case 3:
                        bookResults = context$2$0.sent;

                        this.send({ results: bookResults });

                    case 5:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this);
        }
    }]);

    return bookController;
})();

module.exports = bookController;