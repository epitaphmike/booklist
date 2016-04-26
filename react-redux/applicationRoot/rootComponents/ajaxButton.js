'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BootstrapButton = require('./bootstrapButton');

var AjaxButton = (function (_BootstrapButton) {
    _inherits(AjaxButton, _BootstrapButton);

    function AjaxButton() {
        _classCallCheck(this, AjaxButton);

        _get(Object.getPrototypeOf(AjaxButton.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(AjaxButton, [{
        key: 'render',
        value: function render() {

            var result = this.props.running ? React.createElement(
                'button',
                { className: this.state.btnCss, disabled: true },
                React.createElement('i', { className: 'fa fa-fw fa-spin fa-spinner' }),
                this.props.runningText || this.props.text ? ' ' + this.props.runningText || this.props.text : this.props.children
            ) : React.createElement(
                'button',
                { className: this.state.btnCss, onClick: this.props.onClick },
                this.props.children
            );

            return result;
        }
    }]);

    return AjaxButton;
})(BootstrapButton);

exports['default'] = AjaxButton;
module.exports = exports['default'];