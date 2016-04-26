'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _dataAccessPendingBookEntryDAO = require('../dataAccess/pendingBookEntryDAO');

var _dataAccessPendingBookEntryDAO2 = _interopRequireDefault(_dataAccessPendingBookEntryDAO);

var _dataAccessCompletedEntriesDAO = require('../dataAccess/completedEntriesDAO');

var _dataAccessCompletedEntriesDAO2 = _interopRequireDefault(_dataAccessCompletedEntriesDAO);

var _amazonDataAccessAmazonSearchJs = require('../amazonDataAccess/AmazonSearch.js');

var _amazonDataAccessAmazonSearchJs2 = _interopRequireDefault(_amazonDataAccessAmazonSearchJs);

var _amazonDataAccessAmazonOperationQueue = require('../amazonDataAccess/amazonOperationQueue');

var _amazonDataAccessAmazonOperationQueue2 = _interopRequireDefault(_amazonDataAccessAmazonOperationQueue);

var _dataAccessBookDAO = require('../dataAccess/bookDAO');

var _dataAccessBookDAO2 = _interopRequireDefault(_dataAccessBookDAO);

var BookEntryQueueManager = (function () {
    function BookEntryQueueManager() {
        _classCallCheck(this, BookEntryQueueManager);

        this.pendingBooksDao = new _dataAccessPendingBookEntryDAO2['default']();
        this.completedEntriesDao = new _dataAccessCompletedEntriesDAO2['default']();
        this.localQueue = [];
        this.wsSubscriptions = new Map();
        this.amazonSearch = new _amazonDataAccessAmazonSearchJs2['default']();
    }

    _createClass(BookEntryQueueManager, [{
        key: 'initialize',
        value: function initialize() {
            return regeneratorRuntime.async(function initialize$(context$2$0) {
                var _this = this;

                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        this.running = true;
                        context$2$0.next = 3;
                        return regeneratorRuntime.awrap(this.pendingBooksDao.getLatest(10));

                    case 3:
                        this.localQueue = context$2$0.sent;

                        if (!this.localQueue.length) {
                            context$2$0.next = 9;
                            break;
                        }

                        context$2$0.next = 7;
                        return regeneratorRuntime.awrap(this.runQueue());

                    case 7:
                        context$2$0.next = 11;
                        break;

                    case 9:
                        this.running = false;
                        setTimeout(function () {
                            return _this.initialize();
                        }, 5000);

                    case 11:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this);
        }
    }, {
        key: 'runQueue',
        value: function runQueue() {
            var allItems;
            return regeneratorRuntime.async(function runQueue$(context$2$0) {
                var _this2 = this;

                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        allItems = this.localQueue.map(function (item) {
                            return _this2.pendingItemToPromise(item);
                        });

                        allItems.forEach(function (op) {
                            return _amazonDataAccessAmazonOperationQueue2['default'].push(op);
                        });
                        context$2$0.next = 4;
                        return regeneratorRuntime.awrap(Promise.all(allItems).then(function () {
                            return _this2.initialize();
                        }));

                    case 4:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this);
        }
    }, {
        key: 'pendingItemToPromise',
        value: function pendingItemToPromise(item) {
            var _this3 = this;

            return Promise.delayed(function (resolve) {
                _this3.amazonSearch.lookupBook(item.isbn).then(function callee$3$0(bookFromAmazon) {
                    var bookDao, newBook;
                    return regeneratorRuntime.async(function callee$3$0$(context$4$0) {
                        while (1) switch (context$4$0.prev = context$4$0.next) {
                            case 0:
                                bookDao = new _dataAccessBookDAO2['default'](item.userId);

                                if (!bookFromAmazon.failure) {
                                    context$4$0.next = 9;
                                    break;
                                }

                                context$4$0.next = 4;
                                return regeneratorRuntime.awrap(this.pendingBooksDao.remove(item._id));

                            case 4:
                                this.bookLookupFailed(item.userId, item.isbn);
                                context$4$0.next = 7;
                                return regeneratorRuntime.awrap(this.completedEntriesDao.logFailedEntry(item.userId, item.isbn));

                            case 7:
                                context$4$0.next = 17;
                                break;

                            case 9:
                                newBook = Object.assign(bookFromAmazon, { subjects: [] });
                                context$4$0.next = 12;
                                return regeneratorRuntime.awrap(bookDao.saveBook(newBook));

                            case 12:
                                context$4$0.next = 14;
                                return regeneratorRuntime.awrap(this.pendingBooksDao.remove(item._id));

                            case 14:
                                this.bookAdded(item.userId, newBook);
                                context$4$0.next = 17;
                                return regeneratorRuntime.awrap(this.completedEntriesDao.logCompletedEntry(item.userId, item.isbn, bookFromAmazon));

                            case 17:
                                resolve();

                            case 18:
                            case 'end':
                                return context$4$0.stop();
                        }
                    }, null, _this3);
                });
            });
        }
    }, {
        key: 'bookAdded',
        value: function bookAdded(userId, bookFromAmazon) {
            this.runWsAction(userId, function (ws) {
                return ws.send(JSON.stringify(Object.assign({ _messageType: 'bookAdded' }, bookFromAmazon, { saveMessage: 'saved' })));
            });
        }
    }, {
        key: 'bookLookupFailed',
        value: function bookLookupFailed(userId, isbn) {
            this.runWsAction(userId, function (ws) {
                return ws.send(JSON.stringify({ _messageType: 'bookLookupFailed', isbn: isbn }));
            });
        }
    }, {
        key: 'subscriberAdded',
        value: function subscriberAdded(userId, ws) {
            var pending;
            return regeneratorRuntime.async(function subscriberAdded$(context$2$0) {
                var _this4 = this;

                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        context$2$0.next = 2;
                        return regeneratorRuntime.awrap(this.pendingBooksDao.getPendingForUser(userId));

                    case 2:
                        pending = context$2$0.sent;

                        ws.send(JSON.stringify({ _messageType: 'initial', pending: pending }));
                        this.wsSubscriptions.set(userId, ws);

                        ws.on('close', function () {
                            return _this4.wsClosed(userId);
                        });

                    case 6:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this);
        }
    }, {
        key: 'addPendingBook',
        value: function addPendingBook(userId, pendingBook) {
            return regeneratorRuntime.async(function addPendingBook$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        context$2$0.next = 2;
                        return regeneratorRuntime.awrap(this.pendingBooksDao.add(pendingBook));

                    case 2:
                        this.wsMessagePendingBookAdded(userId);

                    case 3:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this);
        }
    }, {
        key: 'wsMessagePendingBookAdded',
        value: function wsMessagePendingBookAdded(userId) {
            this.runWsAction(userId, function (ws) {
                return ws.send(JSON.stringify(Object.assign({ _messageType: 'pendingBookAdded' })));
            });
        }
    }, {
        key: 'runWsAction',
        value: function runWsAction(userId, action) {
            var ws = this.wsSubscriptions.get(userId);
            if (ws) {
                if (ws.readyState === 1) {
                    action(ws);
                } else {
                    this.wsClosed(userId);
                }
            }
        }
    }, {
        key: 'wsClosed',
        value: function wsClosed(userId) {
            this.wsSubscriptions['delete'](userId);
        }
    }]);

    return BookEntryQueueManager;
})();

var instance = new BookEntryQueueManager();

exports['default'] = instance;
module.exports = exports['default'];