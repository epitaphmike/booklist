"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BootstrapButton = require('root-components/bootstrapButton');
var Collapse = ReactBootstrap.Collapse;

var HierarchicalSubjectItem = (function (_React$Component) {
    _inherits(HierarchicalSubjectItem, _React$Component);

    function HierarchicalSubjectItem() {
        _classCallCheck(this, HierarchicalSubjectItem);

        _get(Object.getPrototypeOf(HierarchicalSubjectItem.prototype), "constructor", this).call(this);
        this.state = { childrenVisible: false };
    }

    _createClass(HierarchicalSubjectItem, [{
        key: "toggleChildren",
        value: function toggleChildren() {
            this.setState({ childrenVisible: !this.state.childrenVisible });
        }
    }, {
        key: "render",
        value: function render() {
            var _this = this;

            return React.createElement(
                "li",
                { key: this.props._id },
                this.props.children.length ? React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "a",
                        { onClick: function () {
                                return _this.props.onEdit(_this.props._id);
                            } },
                        React.createElement("i", { className: "fa fa-edit" })
                    ),
                    " ",
                    React.createElement(
                        "a",
                        { onClick: function () {
                                return _this.toggleChildren();
                            } },
                        this.props.name
                    ),
                    React.createElement(
                        Collapse,
                        { "in": this.state.childrenVisible },
                        React.createElement(
                            "div",
                            null,
                            React.createElement(HierarchicalSubjectList, { style: { paddingLeft: 25 }, onEdit: this.props.onEdit, subjects: this.props.children })
                        )
                    )
                ) : React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "a",
                        { onClick: function () {
                                return _this.props.onEdit(_this.props._id);
                            } },
                        React.createElement("i", { className: "fa fa-edit" })
                    ),
                    " ",
                    React.createElement(
                        "span",
                        null,
                        this.props.name
                    )
                )
            );
        }
    }]);

    return HierarchicalSubjectItem;
})(React.Component);

var HierarchicalSubjectList = (function (_React$Component2) {
    _inherits(HierarchicalSubjectList, _React$Component2);

    function HierarchicalSubjectList() {
        _classCallCheck(this, HierarchicalSubjectList);

        _get(Object.getPrototypeOf(HierarchicalSubjectList.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(HierarchicalSubjectList, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            return React.createElement(
                "div",
                null,
                React.createElement(
                    "ul",
                    { style: _extends({}, this.props.style || {}, { listStyle: 'none' }) },
                    this.props.subjects.map(function (s) {
                        return React.createElement(HierarchicalSubjectItem, _extends({ onEdit: _this2.props.onEdit, key: s._id }, s));
                    })
                )
            );
        }
    }]);

    return HierarchicalSubjectList;
})(React.Component);

module.exports = HierarchicalSubjectList;