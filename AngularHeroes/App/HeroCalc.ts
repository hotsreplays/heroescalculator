module HeroesApp {
    "use strict";
    var app = getModule();
    class HeroCalculator {
        static $inject: string[] = ["$uibModal"];
        private lvl: number = 1;
        private ClassFilter: string;
        private sortType: string = "Name";
        private sortReverse: boolean = false;
        private heroList: Hero[] = [
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
        private message: string = "My level is: " + this.lvl;

        public change(): void {
            this.message = "My level is: " + (this.lvl - 1);

            this.heroList.forEach(x => x.lvl = (this.lvl-1));
        }

        public lvlChange(lvl: number): void {
            this.lvl = lvl;
            this.change();
        }

        public filterClass(filter: string): void {
            if (this.ClassFilter === filter) {
                this.ClassFilter = '';
            } else {
                this.ClassFilter = filter;
            }
        }

        constructor(private $uibModal: ng.ui.bootstrap.IModalService) {
            
        }

        public deleteModal(hero: Hero): void {
            this.$uibModal.open({
                templateUrl: "modal.html",
                controller: "HeroDetails",
                controllerAs: "vm",
                resolve: {
                    hero: () => { return hero; }
                }
            });
        }
        
    }
    app.controller("heroCtrl", HeroCalculator);
}

module HeroesApp {
    "use strict";
    var app = getModule();
    export class HeroDetails {
        static $inject: string[] = ["$uibModalInstance", "hero"];
        private Title: string;
        private boxyText: string = "test body something";
        constructor(private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance, private hero:Hero) {
            this.Title = hero.Name;
            
        }

    }
    app.controller("HeroDetails", HeroDetails);
}


class Hero {
    readonly Name: string;
    public lvl: number = 0;
    public Class: string;
    get test(): string { return (this.baseHealth * Math.pow(1.04, this.lvl)).toFixed(2); }
    get CSS(): string {
        return this.Class === "Support" ? "success" : this.Class === "Warrior" ? "warning" : this.Class === "Assassin" ? "danger" : this.Class === "Specialist" ? "info" : "active";
    }

    readonly baseHealth: number;
    get Health(): string { return this.lvl > 0 ? (this.baseHealth * Math.pow(1.04, this.lvl)).toFixed(0) : this.baseHealth.toFixed(0); }

    readonly baseHealthRegen: number;
    get HealthRegen(): string { return this.lvl > 0 ? (this.baseHealthRegen * Math.pow(1.04, this.lvl)).toFixed(2) : this.baseHealthRegen.toFixed(2); }

    readonly baseMana: number;
    get Mana(): string { return this.lvl > 0 ? (this.baseMana * Math.pow(1.04, this.lvl)).toFixed(0) : this.baseMana.toFixed(0); }

    readonly baseManaRegen: number;
    get ManaRegen(): string { return this.lvl > 0 ? (this.baseManaRegen * Math.pow(1.04, this.lvl)).toFixed(2) : this.baseManaRegen.toFixed(2); }

    readonly baseAtkSpeed: number;
    get AtkSpeed(): number { return this.baseAtkSpeed; }

    readonly baseDamage: number;
    get calcDamage(): number { return this.lvl > 0 ? this.baseDamage * Math.pow(1.04, this.lvl) : this.baseDamage; }
    get Damage(): string { return this.calcDamage.toFixed(2); }
    get DPS(): string { return (this.calcDamage * this.AtkSpeed).toFixed(2); }

    readonly baseRange: number;
    get Range(): number { return this.baseRange; }

    constructor(Name: string, Class: string, baseHealth: number, baseHealthRegen: number, baseMana: number, baseManaRegen: number, baseAtkSpeed: number, baseDamage: number, baseRange:number ) {
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
}

class Skill {
    readonly Name: string;
    readonly Mana: number;
    readonly Cooldown: number;
    private Description: string;
}


module HeroesApp {
    "use strict";
    var app = getModule();
    class ModalDemoCtrl {

        

        constructor() {

        }

    }
    app.controller("ModalDemoCtrl", ModalDemoCtrl);
}