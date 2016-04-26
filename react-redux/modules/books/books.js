'use strict';

var BookViewList = require('./components/bookViewList');

var _require = require('./reducers/reducer');

var reducer = _require.reducer;
var selector = _require.selector;

BookViewList = ReactRedux.connect(selector)(BookViewList);

module.exports = {
    name: 'books',
    reducer: reducer,
    component: React.createElement(BookViewList, null)
};