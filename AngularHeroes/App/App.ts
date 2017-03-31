module HeroesApp {
    "use strict";
    angular.module("HeroesApp", ["ngRoute", "ui.bootstrap"]);

    export var getModule: () => ng.IModule = () => {
        return angular.module("HeroesApp");
    }

    var app = getModule();
}