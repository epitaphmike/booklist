'use strict';

var _actionsActionNames = require('../actions/actionNames');

var initialArray = function initialArray() {
    return Array.from({ length: 10 }).map(function () {
        return { isbn: '', queued: false, queueing: false };
    });
};
var initialState = {
    entryList: initialArray(),
    pendingNumber: null,
    booksJustSaved: []
};

var MAX_BOOKS_DISPLAYED = 20;

function reducer(state, action) {
    if (state === undefined) state = initialState;

    switch (action.type) {
        case _actionsActionNames.UPDATE_ISBN:
            var newEntryList = state.entryList.concat();
            Object.assign(newEntryList[action.index], { isbn: action.isbn, queueing: false, queued: false });

            return Object.assign({}, state, { entryList: newEntryList });
        case _actionsActionNames.GET_BOOK:
            var updatedObject = Object.assign({}, state.entryList[action.index], { queueing: true }),
                newEntryList = state.entryList.concat();

            newEntryList[action.index] = updatedObject;
            return Object.assign({}, state, { entryList: newEntryList });
        case _actionsActionNames.BOOK_QUEUED:
            var updatedObject = Object.assign({}, state.entryList[action.index], { queueing: false, queued: true }),
                newEntryList = state.entryList.concat();

            newEntryList[action.index] = updatedObject;
            return Object.assign({}, state, { entryList: newEntryList });
        case _actionsActionNames.RESET_LIST:
            return Object.assign({}, state, { entryList: initialArray() });
        case _actionsActionNames.SET_PENDING:
            return Object.assign({}, state, { pendingNumber: action.number });
        case _actionsActionNames.INCREMENT_PENDING:
            return Object.assign({}, state, { pendingNumber: (state.pendingNumber || 0) + 1 });
        case _actionsActionNames.BOOK_SAVED:
            return Object.assign({}, state, { booksJustSaved: [action.book].concat(state.booksJustSaved.slice(0, MAX_BOOKS_DISPLAYED)), pendingNumber: state.pendingNumber - 1 || 0 });
        case _actionsActionNames.BOOK_LOOKUP_FAILED:
            var entry = { _id: '' + new Date(), title: 'Failed lookup for ' + action.isbn };
            return Object.assign({}, state, { booksJustSaved: [entry].concat(state.booksJustSaved.slice(0, MAX_BOOKS_DISPLAYED)), pendingNumber: state.pendingNumber - 1 || 0 });
    }
    return state;
}

module.exports = reducer;