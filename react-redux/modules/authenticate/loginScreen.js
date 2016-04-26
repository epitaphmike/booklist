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

var _rootComponentsAjaxButton = require('root-components/ajaxButton');

var _rootComponentsAjaxButton2 = _interopRequireDefault(_rootComponentsAjaxButton);

var Navbar = ReactBootstrap.Navbar;
var Nav = ReactBootstrap.Nav;
var NavItem = ReactBootstrap.NavItem;

var errorCodes = {
    s1: 'This user already exists',
    c1: 'Passwords do not match',
    c2: 'No login found for this Email / Password',
    c3: 'Password is required'
};

var Login = (function (_React$Component) {
    _inherits(Login, _React$Component);

    function Login() {
        _classCallCheck(this, Login);

        _get(Object.getPrototypeOf(Login.prototype), 'constructor', this).call(this);
        this.state = { newUser: false, errorCode: null };
    }

    _createClass(Login, [{
        key: 'login',
        value: function login(evt) {
            var _this = this;

            evt.preventDefault();

            var username = this.refs.username.value,
                password = this.refs.password.value,
                rememberme = this.refs.rememberme.checked ? 1 : 0;

            this.setState({ running: true });
            ajaxUtil.post('/react-redux/login', { username: username, password: password, rememberme: rememberme }, function (resp) {
                _reactStartup2['default'].loadCurrentModule();
            }, function () {
                _this.setState({ running: false, errorCode: 'c2' });
            });
        }
    }, {
        key: 'createUser',
        value: function createUser(evt) {
            var _this2 = this;

            evt.preventDefault();

            var username = this.refs.username.value,
                password = this.refs.password.value,
                confirmPassword = this.refs.confirmPassword.value,
                rememberme = this.refs.rememberme.checked ? 1 : 0;

            if (password !== confirmPassword) {
                this.setState({ errorCode: 'c1' });
                return;
            } else if (!password) {
                this.setState({ errorCode: 'c3' });
                return;
            } else {
                this.setState({ errorCode: null });
            }

            this.setState({ running: true });
            ajaxUtil.post('/react-redux/createUser', { username: username, password: password, rememberme: rememberme }, function (resp) {
                if (resp.errorCode) {
                    _this2.setState({ errorCode: resp.errorCode, running: false });
                } else {
                    ajaxUtil.post('/react-redux/login', { username: username, password: password, rememberme: rememberme }, function () {
                        window.location.hash = '#books'; //new user - send them to where they can enter some books
                    });
                }
            });
        }
    }, {
        key: 'switchToLogin',
        value: function switchToLogin() {
            this.setState({ newUser: false, errorCode: null });
        }
    }, {
        key: 'switchToCreate',
        value: function switchToCreate() {
            this.setState({ newUser: true, errorCode: null });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            return React.createElement(
                'div',
                null,
                React.createElement(
                    Navbar,
                    { fluid: true },
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
                    )
                ),
                React.createElement(
                    'div',
                    { style: { padding: 50, maxWidth: 700, marginRight: 'auto', marginLeft: 'auto' } },
                    React.createElement(
                        'div',
                        { className: 'panel panel-default' },
                        React.createElement(
                            'div',
                            { className: 'panel-body' },
                            React.createElement(
                                'form',
                                null,
                                React.createElement(
                                    'div',
                                    { className: 'form-group' },
                                    React.createElement(
                                        'label',
                                        { htmlFor: 'username' },
                                        'Email address'
                                    ),
                                    React.createElement('input', { className: 'form-control', ref: 'username', id: 'username' })
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'form-group' },
                                    React.createElement(
                                        'label',
                                        { htmlFor: 'password' },
                                        'Password'
                                    ),
                                    React.createElement('input', { className: 'form-control', ref: 'password', id: 'password', type: 'password' })
                                ),
                                this.state.newUser ? React.createElement(
                                    'div',
                                    { className: 'form-group' },
                                    React.createElement(
                                        'label',
                                        { htmlFor: 'password' },
                                        'Confirm password'
                                    ),
                                    React.createElement('input', { className: 'form-control', ref: 'confirmPassword', type: 'password' })
                                ) : null,
                                React.createElement(
                                    'div',
                                    { className: 'checkbox' },
                                    React.createElement(
                                        'label',
                                        null,
                                        React.createElement('input', { type: 'checkbox', ref: 'rememberme' }),
                                        ' Remember me'
                                    )
                                ),
                                this.state.newUser ? React.createElement(
                                    _rootComponentsAjaxButton2['default'],
                                    { onClick: function (evt) {
                                            return _this3.createUser(evt);
                                        }, running: this.state.running, preset: 'primary' },
                                    'Create user'
                                ) : React.createElement(
                                    _rootComponentsAjaxButton2['default'],
                                    { onClick: function (evt) {
                                            return _this3.login(evt);
                                        }, running: this.state.running, preset: 'primary' },
                                    'Login'
                                ),
                                this.state.errorCode ? React.createElement(
                                    'div',
                                    { className: 'alert alert-danger margin-top' },
                                    errorCodes[this.state.errorCode]
                                ) : null,
                                React.createElement('hr', null),
                                this.state.newUser ? React.createElement(
                                    'div',
                                    { className: 'form-group' },
                                    React.createElement(
                                        'h4',
                                        null,
                                        'Existing user?'
                                    ),
                                    React.createElement(
                                        'a',
                                        { onClick: function () {
                                                return _this3.switchToLogin();
                                            }, className: 'btn btn-info' },
                                        'Click to login'
                                    )
                                ) : React.createElement(
                                    'div',
                                    { className: 'form-group' },
                                    React.createElement(
                                        'h4',
                                        null,
                                        'New user?'
                                    ),
                                    React.createElement(
                                        'a',
                                        { onClick: function () {
                                                return _this3.switchToCreate();
                                            }, className: 'btn btn-info' },
                                        'Click to create account'
                                    )
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return Login;
})(React.Component);

exports['default'] = Login;
module.exports = exports['default'];