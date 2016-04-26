'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _booklistMenubarBooksMenuBar = require('./booklist-menubar/booksMenuBar');

var _booklistMenubarBooksMenuBar2 = _interopRequireDefault(_booklistMenubarBooksMenuBar);

var BootstrapButton = require('root-components/bootstrapButton');

var BookViewListMobileItem = (function (_React$Component) {
    _inherits(BookViewListMobileItem, _React$Component);

    function BookViewListMobileItem() {
        _classCallCheck(this, BookViewListMobileItem);

        _get(Object.getPrototypeOf(BookViewListMobileItem.prototype), 'constructor', this).call(this);
        this.state = { expanded: false };
    }

    _createClass(BookViewListMobileItem, [{
        key: 'toggle',
        value: function toggle() {
            this.setState({ expanded: !this.state.expanded });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this = this;

            return React.createElement(
                'a',
                { onClick: function () {
                        return _this.toggle();
                    }, className: 'list-group-item', style: { cursor: 'pointer' } },
                React.createElement(
                    'div',
                    { className: 'row' },
                    React.createElement(
                        'div',
                        { className: 'col-xs-3 col-sm-1' },
                        this.state.expanded || this.props.showImg ? React.createElement('img', { src: this.props.smallImage }) : null
                    ),
                    React.createElement(
                        'div',
                        { className: 'col-xs-9 col-sm-11' },
                        React.createElement(
                            'h4',
                            { className: 'list-group-item-heading' },
                            this.props.title
                        ),
                        React.createElement(
                            'p',
                            { className: 'list-group-item-text' },
                            this.props.author || 'no author'
                        ),
                        !this.state.expanded ? null : React.createElement(
                            'div',
                            null,
                            this.props.publicationDate ? React.createElement(
                                'p',
                                { className: 'list-group-item-text' },
                                'Published ' + this.props.publicationDate
                            ) : null,
                            this.props.pages ? React.createElement(
                                'p',
                                { className: 'list-group-item-text' },
                                this.props.pages + ' pages'
                            ) : null,
                            this.props.isbn ? React.createElement(
                                'p',
                                { className: 'list-group-item-text' },
                                'ISBN ' + this.props.isbn
                            ) : null
                        )
                    )
                )
            );
        }
    }]);

    return BookViewListMobileItem;
})(React.Component);

var BookViewListMobile = (function (_React$Component2) {
    _inherits(BookViewListMobile, _React$Component2);

    function BookViewListMobile() {
        _classCallCheck(this, BookViewListMobile);

        _get(Object.getPrototypeOf(BookViewListMobile.prototype), 'constructor', this).call(this);
        this.state = { showImages: false };
    }

    _createClass(BookViewListMobile, [{
        key: 'toggleImages',
        value: function toggleImages() {
            this.setState({ showImages: !this.state.showImages });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return React.createElement(
                'div',
                null,
                React.createElement(_booklistMenubarBooksMenuBar2['default'], {
                    selectedBooksCount: this.props.books.selectedBooksCount,
                    allSubjects: this.props.subjects.list
                }),
                React.createElement(
                    'div',
                    { style: { paddingBottom: 15 } },
                    React.createElement(
                        BootstrapButton,
                        { style: { margin: 5 }, onClick: function () {
                                return _this2.toggleImages();
                            }, preset: 'info-xs' },
                        this.state.showImages ? 'Hide covers' : 'Show covers'
                    ),
                    React.createElement(
                        'div',
                        { style: { border: 0 }, className: 'list-group docked-to-panel' },
                        this.props.books.list.map(function (book, i) {
                            return React.createElement(BookViewListMobileItem, _extends({ showImg: _this2.state.showImages, key: book._id }, book));
                        })
                    )
                )
            );
        }
    }]);

    return BookViewListMobile;
})(React.Component);

module.exports = BookViewListMobile;