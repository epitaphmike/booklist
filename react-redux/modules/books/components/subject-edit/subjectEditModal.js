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

var _rootComponentsBootstrapButton = require('root-components/bootstrapButton');

var _rootComponentsBootstrapButton2 = _interopRequireDefault(_rootComponentsBootstrapButton);

var _actionsActionCreators = require('../../actions/actionCreators');

var actionCreators = _interopRequireWildcard(_actionsActionCreators);

var _hierarchicalSubjectList = require('./hierarchicalSubjectList');

var _hierarchicalSubjectList2 = _interopRequireDefault(_hierarchicalSubjectList);

var Modal = ReactBootstrap.Modal;

var subjectEditModal = (function (_React$Component) {
    _inherits(subjectEditModal, _React$Component);

    function subjectEditModal() {
        _classCallCheck(this, subjectEditModal);

        _get(Object.getPrototypeOf(subjectEditModal.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(subjectEditModal, [{
        key: 'render',
        value: function render() {
            var _this = this;

            var editSubjectsPacket = this.props.editSubjectsPacket;

            return React.createElement(
                Modal,
                { show: !!editSubjectsPacket, onHide: this.props.stopEditingSubjects },
                React.createElement(
                    Modal.Header,
                    { closeButton: true },
                    React.createElement(
                        Modal.Title,
                        null,
                        'Edit subjects'
                    )
                ),
                React.createElement(
                    Modal.Body,
                    null,
                    React.createElement(
                        _rootComponentsBootstrapButton2['default'],
                        { onClick: this.props.newSubject, preset: 'info-xs' },
                        'New subject'
                    ),
                    React.createElement('br', null),
                    React.createElement('br', null),
                    React.createElement(_hierarchicalSubjectList2['default'], { style: { paddingLeft: 5 }, subjects: this.props.subjects, onEdit: function (_id) {
                            return _this.props.editSubject(_id);
                        } }),
                    editSubjectsPacket && editSubjectsPacket.editing ? React.createElement(
                        'div',
                        { className: 'panel panel-info' },
                        React.createElement(
                            'div',
                            { className: 'panel-heading' },
                            editSubjectsPacket.editingSubject ? 'Edit ' + editSubjectsPacket.editingSubject.name : 'New Subject'
                        ),
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
                                        null,
                                        'Subject name'
                                    ),
                                    React.createElement('input', { className: 'form-control', value: editSubjectsPacket.newSubjectName, onChange: function (e) {
                                            return _this.props.setNewSubjectName(e.target.value);
                                        } })
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'form-group' },
                                    React.createElement(
                                        'label',
                                        null,
                                        'Parent'
                                    ),
                                    React.createElement(
                                        'select',
                                        { className: 'form-control', value: editSubjectsPacket.newSubjectParent, onChange: function (e) {
                                                return _this.props.setNewSubjectParent(e.target.value);
                                            } },
                                        React.createElement(
                                            'option',
                                            { value: '' },
                                            'None'
                                        ),
                                        editSubjectsPacket.eligibleParents.map(function (s) {
                                            return React.createElement(
                                                'option',
                                                { key: s._id, value: s._id },
                                                s.name
                                            );
                                        })
                                    )
                                ),
                                React.createElement(
                                    _rootComponentsBootstrapButton2['default'],
                                    { preset: 'primary', onClick: function (e) {
                                            _this.props.createOrUpdateSubject();e.preventDefault();
                                        } },
                                    'Save'
                                ),
                                React.createElement(
                                    _rootComponentsBootstrapButton2['default'],
                                    { className: 'pull-right', preset: 'danger', onClick: function (e) {
                                            _this.props.deleteSubject();e.preventDefault();
                                        } },
                                    'Delete'
                                )
                            )
                        )
                    ) : null
                ),
                React.createElement(
                    Modal.Footer,
                    null,
                    React.createElement(
                        _rootComponentsBootstrapButton2['default'],
                        { onClick: this.props.stopEditingSubjects },
                        'Close'
                    )
                )
            );
        }
    }]);

    return subjectEditModal;
})(React.Component);

var subjectEditModalConnected = ReactRedux.connect(function (state) {
    return state;
}, _extends({}, actionCreators))(subjectEditModal);

exports['default'] = subjectEditModalConnected;
module.exports = exports['default'];