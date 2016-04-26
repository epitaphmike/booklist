'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _bookEntryItem = require('./bookEntryItem');

var _bookEntryItem2 = _interopRequireDefault(_bookEntryItem);

var _actionsActionCreators = require('../actions/actionCreators');

var bookEntryActionCreators = _interopRequireWildcard(_actionsActionCreators);

var _rootComponentsMainNavigation = require('root-components/mainNavigation');

var _rootComponentsMainNavigation2 = _interopRequireDefault(_rootComponentsMainNavigation);

var _ReactMotion = ReactMotion;
var TransitionMotion = _ReactMotion.TransitionMotion;
var spring = _ReactMotion.spring;

var Collapse = ReactBootstrap.Collapse;

var BookEntryList = (function (_React$Component) {
    _inherits(BookEntryList, _React$Component);

    function BookEntryList() {
        _classCallCheck(this, BookEntryList);

        _get(Object.getPrototypeOf(BookEntryList.prototype), 'constructor', this).call(this);
        this.state = { showIncomingQueue: false };
    }

    _createClass(BookEntryList, [{
        key: 'toggleIncomingQueue',
        value: function toggleIncomingQueue() {
            this.setState({ showIncomingQueue: !this.state.showIncomingQueue });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this = this;

            var pending = this.props.pendingNumber,
                toggleClass = this.state.showIncomingQueue ? 'fa-angle-double-up' : 'fa-angle-double-down',
                toggleShow = this.props.booksJustSaved.length ? React.createElement(
                'a',
                { onClick: function () {
                        return _this.toggleIncomingQueue();
                    } },
                React.createElement('i', { style: { color: 'white' }, className: 'fa fa-white ' + toggleClass })
            ) : null;

            return React.createElement(
                'div',
                null,
                React.createElement(_rootComponentsMainNavigation2['default'], { isBookEntry: true }),
                React.createElement(
                    'div',
                    { className: 'panel panel-default', style: { 'margin': '15px', padding: '15px' } },
                    React.createElement(
                        'div',
                        { className: 'row' },
                        React.createElement(
                            'div',
                            { style: { marginBottom: 30 }, className: 'col-md-6 col-md-push-6' },
                            React.createElement(
                                'div',
                                null,
                                pending == null ? null : pending ? React.createElement(
                                    'span',
                                    { className: 'label label-info' },
                                    pending + ' Book' + (pending === 1 ? '' : 's') + ' currently outstanding',
                                    ' ',
                                    toggleShow
                                ) : React.createElement(
                                    'span',
                                    { className: 'label label-success' },
                                    'All pending books saved ',
                                    toggleShow
                                )
                            ),
                            React.createElement(
                                Collapse,
                                { 'in': this.state.showIncomingQueue },
                                React.createElement(
                                    'div',
                                    null,
                                    React.createElement(
                                        'div',
                                        { className: 'alert alert-info margin-top alert-slim' },
                                        'Your entered and failed books will show up here, fleetingly, though everything is being logged.',
                                        React.createElement('br', null),
                                        React.createElement('br', null),
                                        'Eventually there\'ll be a dedicated module to let you see what\'s been saved and what failed to be found, and of course saved books will show up in your books list.'
                                    ),
                                    React.createElement(
                                        TransitionMotion,
                                        {
                                            willEnter: function () {
                                                return { opacity: 0.1 };
                                            },
                                            styles: this.props.booksJustSaved.map(function (book) {
                                                return {
                                                    style: { opacity: spring(1) },
                                                    data: book,
                                                    key: book._id
                                                };
                                            }) },
                                        function (styles) {
                                            return React.createElement(
                                                'ul',
                                                null,
                                                styles.map(function (_ref) {
                                                    var style = _ref.style;
                                                    var book = _ref.data;
                                                    var key = _ref.key;
                                                    return React.createElement(
                                                        'li',
                                                        { key: key, style: _extends({}, style) },
                                                        book.title
                                                    );
                                                })
                                            );
                                        }
                                    )
                                )
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'col-md-6 col-md-pull-6' },
                            this.props.entryList.map(function (entry, i) {
                                return React.createElement(
                                    'div',
                                    { key: i },
                                    React.createElement(_bookEntryItem2['default'], _extends({
                                        ref: 'Book' + i
                                    }, entry, {
                                        isbnChange: function (e) {
                                            return _this.isbnChanged(entry, e);
                                        },
                                        entryFinished: function () {
                                            return _this.entryFinished(entry);
                                        },
                                        index: i,
                                        deleteBook: function () {
                                            return _this.deleteBook(entry);
                                        }
                                    })),
                                    React.createElement('br', null)
                                );
                            }),
                            React.createElement(
                                'button',
                                { onClick: function () {
                                        return _this.saveAll();
                                    } },
                                'Retrieve and save all'
                            ),
                            React.createElement('br', null),
                            React.createElement('br', null),
                            React.createElement(
                                'button',
                                { onClick: this.props.resetList },
                                'Reset list'
                            )
                        )
                    )
                )
            );
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            this.ws = new WebSocket(webSocketAddress('/bookEntryWS'));

            this.ws.onmessage = function (_ref2) {
                var data = _ref2.data;

                var packet = JSON.parse(data);
                if (packet._messageType == 'initial') {
                    _this2.props.setPending(packet.pending);
                } else if (packet._messageType == 'bookAdded') {
                    _this2.props.bookSaved(packet);
                } else if (packet._messageType == 'pendingBookAdded') {
                    _this2.props.incrementPending();
                } else if (packet._messageType == 'bookLookupFailed') {
                    _this2.props.bookLookupFailed(packet.isbn);
                }
            };

            this.refs.Book0.focusInput();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            try {
                this.ws.close();
            } catch (e) {}
        }
    }, {
        key: 'saveAll',
        value: function saveAll() {
            this.props.saveAllPending();
        }
    }, {
        key: 'isbnChanged',
        value: function isbnChanged(entry, e) {
            this.props.updateIsbn(e.target.value, this.props.entryList.indexOf(entry));
        }
    }, {
        key: 'entryFinished',
        value: function entryFinished(entry) {
            var index = this.props.entryList.indexOf(entry);
            if (index < this.props.entryList.length - 1) {
                this.refs['Book' + (index + 1)].focusInput();
            }

            if (entry.isbn.length == 10 || entry.isbn.length == 13) {
                this.props.enterBook(index, entry.isbn);
            }
        }
    }]);

    return BookEntryList;
})(React.Component);

var BookEntryListConnected = ReactRedux.connect(function (state) {
    return state;
}, _extends({}, bookEntryActionCreators))(BookEntryList);

exports['default'] = BookEntryListConnected;
module.exports = exports['default'];