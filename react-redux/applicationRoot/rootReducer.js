'use strict';

var applicationData = Object.defineProperties({}, {
    module: {
        get: function get() {
            return 'Book entry';
        },
        configurable: true,
        enumerable: true
    }
});

function rootReducer() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    return Object.assign({}, applicationData);
}

module.exports = rootReducer;