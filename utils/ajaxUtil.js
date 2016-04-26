'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

window.ajaxUtil = _defineProperty({
    post: function post(url, data) {
        var callback = arguments.length <= 2 || arguments[2] === undefined ? function () {
            return null;
        } : arguments[2];
        var errorCallback = arguments.length <= 3 || arguments[3] === undefined ? function () {
            return null;
        } : arguments[3];

        return $.ajax(url, {
            method: 'post',
            data: data,
            success: callback,
            error: errorCallback
        });
    }
}, 'get', function get(url, data) {
    var callback = arguments.length <= 2 || arguments[2] === undefined ? function () {
        return null;
    } : arguments[2];
    var errorCallback = arguments.length <= 3 || arguments[3] === undefined ? function () {
        return null;
    } : arguments[3];

    return $.ajax(url, {
        method: 'get',
        data: data,
        success: callback,
        error: errorCallback
    });
});