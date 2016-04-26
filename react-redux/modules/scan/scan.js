'use strict';

var BookEntryList = require('./components/bookEntryList');
var reducer = require('./reducers/reducer');

BookEntryList = ReactRedux.connect(function (state) {
    return state.scan;
})(BookEntryList);

module.exports = {
    name: 'scan',
    reducer: reducer,
    component: React.createElement(BookEntryList, null)
};