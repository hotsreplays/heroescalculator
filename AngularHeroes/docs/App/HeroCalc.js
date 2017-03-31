var HeroesApp;
(function (HeroesApp) {
    "use strict";
    var app = HeroesApp.getModule();
    var HeroCalculator = (function () {
        function HeroCalculator($uibModal) {
            this.$uibModal = $uibModal;
            this.lvl = 1;
            this.sortType = "Name";
            this.sortReverse = false;
            this.heroList = [
                new Hero("Brightwing", "Support", 1528.8, 3.19, 500, 3, 1.20, 88.4, 5.5),
                new Hero("Malfurion", "Support", 1749.28, 3.64, 500, 3, 1.33, 69.68, 5.5),
                new Hero("Varian (Base)", "Multi", 2322, 4.84, 500, 3, 1.25, 87, 5.5),
                new Hero("Sylvanas", "Specialist", 1528.8, 3.19, 500, 3, 1.11, 88.4, 5.5),
                new Hero("Alarak", "Assassin", 1900, 3.96, 500, 3, 1.20, 140, 5.5),
                new Hero("Cassia", "Assassin", 1660, 4.00, 500, 3, 1.33, 125, 5.5),
                new Hero("Chromie", "Assassin", 1323, 2.76, 500, 3, 1.00, 73, 5.5),
                new Hero("Falstad", "Assassin", 1365, 2.84, 500, 3, 1.43, 104, 5.5),
                new Hero("Greymane", "Assassin", 1876, 3.91, 500, 3, 1.00, 140, 5.5),
                new Hero("Gul'dan", "Assassin", 1700, 3.54, 500, 3, 1.00, 60, 5.5),
                new Hero("Illidan", "Assassin", 1650, 3.44, 500, 3, 1.82, 78, 5.5),
                new Hero("Jaina", "Assassin", 1365, 2.84, 500, 3, 1.00, 60, 5.5),
                new Hero("Kael'thas", "Assassin", 1520, 3.17, 500, 3, 1.11, 65, 5.5),
                new Hero("Kerrigan", "Assassin", 1680, 3.50, 500, 3, 1.25, 120, 5.5),
                new Hero("Li-Ming", "Assassin", 1232, 2.57, 500, 3, 1.00, 63, 5.5),
                new Hero("Lunara", "Assassin", 1430, 2.98, 500, 3, 1.11, 90, 5.5),
                new Hero("Nova", "Assassin", 1350, 2.81, 500, 3, 1.00, 105, 5.5),
                new Hero("Ragnaros", "Assassin", 2000, 4.17, 500, 3, 0.83, 180, 5.5),
                new Hero("Raynor", "Assassin", 1302, 2.71, 500, 3, 1.25, 122, 5.5),
                new Hero("Samuro", "Assassin", 1650, 3.44, 500, 3, 1.67, 88, 5.5),
                new Hero("The Butcher", "Assassin", 2154, 4.49, 500, 3, 1.11, 140, 5.5),
                new Hero("Thrall", "Assassin", 1787, 3.72, 500, 3, 0.91, 165, 5.5),
                new Hero("Tracer", "Assassin", 1206, 5.02, 500, 3, 8.00, 27, 5.5),
                new Hero("Tychus", "Assassin", 1925, 4.01, 500, 3, 4.00, 44, 5.5),
                new Hero("Valeera", "Assassin", 2047, 4.27, 500, 3, 2.00, 79, 5.5),
                new Hero("Valla", "Assassin", 1273, 2.65, 500, 3, 1.67, 75, 5.5),
                new Hero("Zeratul", "Assassin", 1622, 3.38, 500, 3, 1.11, 126, 5.5),
                new Hero("Zul'jin", "Assassin", 1875, 3.90, 500, 3, 1.25, 110, 5.5),
                new Hero("Anub'arak", "Warrior", 2003, 4.17, 500, 3, 1.00, 95, 5.5),
                new Hero("Artanis", "Warrior", 2470, 5.14, 500, 3, 1.00, 111, 5.5),
                new Hero("Arthas", "Warrior", 2524, 5.26, 500, 3, 1.00, 95, 5.5),
                new Hero("Chen", "Warrior", 2550, 5.31, 500, 3, 1.11, 84, 5.5),
                new Hero("Cho'Gall", "Warrior", 2950, 6.14, 500, 3, 0.91, 130, 5.5),
                new Hero("Dehaka", "Warrior", 2434, 5.07, 500, 3, 1.11, 110, 5.5),
                new Hero("Diablo", "Warrior", 2567, 5.35, 500, 3, 0.91, 118, 5.5),
                new Hero("E.T.C.", "Warrior", 2100, 4.38, 500, 3, 1.00, 99, 5.5),
                new Hero("Leoric", "Warrior", 2468, 5.14, 500, 3, 0.77, 150, 5.5),
                new Hero("Muradin", "Warrior", 2633, 5.48, 500, 3, 1.11, 97, 5.5),
                new Hero("Johanna", "Warrior", 2179, 4.54, 500, 3, 0.91, 99, 5.5),
                new Hero("Rexxar", "Warrior", 1725, 3.59, 500, 3, 0.87, 99, 5.5),
                new Hero("Rexxar (Misha)", "Warrior", 1762, 3.67, 500, 3, 0.83, 62, 5.5),
                new Hero("Sonya", "Warrior", 2341, 4.88, 500, 3, 1.25, 88, 5.5),
                new Hero("Stitches", "Warrior", 2900, 6.04, 500, 3, 0.91, 85, 5.5),
                new Hero("Tyrael", "Warrior", 2296, 4.78, 500, 3, 1.25, 78, 5.5),
                new Hero("Varian (Taunt)", "Multi", 3019, 6.29, 500, 3, 1.25, 87, 5.5),
                new Hero("Zarya", "Warrior", 2225, 4.64, 500, 3, 4.00, 20, 5.5)
            ];
            this.message = "My level is: " + this.lvl;
        }
        HeroCalculator.prototype.change = function () {
            var _this = this;
            this.message = "My level is: " + (this.lvl - 1);
            this.heroList.forEach(function (x) { return x.lvl = (_this.lvl - 1); });
        };
        HeroCalculator.prototype.lvlChange = function (lvl) {
            this.lvl = lvl;
            this.change();
        };
        HeroCalculator.prototype.filterClass = function (filter) {
            if (this.ClassFilter === filter) {
                this.ClassFilter = '';
            }
            else {
                this.ClassFilter = filter;
            }
        };
        HeroCalculator.prototype.deleteModal = function (hero) {
            this.$uibModal.open({
                templateUrl: "modal.html",
                controller: "HeroDetails",
                controllerAs: "vm",
                resolve: {
                    hero: function () { return hero; }
                }
            });
        };
        return HeroCalculator;
    }());
    HeroCalculator.$inject = ["$uibModal"];
    app.controller("heroCtrl", HeroCalculator);
})(HeroesApp || (HeroesApp = {}));
(function (HeroesApp) {
    "use strict";
    var app = HeroesApp.getModule();
    var HeroDetails = (function () {
        function HeroDetails($uibModalInstance, hero) {
            this.$uibModalInstance = $uibModalInstance;
            this.hero = hero;
            this.boxyText = "test body something";
            this.Title = hero.Name;
        }
        return HeroDetails;
    }());
    HeroDetails.$inject = ["$uibModalInstance", "hero"];
    HeroesApp.HeroDetails = HeroDetails;
    app.controller("HeroDetails", HeroDetails);
})(HeroesApp || (HeroesApp = {}));
var Hero = (function () {
    function Hero(Name, Class, baseHealth, baseHealthRegen, baseMana, baseManaRegen, baseAtkSpeed, baseDamage, baseRange) {
        this.lvl = 0;
        this.Name = Name;
        this.Class = Class;
        this.baseHealth = baseHealth;
        this.baseHealthRegen = baseHealthRegen;
        this.baseMana = baseMana;
        this.baseManaRegen = baseManaRegen;
        this.baseAtkSpeed = baseAtkSpeed;
        this.baseDamage = baseDamage;
        this.baseRange = baseRange;
    }
    Object.defineProperty(Hero.prototype, "test", {
        get: function () { return (this.baseHealth * Math.pow(1.04, this.lvl)).toFixed(2); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Hero.prototype, "CSS", {
        get: function () {
            return this.Class === "Support" ? "success" : this.Class === "Warrior" ? "warning" : this.Class === "Assassin" ? "danger" : this.Class === "Specialist" ? "info" : "active";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Hero.prototype, "Health", {
        get: function () { return this.lvl > 0 ? (this.baseHealth * Math.pow(1.04, this.lvl)).toFixed(0) : this.baseHealth.toFixed(0); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Hero.prototype, "HealthRegen", {
        get: function () { return this.lvl > 0 ? (this.baseHealthRegen * Math.pow(1.04, this.lvl)).toFixed(2) : this.baseHealthRegen.toFixed(2); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Hero.prototype, "Mana", {
        get: function () { return this.lvl > 0 ? (this.baseMana * Math.pow(1.04, this.lvl)).toFixed(0) : this.baseMana.toFixed(0); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Hero.prototype, "ManaRegen", {
        get: function () { return this.lvl > 0 ? (this.baseManaRegen * Math.pow(1.04, this.lvl)).toFixed(2) : this.baseManaRegen.toFixed(2); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Hero.prototype, "AtkSpeed", {
        get: function () { return this.baseAtkSpeed; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Hero.prototype, "calcDamage", {
        get: function () { return this.lvl > 0 ? this.baseDamage * Math.pow(1.04, this.lvl) : this.baseDamage; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Hero.prototype, "Damage", {
        get: function () { return this.calcDamage.toFixed(2); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Hero.prototype, "DPS", {
        get: function () { return (this.calcDamage * this.AtkSpeed).toFixed(2); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Hero.prototype, "Range", {
        get: function () { return this.baseRange; },
        enumerable: true,
        configurable: true
    });
    return Hero;
}());
var Skill = (function () {
    function Skill() {
    }
    return Skill;
}());
(function (HeroesApp) {
    "use strict";
    var app = HeroesApp.getModule();
    var ModalDemoCtrl = (function () {
        function ModalDemoCtrl() {
        }
        return ModalDemoCtrl;
    }());
    app.controller("ModalDemoCtrl", ModalDemoCtrl);
})(HeroesApp || (HeroesApp = {}));
//# sourceMappingURL=HeroCalc.js.map