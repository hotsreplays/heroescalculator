var HeroesApp;
(function (HeroesApp) {
    "use strict";
    angular.module("HeroesApp", ["ngRoute", "ui.bootstrap"]);
    HeroesApp.getModule = function () {
        return angular.module("HeroesApp");
    };
    var app = HeroesApp.getModule();
})(HeroesApp || (HeroesApp = {}));
//# sourceMappingURL=App.js.map