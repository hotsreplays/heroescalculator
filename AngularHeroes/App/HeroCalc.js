var HeroesApp;
(function (HeroesApp) {
    "use strict";
    var app = HeroesApp.getModule();
    var HeroCalculator = (function () {
        function HeroCalculator($uibModal, $http, $sce) {
            var _this = this;
            this.$uibModal = $uibModal;
            this.$http = $http;
            this.lvl = 1;
            this.sortType = "Name";
            this.sortReverse = false;
            this.$sce = $sce;
            $http.get("./herodata.json").then(function (result) {
                _this.Message = "Successfully pulled data!";
                var data = result.data;
                _this.heroList = data.map(function (x) {
                    return new Hero(x, $sce);
                });
            }).catch(function (error) {
                _this.Message = "Error pulling data!";
                console.log(_this.Message);
            }).then(function () { _this.change(); }).catch(function (error) {
                console.log("Error on change");
            });
        }
        HeroCalculator.prototype.change = function () {
            var _this = this;
            this.heroList.forEach(function (x) { return x.lvl = (_this.lvl - 1); });
            this.heroList.forEach(function (x) { return x.WeaponMin.lvlChange(_this.lvl - 1); });
            this.heroList.forEach(function (x) { return x.BurstTooltip = _this.getTooltip(x); });
            this.heroList.forEach(function (x) {
                if (x.TalentTreeArray != null) {
                    x.TalentTreeArray.forEach(function (t) {
                        return t.HtmlToolTip = _this.$sce.trustAsHtml(t.Text);
                    });
                }
            });
        };
        HeroCalculator.prototype.getTooltip = function (x) {
            var table = "<table>" +
                "<tr><td>Attack DPS</td>" + "<td style='padding-left:10px;'>" + x.WeaponMin.DPS.toFixed(2) + "</td></tr>" +
                "<tr><td>" + x.Skill_Q.Name + "</td>" + "<td>0</td></tr>" +
                "<tr><td>" + x.Skill_W.Name + "</td>" + "<td>0</td></tr>" +
                "<tr><td>" + x.Skill_E.Name + "</td>" + "<td>0</td></tr>" +
                "<tr><td>Total</td>" + "<td>0</td></tr>" +
                "</table>";
            return this.$sce.trustAsHtml(table);
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
            var _this = this;
            this.$uibModal.open({
                templateUrl: "modal.html",
                controller: "HeroDetails",
                controllerAs: "vm",
                resolve: {
                    hero: function () { return hero; },
                    $sce: function () { return _this.$sce; }
                }
            });
        };
        return HeroCalculator;
    }());
    HeroCalculator.$inject = ["$uibModal", "$http", "$sce"];
    app.controller("heroCtrl", HeroCalculator);
})(HeroesApp || (HeroesApp = {}));
(function (HeroesApp) {
    "use strict";
    var app = HeroesApp.getModule();
    var HeroDetails = (function () {
        function HeroDetails($uibModalInstance, hero, $sce) {
            this.$uibModalInstance = $uibModalInstance;
            this.hero = hero;
            this.boxyText = "test body something";
            this.active = false;
            this.Title = hero.Name;
            this.$sce = $sce;
        }
        HeroDetails.prototype.reset = function (talents) {
            talents.forEach(function (x) { return x.active = false; });
            this.lvl1 = '';
            this.lvl4 = '';
            this.lvl7 = '';
            this.lvl10 = '';
            this.lvl13 = '';
            this.lvl16 = '';
            this.lvl20 = '';
        };
        HeroDetails.prototype.select = function (talent, talents) {
            talent.active = !talent.active;
            //var obj = talents.filter(x => x.lvl == talent.lvl);
            talents.filter(function (x) { return x.Tier == talent.Tier && x.Name !== talent.Name; }).forEach(function (x) { return x.active = false; });
            switch (talent.Tier) {
                case 1:
                    talent.active ? this.lvl1 = talent.Name : '';
                    break;
                case 2:
                    talent.active ? this.lvl4 = talent.Name : '';
                    break;
                case 3:
                    talent.active ? this.lvl7 = talent.Name : '';
                    break;
                case 4:
                    talent.active ? this.lvl10 = talent.Name : '';
                    break;
                case 5:
                    talent.active ? this.lvl13 = talent.Name : '';
                    break;
                case 6:
                    talent.active ? this.lvl16 = talent.Name : '';
                    break;
                case 7:
                    talent.active ? this.lvl20 = talent.Name : '';
                    break;
                default:
                    break;
            }
        };
        return HeroDetails;
    }());
    HeroDetails.$inject = ["$uibModalInstance", "hero", "$sce"];
    HeroesApp.HeroDetails = HeroDetails;
    app.controller("HeroDetails", HeroDetails);
})(HeroesApp || (HeroesApp = {}));
var Hero = (function () {
    function Hero(json, $sce) {
        this.lvl = 0;
        try {
            this.$sce = $sce;
            // Hero Details
            this.Name = json.Name;
            this.HeroTitle = json.HeroTitle;
            this.HeroInfo = json.HeroInfo;
            this.HeroDescription = json.HeroDescription;
            this.Role = json.Role;
            // Hero Life
            this.BaseLife = json.BaseLife;
            this.BaseLifeScale = json.BaseLifeScale;
            this.BasseLifeRegen = json.BasseLifeRegen;
            this.BaseLifeRegenScale = json.BaseLifeRegenScale;
            // Hero Energy
            this.BaseMana = json.BaseMana;
            this.BaseManaRegen = json.BaseManaRegen;
            this.EnergyType = json.EnergyType;
            this.BaseManaScale = json.BaseManaScale;
            this.BaseManaRegenScale = json.BaseManaRegenScale;
            // Hero Weapons
            this.WeaponMin = new Weapon(json.WeaponMin);
            // Hero Armor
            this.ArmorPhysical = new Armor(json.ArmorPhysical);
            this.ArmorSpell = new Armor(json.ArmorSpell);
            // Hero Abilities Skills
            this.Skill_Q = new Ability(json.Skill_Q);
            this.Skill_W = new Ability(json.Skill_W);
            this.Skill_E = new Ability(json.Skill_E);
            var table = "<table>" +
                "<tr><td>Attack DPS</td>" + "<td style='padding-left:10px;'>" + this.WeaponMin.DPS.toFixed(2) + "</td></tr>" +
                "<tr><td>" + this.Skill_Q.Name + "</td>" + "<td>0</td></tr>" +
                "<tr><td>" + this.Skill_W.Name + "</td>" + "<td>0</td></tr>" +
                "<tr><td>" + this.Skill_E.Name + "</td>" + "<td>0</td></tr>" +
                "<tr><td>Total</td>" + "<td>0</td></tr>" +
                "</table>";
            this.BurstTooltip = $sce.trustAsHtml("Calculated <b> Burst </b> Damage</br>" + table);
            // Hero Talents
            this.TalentTreeArray = json.TalentTreeArray.map(function (x) {
                return new Talent(x);
            });
        }
        catch (Error) {
            console.log(json.Name + " Hero Error");
            console.error(Error);
        }
    }
    Object.defineProperty(Hero.prototype, "CSS", {
        get: function () {
            return this.Role === "Support" ? "success" : this.Role === "Warrior" ? "warning" : this.Role === "Damage" ? "danger" : this.Role === "Specialist" ? "info" : "active";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Hero.prototype, "Health", {
        get: function () { return this.lvl > 0 ? (this.BaseLife * Math.pow((1 + this.BaseLifeScale), this.lvl)) : this.BaseLife; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Hero.prototype, "HealthRegen", {
        get: function () { return this.lvl > 0 ? (this.BasseLifeRegen * Math.pow((1 + this.BaseLifeRegenScale), this.lvl)) : this.BasseLifeRegen; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Hero.prototype, "EnergyLabel", {
        get: function () { return this.EnergyType == null ? "" : this.EnergyType.charAt(0); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Hero.prototype, "Mana", {
        get: function () { return this.lvl > 0 ? (this.BaseMana + (this.lvl * this.BaseManaScale)) : this.BaseMana; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Hero.prototype, "ManaRegen", {
        get: function () { return this.lvl > 0 ? (this.BaseManaRegen + (this.lvl * this.BaseManaRegenScale)) : this.BaseManaRegen; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Hero.prototype, "skillR", {
        //private skillR: Skill;
        get: function () {
            //this.Talents.filter(x => x.lvl == 10 && x.active).map();
            return new Skill("Emerald Wind", 120, 60, "Skill Description");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Hero.prototype, "BurstDamage", {
        //get BurstTooltip(): string {
        //    return this.$sce.trustAsHtml("Calculated <b> Burst </b> Damage");
        //}
        get: function () {
            return new BurstDamage(this.WeaponMin, this.Skill_Q, this.Skill_W, this.Skill_E, this.$sce);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Hero.prototype, "DPS", {
        get: function () { return this.lvl > 0 ? (this.WeaponMin.DPS * Math.pow((1 + this.WeaponMin.Scale), this.lvl)) : this.WeaponMin.DPS; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Hero.prototype, "Burst", {
        get: function () { return this.DPS + this.Skill_Q.Damage + this.Skill_W.Damage + this.Skill_E.Damage; },
        enumerable: true,
        configurable: true
    });
    return Hero;
}());
Hero.$inject = ["json", "$sce"];
var BurstDamage = (function () {
    function BurstDamage(Atk, Q, W, E, $sce) {
        this.DamageAttack = Atk.DPS;
        this.ToolTip = $sce.trustAsHtml("Calculated <b>Burst</b> Damage");
    }
    return BurstDamage;
}());
var Skill = (function () {
    function Skill(Name, Mana, Cooldown, Description) {
        this.Name = Name;
        this.Mana = Mana;
        this.Cooldown = Cooldown;
        this.Description = Description;
    }
    return Skill;
}());
var Weapon = (function () {
    function Weapon(json) {
        this.AtkSec = json.AtkSec;
        this._Damage = json.Damage;
        this.Range = json.Range;
        this.AtkCount = json.AtkCount;
        this.Scale = json.Scale;
    }
    Object.defineProperty(Weapon.prototype, "Damage", {
        get: function () { return this.lvl > 0 ? (this._Damage * Math.pow((1 + this.Scale), this.lvl)) : this._Damage; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Weapon.prototype, "DPS", {
        get: function () { return (this.Damage * this.AtkSec) * this.AtkCount; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Weapon.prototype, "multiply", {
        get: function () { return this.AtkCount > 1 ? true : false; },
        enumerable: true,
        configurable: true
    });
    Weapon.prototype.lvlChange = function (lvl) {
        this.lvl = lvl;
    };
    return Weapon;
}());
var Armor = (function () {
    function Armor(json) {
        this.ArmorSet = json.ArmorSet;
        this.Type = json.Type;
        this.Value = json.Value;
    }
    Object.defineProperty(Armor.prototype, "Show", {
        get: function () { return this.Value > 0 ? true : false; },
        enumerable: true,
        configurable: true
    });
    return Armor;
}());
var Ability = (function () {
    function Ability(json) {
        this.Name = json.Name;
        this.Damage = json.Damage;
    }
    return Ability;
}());
var Talent = (function () {
    function Talent(json) {
        this.active = false;
        this.Name = json.Name;
        this.Text = json.Text;
        this.ToolTip = json.ToolTip;
        this.Tier = json.Tier;
        this.Column = json.Column;
        this.Icon = json.Icon;
    }
    Object.defineProperty(Talent.prototype, "Img", {
        get: function () { return "Images/Talents/" + this.Icon; },
        enumerable: true,
        configurable: true
    });
    return Talent;
}());
//# sourceMappingURL=HeroCalc.js.map