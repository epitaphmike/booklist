'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BootstrapButton = require('root-components/bootstrapButton');
var AjaxButton = require('root-components/ajaxButton');

var BookEntryItem = (function (_React$Component) {
    _inherits(BookEntryItem, _React$Component);

    function BookEntryItem() {
        _classCallCheck(this, BookEntryItem);

        _get(Object.getPrototypeOf(BookEntryItem.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(BookEntryItem, [{
        key: 'render',
        value: function render() {
            var _this = this;

            return React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    { className: 'row' },
                    React.createElement(
                        'div',
                        { className: 'col-sm-8 form-horizontal' },
                        React.createElement(
                            'div',
                            { className: 'form-group row' },
                            React.createElement(
                                'label',
                                { className: 'control-label col-sm-4' },
                                'Input ISBN '
                            ),
                            React.createElement(
                                'div',
                                { className: 'col-sm-8' },
                                React.createElement('input', { className: 'form-control', ref: 'input', value: this.props.isbn, onChange: this.props.isbnChange, onKeyDown: function (evt) {
                                        return _this.keyDown(evt);
                                    }, disabled: this.props.queueing })
                            )
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'col-sm-4 pull-left' },
                        this.props.queueing ? React.createElement(
                            'span',
                            { className: 'label label-default' },
                            'Queuing'
                        ) : null,
                        this.props.queued ? React.createElement(
                            'span',
                            { className: 'label label-success' },
                            'Book is queued'
                        ) : null
                    )
                )
            );
        }
    }, {
        key: 'focusInput',
        value: function focusInput() {
            ReactDOM.findDOMNode(this.refs.input).focus();
        }
    }, {
        key: 'keyDown',
        value: function keyDown(evt) {
            if (evt.keyCode == 13) {
                this.props.entryFinished();
            }
        }
    }]);

    return BookEntryItem;
})(React.Component);

exports['default'] = BookEntryItem;
module.exports = exports['default'];