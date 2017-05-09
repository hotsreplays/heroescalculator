module HeroesApp {
    "use strict";
    var app = getModule();
    class HeroCalculator {
        static $inject: string[] = ["$uibModal","$http","$sce"];
        private lvl: number = 1;
        private ClassFilter: string;
        private sortType: string = "Name";
        private sortReverse: boolean = false;
        private heroList: Hero[];
        private Message: string;
        private $sce: ng.ISCEService;

        public change(): void {
            this.heroList.forEach(x => x.lvl = (this.lvl - 1));
            this.heroList.forEach(x => x.WeaponMin.lvlChange(this.lvl - 1));
            this.heroList.forEach(x => x.BurstTooltip = this.getTooltip(x));
            this.heroList.forEach(x => x.TalentTreeArray.forEach(t =>
                t.HtmlToolTip = this.$sce.trustAsHtml(t.Text)));
        }

        public getTooltip(x: Hero): string {
            var table = "<table>" +
                "<tr><td>Attack DPS</td>" + "<td style='padding-left:10px;'>" + x.WeaponMin.DPS.toFixed(2) + "</td></tr>" +
                "<tr><td>" + x.Skill_Q.Name + "</td>" + "<td>0</td></tr>" +
                "<tr><td>" + x.Skill_W.Name + "</td>" + "<td>0</td></tr>" +
                "<tr><td>" + x.Skill_E.Name + "</td>" + "<td>0</td></tr>" +
                "<tr><td>Total</td>" + "<td>0</td></tr>" +
                "</table>";
            return this.$sce.trustAsHtml(table);
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

        constructor(private $uibModal: ng.ui.bootstrap.IModalService, private $http: ng.IHttpService, $sce: ng.ISCEService) {
            this.$sce = $sce;
            $http.get("/herodata.json").then((result) => {
                this.Message = "Successfully pulled data!";
                var data = <Hero[]>result.data;
                this.heroList = data.map((x) => {
                    return new Hero(x, $sce);
                });
            }).catch((error) => {
                this.Message = "Error pulling data!";
            });
        }

        public deleteModal(hero: Hero): void {
            this.$uibModal.open({
                templateUrl: "modal.html",
                controller: "HeroDetails",
                controllerAs: "vm",
                resolve: {
                    hero: () => { return hero; },
                    $sce: () => { return this.$sce; }
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
        static $inject: string[] = ["$uibModalInstance", "hero", "$sce"];
        private Title: string;
        private boxyText: string = "test body something";
        private active: boolean = false;
        private lvl1: string;
        private lvl4: string;
        private lvl7: string;
        private lvl10: string;
        private lvl13: string;
        private lvl16: string;
        private lvl20: string;
        private $sce: ng.ISCEService;

        constructor(private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance, private hero:Hero, $sce: ng.ISCEService) {
            this.Title = hero.Name;
            this.$sce = $sce;
        }

        public reset(talents: Talent[]): void {
            talents.forEach(x => x.active = false);
            this.lvl1 = '';
            this.lvl4 = '';
            this.lvl7 = '';
            this.lvl10 = '';
            this.lvl13 = '';
            this.lvl16 = '';
            this.lvl20 = '';
        }

        public select(talent: Talent, talents: Talent[]): void {
            talent.active = !talent.active;
            //var obj = talents.filter(x => x.lvl == talent.lvl);
            talents.filter(x => x.Tier == talent.Tier && x.Name !== talent.Name).forEach(x => x.active = false);
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
        }

    }
    app.controller("HeroDetails", HeroDetails);
}

class Hero {
    readonly Name: string;
    public lvl: number = 0;
    public Role: string;
    get CSS(): string {
        return this.Role === "Support" ? "success" : this.Role === "Warrior" ? "warning" : this.Role === "Damage" ? "danger" : this.Role === "Specialist" ? "info" : "active";
    }

    readonly BaseLife: number;
    get Health(): number { return this.lvl > 0 ? (this.BaseLife * Math.pow((1 + this.BaseLifeScale), this.lvl)) : this.BaseLife; }
    public BaseLifeScale: number;

    readonly BasseLifeRegen: number;
    get HealthRegen(): number { return this.lvl > 0 ? (this.BasseLifeRegen * Math.pow((1 + this.BaseLifeRegenScale), this.lvl)) : this.BasseLifeRegen; }
    public BaseLifeRegenScale: number;

    public EnergyType: string;
    get EnergyLabel(): string { return this.EnergyType == null ? "": this.EnergyType.charAt(0); }

    readonly BaseMana: number;
    get Mana(): number { return this.lvl > 0 ? (this.BaseMana + (this.lvl * this.BaseManaScale)) : this.BaseMana; }
    public BaseManaScale: number;

    readonly BaseManaRegen: number;
    get ManaRegen(): number { return this.lvl > 0 ? (this.BaseManaRegen +(this.lvl * this.BaseManaRegenScale)) : this.BaseManaRegen; }
    public BaseManaRegenScale: number;
    
    public Skill_Q: Ability;
    public Skill_W: Ability;
    public Skill_E: Ability;
    //private skillR: Skill;
    get skillR(): Skill {
        //this.Talents.filter(x => x.lvl == 10 && x.active).map();
        return new Skill("Emerald Wind", 120, 60, "Skill Description");
    }
    public BurstTooltip: string;
    //get BurstTooltip(): string {
    //    return this.$sce.trustAsHtml("Calculated <b> Burst </b> Damage");
    //}
    get BurstDamage(): BurstDamage {
        return new BurstDamage(this.WeaponMin, this.Skill_Q, this.Skill_W, this.Skill_E, this.$sce);
    }

    public WeaponMin: Weapon;
    get DPS(): number { return this.lvl > 0 ? (this.WeaponMin.DPS * Math.pow((1 + this.WeaponMin.Scale), this.lvl)) : this.WeaponMin.DPS; }

    public ArmorPhysical: Armor;
    public ArmorSpell: Armor;

    public TalentTreeArray: Talent[];

    private $sce: ng.ISCEService;

    static $inject: string[] = ["json", "$sce"];

    constructor(json: Hero, $sce: ng.ISCEService) {
        this.$sce = $sce;
        this.Name = json.Name;
        this.Role = json.Role;
        this.BaseLife = json.BaseLife;
        this.BaseLifeScale = json.BaseLifeScale;
        this.BasseLifeRegen = json.BasseLifeRegen;
        this.BaseMana = json.BaseMana;
        this.BaseManaRegen = json.BaseManaRegen;
        this.EnergyType = json.EnergyType;
        this.BaseLifeRegenScale = json.BaseLifeRegenScale;
        this.BaseManaScale = json.BaseManaScale;
        this.BaseManaRegenScale = json.BaseManaRegenScale;
        this.WeaponMin = new Weapon(json.WeaponMin);
        this.ArmorPhysical = new Armor(json.ArmorPhysical);
        this.ArmorSpell = new Armor(json.ArmorSpell);
        this.Skill_Q = new Ability(json.Skill_Q);
        this.Skill_W = new Ability(json.Skill_W);
        this.Skill_E = new Ability(json.Skill_E);
        var table = "<table>" +
            "<tr><td>Attack DPS</td>" + "<td style='padding-left:10px;'>"+this.WeaponMin.DPS.toFixed(2)+"</td></tr>" +
            "<tr><td>" + this.Skill_Q.Name + "</td>" + "<td>0</td></tr>" +
            "<tr><td>" + this.Skill_W.Name + "</td>" + "<td>0</td></tr>" +
            "<tr><td>" + this.Skill_E.Name + "</td>" + "<td>0</td></tr>" +
            "<tr><td>Total</td>" + "<td>0</td></tr>" +
            "</table>";
        this.BurstTooltip = $sce.trustAsHtml("Calculated <b> Burst </b> Damage</br>" + table);

        this.TalentTreeArray = json.TalentTreeArray.map((x) => {
            return new Talent(x);
        });
    }
}

class BurstDamage {
    public ToolTip: string;
    public DamageAttack: number;
    public DamageQ: number;
    public DamageW: number;
    public DamageE: number;

    constructor(Atk: Weapon, Q: Ability, W: Ability, E: Ability, $sce:ng.ISCEService) {
        this.DamageAttack = Atk.DPS;
        this.ToolTip = $sce.trustAsHtml("Calculated <b>Burst</b> Damage");
    }
}

class Skill {
    readonly Name: string;
    readonly Mana: number;
    readonly Cooldown: number;
    private Description: string;

    constructor(Name: string, Mana: number, Cooldown: number, Description: string) {
        this.Name = Name;
        this.Mana = Mana;
        this.Cooldown = Cooldown;
        this.Description = Description;
    }
}

class Weapon {
    public Range: number;
    public AtkSec: number;
    private _Damage: number;
    get Damage(): number { return this.lvl > 0 ? (this._Damage * Math.pow((1 + this.Scale), this.lvl)) : this._Damage; }
    public AtkCount: number;
    public Scale: number;
    private lvl: number;
    get DPS(): number { return (this.Damage * this.AtkSec) * this.AtkCount; }
    get multiply(): boolean { return this.AtkCount > 1 ? true: false; }

    constructor(json: Weapon) {
        this.AtkSec = json.AtkSec;
        this._Damage = json.Damage;
        this.Range = json.Range;
        this.AtkCount = json.AtkCount;
        this.Scale = json.Scale;
    }

    public lvlChange(lvl: number): void {
        this.lvl = lvl;
    }
}

class Armor {
    public ArmorSet: string;
    public Type: string;
    public Value: number;
    get Show(): boolean { return this.Value > 0 ? true : false; }

    constructor(json: Armor) {
        this.ArmorSet = json.ArmorSet;
        this.Type = json.Type;
        this.Value = json.Value;
    }
}

class Ability {
    public Name: string;

    constructor(json: Ability) {
        this.Name = json.Name;
    }
}

class Talent {
    public Name: string;
    public Text: string;
    public ToolTip: string;
    public Tier: number;
    public Column: number;
    public Icon: string;
    public active: boolean = false;
    get Img(): string { return "Images/Talents/" + this.Icon; }
    public HtmlToolTip: string;

    constructor(json: Talent) {
        this.Name = json.Name;
        this.Text = json.Text;
        this.ToolTip = json.ToolTip;
        this.Tier = json.Tier;
        this.Column = json.Column;
        this.Icon = json.Icon;
    }
}
