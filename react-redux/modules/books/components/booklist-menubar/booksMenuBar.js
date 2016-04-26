'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _actionsActionCreators = require('../../actions/actionCreators');

var bookSearchActionCreators = _interopRequireWildcard(_actionsActionCreators);

var Modal = ReactBootstrap.Modal;
var Navbar = ReactBootstrap.Navbar;
var Nav = ReactBootstrap.Nav;
var NavItem = ReactBootstrap.NavItem;
var NavDropdown = ReactBootstrap.NavDropdown;
var DropDownButton = ReactBootstrap.DropDownButton;
var MenuItem = ReactBootstrap.MenuItem;
var HierarchicalSelectableSubjectList = require('./hierarchicalSelectableSubjectList');

var BootstrapButton = require('root-components/bootstrapButton');
var hashUtil = require('global-utils/hashManager');

var _require = require('../../reducers/bookSearchReducer');

var bookSearchSelector = _require.bookSearchSelector;

var BooksMenuBar = (function (_React$Component) {
    _inherits(BooksMenuBar, _React$Component);

    function BooksMenuBar(props) {
        var _this = this;

        _classCallCheck(this, BooksMenuBar);

        _get(Object.getPrototypeOf(BooksMenuBar.prototype), 'constructor', this).call(this);
        this.togglePendingSubject = this.togglePendingSubject.bind(this);
        this.hashManager = new hashUtil();

        this.state = { pendingSubjects: {}, menuOpen: false };
        this._hashChangeSubscription = function () {
            var subjectsSelected = {},
                selectedSubjectsHashString = _this.hashManager.getCurrentHashValueOf('filterSubjects');
            if (selectedSubjectsHashString) {
                selectedSubjectsHashString.split('-').forEach(function (_id) {
                    return subjectsSelected[_id] = true;
                });
            }

            _this.props.setFilters(_this.hashManager.getCurrentHashValueOf('bookSearch') || '', subjectsSelected, _this.hashManager.getCurrentHashValueOf('searchChildSubjects') ? 'true' : null);
        };
        window.addEventListener("hashchange", this._hashChangeSubscription);
    }

    _createClass(BooksMenuBar, [{
        key: 'removeFilterSubject',
        value: function removeFilterSubject(_id) {
            var _this2 = this;

            var selectedSubjectsHashString = this.hashManager.getCurrentHashValueOf('filterSubjects'),
                subjectsArr = selectedSubjectsHashString.split('-');
            subjectsArr = subjectsArr.filter(function (sId) {
                return sId != _id;
            });

            var filterSubjectsVal = subjectsArr.join('-');

            this.hashManager.setValues('filterSubjects', filterSubjectsVal, 'searchChildSubjects', this.props.searchChildSubjects && filterSubjectsVal ? 'true' : null);

            if (!subjectsArr.length) {
                setTimeout(function () {
                    return _this2.setState({ menuOpen: false });
                }, 1);
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this._hashChangeSubscription();
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(newProps) {
            if (this.props.searchText !== newProps.searchText) {
                this.refs.searchInput.value = newProps.searchText;
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            window.removeEventListener("hashchange", this._hashChangeSubscription);
        }
    }, {
        key: 'openSubjectsFilterModal',
        value: function openSubjectsFilterModal() {
            this.setState({ subjectFiltersModalOpen: true, pendingSubjects: this.props.subjects, searchChildSubjects: this.props.searchChildSubjects });
        }
    }, {
        key: 'closeSubjectsFilterModal',
        value: function closeSubjectsFilterModal() {
            this.setState({ subjectFiltersModalOpen: false });
        }
    }, {
        key: 'applySubjectsFilters',
        value: function applySubjectsFilters() {
            var _this3 = this;

            this.setState({ subjectFiltersModalOpen: false });

            var filterSubjectsVal = Object.keys(this.state.pendingSubjects).filter(function (k) {
                return _this3.state.pendingSubjects[k];
            }).join('-');

            this.hashManager.setValues('filterSubjects', filterSubjectsVal, 'searchChildSubjects', this.state.searchChildSubjects && filterSubjectsVal ? 'true' : null);
        }
    }, {
        key: 'togglePendingSubject',
        value: function togglePendingSubject(_id) {
            this.setState({ pendingSubjects: _extends({}, this.state.pendingSubjects, _defineProperty({}, _id, !this.state.pendingSubjects[_id])) });
        }
    }, {
        key: 'dropdownToggle',
        value: function dropdownToggle(newValue) {
            if (this._forceOpen) {
                this.setState({ menuOpen: true });
                this._forceOpen = false;
            } else {
                this.setState({ menuOpen: newValue });
            }
        }
    }, {
        key: 'menuItemClickedThatShouldntCloseDropdown',
        value: function menuItemClickedThatShouldntCloseDropdown() {
            this._forceOpen = true;
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            var selectedSubjectsCount = this.props.selectedSubjects.length,
                selectedSubjectsHeader = 'Searching ' + selectedSubjectsCount + ' Subject' + (selectedSubjectsCount === 1 ? '' : 's');

            return React.createElement(
                'div',
                null,
                React.createElement(
                    Navbar,
                    { style: { border: 0, borderRadius: 0 }, fluid: true },
                    React.createElement(
                        Navbar.Header,
                        null,
                        React.createElement(
                            Navbar.Brand,
                            null,
                            React.createElement(
                                'a',
                                { style: { cursor: 'default' } },
                                'Your books'
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
                                { onClick: this.props.enableSubjectModificationToggledBooks, disabled: !this.props.selectedBooksCount },
                                'Set subjects'
                            ),
                            React.createElement(
                                NavItem,
                                { onClick: this.props.editSubjects },
                                'Edit subjects'
                            )
                        ),
                        React.createElement(
                            Navbar.Header,
                            null,
                            React.createElement(
                                Navbar.Brand,
                                null,
                                React.createElement(
                                    'a',
                                    { style: { cursor: 'default' } },
                                    'Filters'
                                )
                            )
                        ),
                        React.createElement(
                            Navbar.Form,
                            { pullLeft: true },
                            React.createElement(
                                'div',
                                { className: 'form-group' },
                                React.createElement(
                                    'div',
                                    { className: 'input-group' },
                                    React.createElement(
                                        'span',
                                        { className: 'input-group-btn' },
                                        React.createElement(
                                            BootstrapButton,
                                            { preset: 'default', onClick: function () {
                                                    return _this4.openSubjectsFilterModal();
                                                } },
                                            'By subject'
                                        )
                                    ),
                                    React.createElement('input', { className: 'form-control', placeholder: 'Title search', onKeyDown: function (evt) {
                                            return _this4.searchFilterKeyDown(evt);
                                        }, ref: 'searchInput' }),
                                    React.createElement(
                                        'span',
                                        { className: 'input-group-btn' },
                                        React.createElement(
                                            'button',
                                            { className: 'btn btn-default', onClick: function () {
                                                    return _this4.setSearchText();
                                                }, type: 'button' },
                                            React.createElement('i', { className: 'fa fa-search' })
                                        )
                                    )
                                )
                            )
                        ),
                        selectedSubjectsCount ? React.createElement(
                            Nav,
                            null,
                            React.createElement(
                                NavDropdown,
                                { open: this.state.menuOpen, onToggle: function (val) {
                                        return _this4.dropdownToggle(val);
                                    }, title: selectedSubjectsHeader, id: 'sel-subjects-dropdown' },
                                this.props.selectedSubjects.map(function (s) {
                                    return React.createElement(
                                        MenuItem,
                                        { onClick: function () {
                                                return _this4.menuItemClickedThatShouldntCloseDropdown();
                                            }, className: 'default-cursor no-hover', key: s._id },
                                        React.createElement(
                                            'span',
                                            { className: 'label label-default' },
                                            React.createElement(
                                                'span',
                                                { onClick: function () {
                                                        return _this4.removeFilterSubject(s._id);
                                                    }, style: { cursor: 'pointer' } },
                                                'X'
                                            ),
                                            React.createElement(
                                                'span',
                                                { style: { marginLeft: 5, paddingLeft: 5, borderLeft: '1px solid white' } },
                                                s.name
                                            )
                                        )
                                    );
                                }),
                                !!this.props.searchChildSubjects ? React.createElement(MenuItem, { divider: true }) : null,
                                !!this.props.searchChildSubjects ? React.createElement(
                                    MenuItem,
                                    { onClick: function () {
                                            return _this4.menuItemClickedThatShouldntCloseDropdown();
                                        }, className: 'default-cursor no-hover' },
                                    React.createElement(
                                        'span',
                                        { className: 'label label-primary' },
                                        'Searching child subjects'
                                    )
                                ) : null
                            )
                        ) : null
                    )
                ),
                React.createElement(
                    Modal,
                    { show: this.state.subjectFiltersModalOpen, onHide: function () {
                            return _this4.closeSubjectsFilterModal();
                        } },
                    React.createElement(
                        Modal.Header,
                        { closeButton: true },
                        React.createElement(
                            Modal.Title,
                            null,
                            'Filter subjects'
                        )
                    ),
                    React.createElement(
                        Modal.Body,
                        null,
                        React.createElement(
                            'label',
                            null,
                            'Also search child subjects ',
                            React.createElement('input', { type: 'checkbox', onChange: function (evt) {
                                    return _this4.setState({ searchChildSubjects: evt.target.checked });
                                }, checked: this.state.searchChildSubjects })
                        ),
                        React.createElement(HierarchicalSelectableSubjectList, {
                            style: { paddingLeft: 5 },
                            toggleFilteredSubject: this.togglePendingSubject,
                            subjects: this.props.allSubjects,
                            selectedSubjects: this.state.pendingSubjects }),
                        this.props.selectedSubjects.length ? React.createElement(
                            'span',
                            null,
                            'Selected subjects: ',
                            React.createElement(
                                'span',
                                null,
                                this.props.selectedSubjects.map(function (s) {
                                    return s.name;
                                }).join(', ')
                            )
                        ) : null
                    ),
                    React.createElement(
                        Modal.Footer,
                        null,
                        React.createElement(
                            BootstrapButton,
                            { preset: 'primary', className: 'pull-left', onClick: function () {
                                    return _this4.applySubjectsFilters();
                                } },
                            'Filter'
                        ),
                        React.createElement(
                            BootstrapButton,
                            { preset: 'default', onClick: function () {
                                    return _this4.closeSubjectsFilterModal();
                                } },
                            'Close'
                        )
                    )
                )
            );
        }
    }, {
        key: 'searchFilterKeyDown',
        value: function searchFilterKeyDown(evt) {
            if (evt.which == 13) {
                this.hashManager.setValueOf('bookSearch', evt.target.value);
            }
        }
    }, {
        key: 'setSearchText',
        value: function setSearchText() {
            this.hashManager.setValueOf('bookSearch', this.refs.searchInput.value);
        }
    }]);

    return BooksMenuBar;
})(React.Component);

var BooksMenuBarConnected = ReactRedux.connect(function (state) {
    return bookSearchSelector(state.books);
}, _extends({}, bookSearchActionCreators))(BooksMenuBar);

exports['default'] = BooksMenuBarConnected;
module.exports = exports['default'];