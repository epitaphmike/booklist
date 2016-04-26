'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _reactStartup = require('react-startup');

var _reactStartup2 = _interopRequireDefault(_reactStartup);

var Navbar = ReactBootstrap.Navbar;
var Nav = ReactBootstrap.Nav;
var NavItem = ReactBootstrap.NavItem;

var MainNavigationBar = (function (_React$Component) {
    _inherits(MainNavigationBar, _React$Component);

    function MainNavigationBar() {
        _classCallCheck(this, MainNavigationBar);

        _get(Object.getPrototypeOf(MainNavigationBar.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(MainNavigationBar, [{
        key: 'logout',
        value: function logout() {
            ajaxUtil.post('/react-redux/logout', {}, function () {
                return _reactStartup2['default'].forceLogin();
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var isBookEntry = this.props.isBookEntry,
                isBookList = this.props.isBookList;

            return React.createElement(
                Navbar,
                { style: { borderRadius: 0, borderRight: 0, borderLeft: 0, borderTop: 0 }, fluid: true },
                React.createElement(
                    Navbar.Header,
                    null,
                    React.createElement(
                        Navbar.Brand,
                        null,
                        React.createElement(
                            'a',
                            { style: { cursor: 'default' } },
                            'Book Tracker'
                        )
                    ),
                    React.createElement(Navbar.Toggle, null)
                ),
                React.createElement(
                    Navbar.Collapse,
                    null,
                    React.createElement(
                        Nav,
                        null,
                        React.createElement(
                            NavItem,
                            { active: isBookEntry, href: isBookEntry ? undefined : '#scan' },
                            'Book entry'
                        ),
                        React.createElement(
                            NavItem,
                            { active: isBookList, href: isBookList ? undefined : '#books' },
                            'Your books'
                        ),
                        React.createElement(
                            NavItem,
                            { onClick: this.logout },
                            'Logout'
                        )
                    )
                )
            );
        }
    }]);

    return MainNavigationBar;
})(React.Component);

exports['default'] = MainNavigationBar;
module.exports = exports['default'];