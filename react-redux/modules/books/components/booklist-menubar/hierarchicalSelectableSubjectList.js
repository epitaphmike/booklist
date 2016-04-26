"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Collapse = ReactBootstrap.Collapse;

var HierarchicalSelectableSubjectItem = (function (_React$Component) {
    _inherits(HierarchicalSelectableSubjectItem, _React$Component);

    function HierarchicalSelectableSubjectItem() {
        _classCallCheck(this, HierarchicalSelectableSubjectItem);

        _get(Object.getPrototypeOf(HierarchicalSelectableSubjectItem.prototype), "constructor", this).call(this);
        this.state = { childrenVisible: false };
    }

    _createClass(HierarchicalSelectableSubjectItem, [{
        key: "toggleChildren",
        value: function toggleChildren() {
            this.setState({ childrenVisible: !this.state.childrenVisible });
        }
    }, {
        key: "render",
        value: function render() {
            var _this = this;

            var childrenVisible = this.state.childrenVisible;

            return React.createElement(
                "li",
                { key: this.props._id },
                React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "div",
                        { className: "checkbox", style: { display: 'inline-block', marginTop: 0, marginBottom: 0 } },
                        React.createElement(
                            "label",
                            null,
                            React.createElement("input", { type: "checkbox", onChange: function () {
                                    return _this.props.toggleFilteredSubject(_this.props._id);
                                }, checked: this.props.selectedSubjects[this.props._id] }),
                            this.props.name
                        ),
                        this.props.children.length ? React.createElement(
                            "a",
                            { style: { marginLeft: 5 }, onClick: function () {
                                    return _this.toggleChildren();
                                } },
                            React.createElement("i", { className: 'fa fa-' + (childrenVisible ? 'angle-double-up' : 'angle-double-down') })
                        ) : null
                    ),
                    this.props.children.length ? React.createElement(
                        Collapse,
                        { "in": childrenVisible },
                        React.createElement(
                            "div",
                            null,
                            React.createElement(HierarchicalSelectableSubjectList, { style: { paddingLeft: 25 }, selectedSubjects: this.props.selectedSubjects, toggleFilteredSubject: this.props.toggleFilteredSubject, subjects: this.props.subjects, subjects: this.props.children })
                        )
                    ) : null
                )
            );
        }
    }]);

    return HierarchicalSelectableSubjectItem;
})(React.Component);

var HierarchicalSelectableSubjectList = (function (_React$Component2) {
    _inherits(HierarchicalSelectableSubjectList, _React$Component2);

    function HierarchicalSelectableSubjectList() {
        _classCallCheck(this, HierarchicalSelectableSubjectList);

        _get(Object.getPrototypeOf(HierarchicalSelectableSubjectList.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(HierarchicalSelectableSubjectList, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            return React.createElement(
                "ul",
                { style: _extends({}, this.props.style || {}, { listStyle: 'none' }) },
                this.props.subjects.map(function (s) {
                    return React.createElement(HierarchicalSelectableSubjectItem, _extends({ selectedSubjects: _this2.props.selectedSubjects, toggleFilteredSubject: _this2.props.toggleFilteredSubject, subjects: _this2.props.subjects, key: s._id }, s));
                })
            );
        }
    }]);

    return HierarchicalSelectableSubjectList;
})(React.Component);

module.exports = HierarchicalSelectableSubjectList;