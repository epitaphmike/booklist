'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _actionsBookSubjectModifyActionCreators = require('../actions/bookSubjectModify/actionCreators');

var bookSubjectActionCreators = _interopRequireWildcard(_actionsBookSubjectModifyActionCreators);

var BootstrapButton = require('root-components/bootstrapButton');
var Modal = ReactBootstrap.Modal;
var AjaxButton = require('root-components/ajaxButton');

var _require = require('../reducers/booksSubjectModifierReducer');

var booksSubjectsModifierSelector = _require.booksSubjectsModifierSelector;

var BookSubjectSetterDesktopUnConnected = (function (_React$Component) {
    _inherits(BookSubjectSetterDesktopUnConnected, _React$Component);

    function BookSubjectSetterDesktopUnConnected() {
        _classCallCheck(this, BookSubjectSetterDesktopUnConnected);

        _get(Object.getPrototypeOf(BookSubjectSetterDesktopUnConnected.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(BookSubjectSetterDesktopUnConnected, [{
        key: 'setBooksSubjects',
        value: function setBooksSubjects() {
            this.props.setBooksSubjects(this.props.modifyingBooks.map(function (b) {
                return b._id;
            }), this.props.addingSubjects.map(function (s) {
                return s._id;
            }), this.props.removingSubjects.map(function (s) {
                return s._id;
            }));
        }
    }, {
        key: 'render',
        value: function render() {
            var _this = this;

            return React.createElement(
                Modal,
                { show: !!this.props.modifyingBooks.length, onHide: this.props.cancelBookSubjectModification },
                React.createElement(
                    Modal.Header,
                    { closeButton: true },
                    React.createElement(
                        Modal.Title,
                        null,
                        'Edit subjects for:',
                        React.createElement(
                            'div',
                            null,
                            this.props.modifyingBooks.map(function (book) {
                                return React.createElement(
                                    'h5',
                                    { key: book._id },
                                    book.title
                                );
                            })
                        )
                    )
                ),
                React.createElement(
                    Modal.Body,
                    null,
                    React.createElement(
                        'div',
                        null,
                        React.createElement(
                            BootstrapButton,
                            { preset: 'primary-xs', className: 'pull-right', onClick: this.props.subjectModificationClearSubjects },
                            'Reset subjects'
                        )
                    ),
                    React.createElement('br', null),
                    React.createElement(
                        'div',
                        null,
                        React.createElement(
                            'b',
                            null,
                            'Add'
                        ),
                        ' ',
                        this.props.addingSubjects.map(function (subject) {
                            return React.createElement(
                                'span',
                                { className: 'label label-primary', style: { marginRight: 5, display: 'inline-block' }, key: subject._id },
                                subject.name
                            );
                        })
                    ),
                    React.createElement(
                        'div',
                        { className: 'panel panel-default', style: { maxHeight: 150, overflow: 'scroll' } },
                        React.createElement(
                            'div',
                            { className: 'panel-body', style: { paddingTop: 0 } },
                            this.props.subjects.allSubjectsSorted.map(function (s) {
                                return React.createElement(
                                    'div',
                                    { className: 'checkbox', key: s._id },
                                    React.createElement(
                                        'label',
                                        null,
                                        React.createElement('input', { type: 'checkbox', checked: !!_this.props.addingSubjectIds[s._id], onChange: function () {
                                                return _this.props.toggleSubjectModificationAdd(s._id);
                                            } }),
                                        ' ',
                                        s.name
                                    )
                                );
                            })
                        )
                    ),
                    React.createElement(
                        'div',
                        null,
                        React.createElement(
                            'b',
                            null,
                            'Remove'
                        ),
                        ' ',
                        this.props.removingSubjects.map(function (subject) {
                            return React.createElement(
                                'span',
                                { className: 'label label-primary', style: { marginRight: 5, display: 'inline-block' }, key: subject._id },
                                subject.name
                            );
                        })
                    ),
                    React.createElement(
                        'div',
                        { className: 'panel panel-default', style: { maxHeight: 150, overflow: 'scroll' } },
                        React.createElement(
                            'div',
                            { className: 'panel-body', style: { paddingTop: 0 } },
                            this.props.subjects.allSubjectsSorted.map(function (s) {
                                return React.createElement(
                                    'div',
                                    { className: 'checkbox', key: s._id },
                                    React.createElement(
                                        'label',
                                        null,
                                        React.createElement('input', { type: 'checkbox', checked: !!_this.props.removingSubjectIds[s._id], onChange: function () {
                                                return _this.props.toggleSubjectModificationRemove(s._id);
                                            } }),
                                        ' ',
                                        s.name
                                    )
                                );
                            })
                        )
                    )
                ),
                React.createElement(
                    Modal.Footer,
                    null,
                    React.createElement(
                        AjaxButton,
                        { preset: 'primary', running: this.props.settingBooksSubjects, runningText: 'Setting', onClick: function () {
                                return _this.setBooksSubjects();
                            } },
                        'Set'
                    ),
                    React.createElement(
                        BootstrapButton,
                        { preset: '', onClick: this.props.cancelBookSubjectModification },
                        'Cancel'
                    )
                )
            );
        }
    }]);

    return BookSubjectSetterDesktopUnConnected;
})(React.Component);

var BookSubjectSetterDesktop = ReactRedux.connect(function (state) {
    return booksSubjectsModifierSelector(state.books);
}, _extends({}, bookSubjectActionCreators))(BookSubjectSetterDesktopUnConnected);

module.exports = BookSubjectSetterDesktop;