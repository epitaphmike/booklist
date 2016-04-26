'use strict';

var _require = require('./booksReducer');

var books = _require.booksReducer;
var booksSelector = _require.booksSelector;

var _require2 = require('./subjectsReducer');

var subjects = _require2.subjectsReducer;
var subjectsSelector = _require2.subjectsSelector;

var _require3 = require('./bookSearchReducer');

var bookSearch = _require3.bookSearchReducer;
var bookSearchSelector = _require3.bookSearchSelector;

var _require4 = require('./booksSubjectModifierReducer');

var booksSubjectsModifier = _require4.bookSubjectManagerReducer;
var booksSubjectsModifierSelector = _require4.booksSubjectsModifierSelector;

var reducer = Redux.combineReducers({
    books: books,
    subjects: subjects,
    bookSearch: bookSearch,
    booksSubjectsModifier: booksSubjectsModifier
});

var bookListSelector = function bookListSelector(state) {
    return {
        subjects: subjectsSelector(state.books),
        books: booksSelector(state.books),
        bookSearch: bookSearchSelector(state.books),
        booksSubjectsModifier: booksSubjectsModifierSelector(state.books)
    };
};

module.exports = { reducer: reducer, selector: bookListSelector };