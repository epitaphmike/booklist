'use strict';

var Provider = ReactRedux.Provider;
var Header = require('./rootComponents/header');

var _require = require('application-root/store');

var store = _require.store;

function clearUI() {
    ReactDOM.render(React.createElement('div', null), document.getElementById('home'));
}

function renderUI(component) {
    ReactDOM.render(React.createElement(
        Provider,
        { store: store },
        React.createElement(
            'div',
            null,
            component
        )
    ), document.getElementById('home'));
}

module.exports = { renderUI: renderUI, clearUI: clearUI };