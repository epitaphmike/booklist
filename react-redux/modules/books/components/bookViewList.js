'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _bookViewListDesktop = require('./bookViewList-desktop');

var _bookViewListDesktop2 = _interopRequireDefault(_bookViewListDesktop);

var _rootComponentsMainNavigation = require('root-components/mainNavigation');

var _rootComponentsMainNavigation2 = _interopRequireDefault(_rootComponentsMainNavigation);

var _actionsActionCreators = require('../actions/actionCreators');

var actionCreators = _interopRequireWildcard(_actionsActionCreators);

var _require = require('../actions/actionCreators');

var loadBooks = _require.loadBooks;
var loadSubjects = _require.loadSubjects;
var editSubjectsForBook = _require.editSubjectsForBook;
var addSubjectToBook = _require.addSubjectToBook;
var loadBooksAndSubjects = _require.loadBooksAndSubjects;

var _require2 = require('react-redux-util/responsiveUiLoaders');

var responsiveMobileDesktopMixin = _require2.responsiveMobileDesktopMixin;

var _require3 = require('../reducers/reducer');

var selector = _require3.selector;

function BookListLoading() {
    return React.createElement(
        'div',
        { style: { height: '150' } },
        'Loading ',
        React.createElement('i', { className: 'fa fa-spinner fa-spin' })
    );
}

function BookListNoResults() {
    return React.createElement(
        'div',
        { style: { height: '150' } },
        'No results'
    );
}

var BookViewingList = (function (_React$Component) {
    _inherits(BookViewingList, _React$Component);

    function BookViewingList() {
        _classCallCheck(this, BookViewingList);

        _get(Object.getPrototypeOf(BookViewingList.prototype), 'constructor', this).call(this);

        responsiveMobileDesktopMixin(this, 'listComponent', {
            mobile: { path: './modules/books/components/bookViewList-mobile', connectWith: selector },
            desktop: { path: './modules/books/components/bookViewList-desktop', connectWith: selector, mapDispatchWith: actionCreators }
        });
    }

    _createClass(BookViewingList, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.props.dispatch(loadSubjects());
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(newProps) {
            if (newProps.bookSearch.isDirty) {
                this.props.dispatch(loadBooks());
            }
        }
    }, {
        key: 'addSubject',
        value: function addSubject(subject) {
            this.props.dispatch(addSubjectToBook(subject));
        }
    }, {
        key: 'render',
        value: function render() {
            var _this = this;

            return React.createElement(
                'div',
                null,
                React.createElement(_rootComponentsMainNavigation2['default'], { isBookList: true }),
                React.createElement(
                    'div',
                    { className: 'panel panel-default', style: { margin: '10' } },
                    React.createElement(
                        'div',
                        { className: 'panel-body', style: { padding: 0 } },
                        !this.state.listComponent ? React.createElement(BookListLoading, null) : React.createElement(this.state.listComponent, { addSubject: function addSubject(s) {
                                return _this.addSubject(s);
                            } })
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'well well-sm' },
                    React.createElement('img', { width: '16', height: '16', src: '/static/main-icon.png' }),
                    React.createElement(
                        'span',
                        null,
                        'Track my books'
                    ),
                    this.state.isMobile ? React.createElement(
                        'a',
                        { onClick: function () {
                                return _this.switchToDesktop();
                            }, className: 'pull-right' },
                        'Desktop site'
                    ) : null
                )
            );
        }
    }]);

    return BookViewingList;
})(React.Component);

module.exports = BookViewingList;