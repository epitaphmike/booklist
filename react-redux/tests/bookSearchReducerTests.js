'use strict';

var _modulesBooksReducersBookSearchReducer = require('../modules/books/reducers/bookSearchReducer');

var _modulesBooksActionsActionCreators = require('../modules/books/actions/actionCreators');

var _modulesBooksActionsActionNames = require('../modules/books/actions/actionNames');

var assert = require('chai').assert;

describe('book search', function () {
    before(function () {});

    after(function () {});

    beforeEach(function () {});

    afterEach(function () {});

    it('set isDirty to true', function callee$1$0() {
        return regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
                case 0:
                    assert.strictEqual(true, apply((0, _modulesBooksActionsActionCreators.setFilters)('', {}, null)).isDirty);

                case 1:
                case 'end':
                    return context$2$0.stop();
            }
        }, null, this);
    });

    it('set isDirty to true then false after load', function callee$1$0() {
        return regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
                case 0:
                    assert.strictEqual(false, apply((0, _modulesBooksActionsActionCreators.setFilters)('', {}, null), { type: _modulesBooksActionsActionNames.LOAD_BOOKS }).isDirty);

                case 1:
                case 'end':
                    return context$2$0.stop();
            }
        }, null, this);
    });

    it('set isDirty to true then false after load, keep false for non-changing set filters call', function callee$1$0() {
        return regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
                case 0:
                    assert.strictEqual(false, apply((0, _modulesBooksActionsActionCreators.setFilters)('', {}, null), { type: _modulesBooksActionsActionNames.LOAD_BOOKS }, (0, _modulesBooksActionsActionCreators.setFilters)('', {}, null)).isDirty);

                case 1:
                case 'end':
                    return context$2$0.stop();
            }
        }, null, this);
    });

    it('set isDirty to true then false after load, keep false for non-changing set filters call 2', function callee$1$0() {
        return regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
                case 0:
                    assert.strictEqual(false, apply((0, _modulesBooksActionsActionCreators.setFilters)('', { a: true }, null), { type: _modulesBooksActionsActionNames.LOAD_BOOKS }, (0, _modulesBooksActionsActionCreators.setFilters)('', { a: true }, null)).isDirty);

                case 1:
                case 'end':
                    return context$2$0.stop();
            }
        }, null, this);
    });

    it('set isDirty to true then false after load, keep false for non-changing set filters call 2', function callee$1$0() {
        return regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
                case 0:
                    assert.strictEqual(false, apply((0, _modulesBooksActionsActionCreators.setFilters)('', { a: true }, true), { type: _modulesBooksActionsActionNames.LOAD_BOOKS }, (0, _modulesBooksActionsActionCreators.setFilters)('', { a: true }, true)).isDirty);

                case 1:
                case 'end':
                    return context$2$0.stop();
            }
        }, null, this);
    });

    it('searchChildSubjects resets isDirty properly', function callee$1$0() {
        return regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
                case 0:
                    assert.strictEqual(true, apply((0, _modulesBooksActionsActionCreators.setFilters)('', { a: true }, true), { type: _modulesBooksActionsActionNames.LOAD_BOOKS }, (0, _modulesBooksActionsActionCreators.setFilters)('', { a: true }, null)).isDirty);

                case 1:
                case 'end':
                    return context$2$0.stop();
            }
        }, null, this);
    });

    it('searchChildSubjects resets isDirty properly', function callee$1$0() {
        return regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
                case 0:
                    assert.strictEqual(true, apply((0, _modulesBooksActionsActionCreators.setFilters)('', { a: true }, null), { type: _modulesBooksActionsActionNames.LOAD_BOOKS }, (0, _modulesBooksActionsActionCreators.setFilters)('', { a: true }, true)).isDirty);

                case 1:
                case 'end':
                    return context$2$0.stop();
            }
        }, null, this);
    });

    it('subjects change resets isDirty properly', function callee$1$0() {
        return regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
                case 0:
                    assert.strictEqual(true, apply((0, _modulesBooksActionsActionCreators.setFilters)('', { a: true }, true), { type: _modulesBooksActionsActionNames.LOAD_BOOKS }, (0, _modulesBooksActionsActionCreators.setFilters)('', {}, true)).isDirty);

                case 1:
                case 'end':
                    return context$2$0.stop();
            }
        }, null, this);
    });

    it('subjects change resets isDirty properly 2', function callee$1$0() {
        return regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
                case 0:
                    assert.strictEqual(true, apply((0, _modulesBooksActionsActionCreators.setFilters)('', {}, true), { type: _modulesBooksActionsActionNames.LOAD_BOOKS }, (0, _modulesBooksActionsActionCreators.setFilters)('', { a: true }, true)).isDirty);

                case 1:
                case 'end':
                    return context$2$0.stop();
            }
        }, null, this);
    });

    it('text change resets isDirty properly 2', function callee$1$0() {
        return regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
                case 0:
                    assert.strictEqual(true, apply((0, _modulesBooksActionsActionCreators.setFilters)('', { a: true }, true), { type: _modulesBooksActionsActionNames.LOAD_BOOKS }, (0, _modulesBooksActionsActionCreators.setFilters)('a', { a: true }, true)).isDirty);

                case 1:
                case 'end':
                    return context$2$0.stop();
            }
        }, null, this);
    });

    function apply() {
        var state = (0, _modulesBooksReducersBookSearchReducer.bookSearchReducer)(undefined, { type: '________' });

        for (var _len = arguments.length, actions = Array(_len), _key = 0; _key < _len; _key++) {
            actions[_key] = arguments[_key];
        }

        actions.forEach(function (a) {
            return state = (0, _modulesBooksReducersBookSearchReducer.bookSearchReducer)(state, a);
        });
        return state;
    }
});