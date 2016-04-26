'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _require = require('application-root/renderUI');

var renderUI = _require.renderUI;
var clearUI = _require.clearUI;

var _require2 = require('application-root/store');

var store = _require2.store;
var getNewReducer = _require2.getNewReducer;

require('global-utils/ajaxUtil');

var currentModule = undefined;

window.onhashchange = function () {
    loadCurrentModule();
};

loadCurrentModule();

function loadCurrentModule() {
    var hash = window.location.hash.replace('#', ''),
        module = hash.split('/')[0] || 'books';

    var loggedIn = /logged_in/ig.test(document.cookie);
    if (!loggedIn) {
        forceLogin();
        return;
    }

    if (module === currentModule) return;
    currentModule = module;

    System['import']('react-redux/modules/' + module + '/' + module).then(function (module) {
        clearUI();
        getNewReducer({ name: module.name, reducer: module.reducer });
        renderUI(module.component);
    });
}

function forceLogin() {
    currentModule = null;
    System['import']('./modules/authenticate/loginScreen').then(function (login) {
        clearUI();
        renderUI(React.createElement(login));
    });
}

exports['default'] = { loadCurrentModule: loadCurrentModule, forceLogin: forceLogin };
module.exports = exports['default'];