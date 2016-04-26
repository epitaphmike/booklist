"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ResponsiveNotifier = (function () {
    function ResponsiveNotifier(cb) {
        _classCallCheck(this, ResponsiveNotifier);

        this.notifySize = function notifySize() {
            if (ResponsiveBootstrapToolkit.is("xs")) {
                cb('xs');
            }

            if (ResponsiveBootstrapToolkit.is("sm")) {
                cb('sm');
            }

            if (ResponsiveBootstrapToolkit.is("md")) {
                cb('md');
            }

            if (ResponsiveBootstrapToolkit.is(">md")) {
                cb('lg');
            }
        };

        $(window).on('resize', this.notifySize);
        this.notifySize();
    }

    _createClass(ResponsiveNotifier, [{
        key: "dispose",
        value: function dispose() {
            $(window).off('resize', this.notifySize);
        }
    }]);

    return ResponsiveNotifier;
})();

module.exports = ResponsiveNotifier;