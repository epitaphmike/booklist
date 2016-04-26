'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var SerializedHash = (function () {
    function SerializedHash(module, submodule, parameters) {
        _classCallCheck(this, SerializedHash);

        this.module = module || '';
        this.submodule = submodule || '';
        this.parameters = parameters || {};
    }

    _createClass(SerializedHash, [{
        key: 'addOrSetValue',
        value: function addOrSetValue(key, value) {
            if (value == null || value === '') return;

            if (this.parameters.hasOwnProperty(key)) {
                this.addValue(key, value);
            } else {
                this.setValue(key, value);
            }
        }
    }, {
        key: 'addValue',
        value: function addValue(key, newValue) {
            if (!this.parameters.hasOwnProperty(key)) {
                this.setValue(key, [newValue]);
            } else {
                var priorParameterValue = this.findParameterWithKey(key);
                if (!Array.isArray(priorParameterValue)) {
                    //wasn't an array before, it is now
                    this.setValue(key, [priorParameterValue]);
                }

                this.parameters[key].push(newValue);
            }
        }
    }, {
        key: 'setValue',
        value: function setValue(key, value) {
            this.parameters[key] = value;
        }
    }, {
        key: 'removeValue',
        value: function removeValue(key) {
            delete this.parameters[key];
        }
    }, {
        key: 'getValue',
        value: function getValue(key) {
            return this.parameters[key];
        }
    }, {
        key: 'findParameterWithKey',
        value: function findParameterWithKey(key) {
            return this.parameters[key];
        }
    }]);

    return SerializedHash;
})();

var HashUtility = (function () {
    function HashUtility() {
        _classCallCheck(this, HashUtility);
    }

    _createClass(HashUtility, [{
        key: 'parseHashTag',
        value: function parseHashTag(hash) {
            if (hash.indexOf('#') > -1) {
                hash = hash.split("#")[1];
            }

            if (hash.charAt(hash.length - 1) === '/') {
                hash = hash.substr(0, hash.length - 1);
            }

            var modSubmodSection = hash.indexOf("?") > -1 ? hash.split("?")[0] : hash;
            var queryStringSection = hash.indexOf("?") > -1 ? hash.split("?")[1] : null;
            var modSections = modSubmodSection.split("/");

            var result = new SerializedHash(modSections[0], modSections[1]);

            if (queryStringSection) {
                var pairs = queryStringSection.split('&');
                for (var i = 0, max = pairs.length; i < max; i++) {
                    var keyValuePair = pairs[i].split('=');
                    var key = keyValuePair[0];
                    var value = keyValuePair.length > 1 ? decodeURIComponent(keyValuePair[1]) : undefined;

                    result.addOrSetValue(key, value);
                }
            }

            return result;
        }
    }, {
        key: 'createHashTag',
        value: function createHashTag(hashObject) {
            var result = '';

            if (hashObject.module) {
                result += hashObject.module;
            }
            if (hashObject.submodule) {
                result += '/' + hashObject.submodule;
            }

            var allPairs = [];
            if (hashObject.parameters) {
                Object.keys(hashObject.parameters).forEach(function (k) {
                    if (Array.isArray(hashObject.parameters[k])) {
                        hashObject.parameters[k].forEach(function (val) {
                            return allPairs.push(k + '=' + encodeURIComponent(val));
                        });
                    } else {
                        if (hashObject.parameters[k] !== '' && hashObject.parameters[k] != null) {
                            allPairs.push(k + '=' + encodeURIComponent(hashObject.parameters[k]));
                        }
                    }
                });
            }

            if (allPairs.length) {
                result += '/?' + allPairs.join('&');
            }
            return result;
        }
    }, {
        key: 'removeFromHash',
        value: function removeFromHash() {
            var hashInfo = this.parseHashTag(window.location.hash);

            for (var _len = arguments.length, keys = Array(_len), _key = 0; _key < _len; _key++) {
                keys[_key] = arguments[_key];
            }

            keys.forEach(function (key) {
                return hashInfo.removeValue(key);
            });
            this.setHash(hashInfo);
        }
    }, {
        key: 'addValueOf',
        value: function addValueOf(key, value) {
            var hashInfo = this.parseHashTag(window.location.hash);
            hashInfo.addValue(key, value);
            this.setHash(hashInfo);
        }
    }, {
        key: 'setValueOf',
        value: function setValueOf(key, value) {
            var hashInfo = this.parseHashTag(window.location.hash);
            hashInfo.setValue(key, value);
            this.setHash(hashInfo);
        }
    }, {
        key: 'setValues',
        value: function setValues() {
            var hashInfo = this.parseHashTag(window.location.hash);

            for (var _len2 = arguments.length, pairs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                pairs[_key2] = arguments[_key2];
            }

            for (var i = 0; i < pairs.length; i += 2) {
                hashInfo.setValue(pairs[i], pairs[i + 1]);
            }
            this.setHash(hashInfo);
        }
    }, {
        key: 'setHash',
        value: function setHash(hashInfo) {
            var oldHash = window.location.hash,
                newHash = this.createHashTag(hashInfo);

            window.location.hash = newHash;
        }
    }, {
        key: 'getCurrentHashInfo',
        value: function getCurrentHashInfo() {
            return this.parseHashTag(window.location.hash);
        }
    }, {
        key: 'getCurrentHashValueOf',
        value: function getCurrentHashValueOf(name) {
            var hashObject = this.parseHashTag(window.location.hash);
            return hashObject.getValue(name);
        }
    }, {
        key: 'getCurrentHashParameters',
        get: function get() {
            return this.parseHashTag(window.location.hash).parameters;
        }
    }]);

    return HashUtility;
})();

module.exports = HashUtility;