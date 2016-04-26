'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var rootReducer = require('./rootReducer');
var thunkMiddleware = require('./../util/redux-thunk');

function getNewReducer(reducerObj) {
    var _Redux$combineReducers;

    if (!reducerObj) return Redux.combineReducers({ root: rootReducer });

    store.replaceReducer(function () {
        return {
            root: rootReducer()
        };
    });

    store.replaceReducer(Redux.combineReducers((_Redux$combineReducers = {}, _defineProperty(_Redux$combineReducers, reducerObj.name, reducerObj.reducer), _defineProperty(_Redux$combineReducers, 'root', rootReducer), _Redux$combineReducers)));
}

var createStoreWithMiddleware = Redux.applyMiddleware(thunkMiddleware)(Redux.createStore);

var store = createStoreWithMiddleware(getNewReducer());

module.exports = {
    store: store,
    getNewReducer: getNewReducer
};