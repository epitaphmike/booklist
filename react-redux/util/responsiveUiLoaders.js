'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ResponsiveNotifier = require('global-utils/responsiveChangeNotifier');

var responsiveBsSizes = ['xs', 'sm', 'md', 'lg'];

function responsiveMobileDesktopMixin(self, stateName, config) {
    var currentlyMobile = undefined;

    var cutoff = config.cutoff || 'sm';
    var mobileCutoffIndex = responsiveBsSizes.indexOf(cutoff);

    if (!self.state) {
        self.state = _defineProperty({}, stateName, null);
    } else {
        self.state[stateName] = null;
    }

    self.responsiveNotifier = new ResponsiveNotifier(function (val) {
        return checkSize(val);
    });

    self.switchToMobile = function () {
        this.overridden = true;
        loadComponent.call(self, config.mobile, true);
    };

    self.switchToDesktop = function () {
        this.overridden = true;
        loadComponent.call(self, config.desktop, false);
    };

    var originalComponentWillDismount = self.componentWillUnmount;
    self.componentWillUnmount = function () {
        this.responsiveNotifier.dispose();
        typeof originalComponentWillDismount === 'function' && originalComponentWillDismount.call(this);
    };

    function checkSize(currentSize) {
        if (self.overridden) return;

        var isMobile = responsiveBsSizes.indexOf(currentSize) <= mobileCutoffIndex;
        if (isMobile !== currentlyMobile) {
            currentlyMobile = isMobile;
            loadComponent(currentlyMobile ? config.mobile : config.desktop, isMobile);
        }
    }

    function loadComponent(componentObjOrPath, isMobile) {
        var componentPath = undefined,
            connectComponentWith = undefined,
            mapDispatchWith = undefined;

        if (typeof componentObjOrPath === 'object') {
            componentPath = componentObjOrPath.path;
            connectComponentWith = componentObjOrPath.connectWith;
            mapDispatchWith = componentObjOrPath.mapDispatchWith;
        } else {
            componentPath = componentObjOrPath;
        }
        System['import'](componentPath).then(function (component) {
            var _self$setState;

            if (connectComponentWith) {
                component = ReactRedux.connect(connectComponentWith, mapDispatchWith)(component);
            }
            self.setState((_self$setState = {}, _defineProperty(_self$setState, stateName, component), _defineProperty(_self$setState, 'isMobile', isMobile), _self$setState));
        });
    }
}

module.exports = { responsiveMobileDesktopMixin: responsiveMobileDesktopMixin };