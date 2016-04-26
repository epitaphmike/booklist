'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var MongoClient = require('mongodb').MongoClient;

var DAO = (function () {
    function DAO() {
        _classCallCheck(this, DAO);
    }

    _createClass(DAO, [{
        key: 'open',
        value: function open() {
            var _this = this;

            console.log('CONNECTING');
            console.trace();
            console.log('-------------------------------------');
            var result = MongoClient.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/mongotest');

            //let result = MongoClient.connect();
            //let result = MongoClient.connect('mongodb://adam:rackis_password@olympia.modulusmongo.net:27017/puZ5iqab');
            //let result = MongoClient.connect('mongodb://root:niWina9naj@olympia.modulusmongo.net:27017/puZ5iqab?autoReconnect=true&connectTimeoutMS=60000');

            //handling error like this will keep the resulting promise in error state
            result['catch'](function (err) {
                _this.logError('Error connecting ' + err);
            });
            return result;
        }
    }, {
        key: 'confirmSingleResult',
        value: function confirmSingleResult(res) {
            var numInserted = +res.result.n;
            if (!numInserted) {
                throw 'Object not inserted';
            }
            if (numInserted > 1) {
                throw 'Expected 1 object to be inserted.  Actual ' + numInserted;
            }
        }
    }, {
        key: 'logError',
        value: function logError(err) {
            console.log(err);
        }
    }, {
        key: 'dispose',
        value: function dispose(db) {
            try {
                db.close();
            } catch (err) {} //maybe closed by error or something
        }
    }]);

    return DAO;
})();

exports['default'] = DAO;
module.exports = exports['default'];