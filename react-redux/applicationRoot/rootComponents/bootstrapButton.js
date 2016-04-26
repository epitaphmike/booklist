'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var cssPresets = {};
var buttonTypes = ['default', 'primary', 'success', 'info', 'warning', 'danger'];
var buttonSizes = ['lg', 'sm', 'xs'];

buttonTypes.forEach(function (t) {
    cssPresets[t] = 'btn-' + t; //default size
    buttonSizes.forEach(function (s) {
        cssPresets[t + '-' + s] = 'btn-' + t + ' btn-' + s;
    });
});

var BootstrapButton = (function (_React$Component) {
    _inherits(BootstrapButton, _React$Component);

    function BootstrapButton(props) {
        _classCallCheck(this, BootstrapButton);

        _get(Object.getPrototypeOf(BootstrapButton.prototype), 'constructor', this).call(this);
        this.state = { btnCss: (props.className || '') + ' btn ' + (cssPresets[props.preset] || props.css || '') };
    }

    _createClass(BootstrapButton, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'button',
                { className: this.state.btnCss, style: _extends({}, this.props.style), onClick: this.props.onClick, disabled: this.props.disabled },
                this.props.children
            );
        }
    }]);

    return BootstrapButton;
})(React.Component);

module.exports = BootstrapButton;