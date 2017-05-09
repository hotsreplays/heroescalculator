var HeroesApp;
(function (HeroesApp) {
    var HelpService = (function () {
        function HelpService($q, $http) {
            this.$q = $q;
            this.$http = $http;
        }
        HelpService.prototype.getData = function () {
            var HeroList;
            //var data = this.$http.get("").map((response: Response) => response.json())
            //    .map((obj) => new Hero("Brightwing", "Support", 1528.8, 3.19, 500, 3, 1.20, 88.4, 5.5));
            this.$http.get("").then(function (result) {
                //var dd = result.data.map((obj) => new Hero("Brightwing", "Support", 1528.8, 3.19, 500, 3, 1.20, 88.4, 5.5));
            });
            return HeroList;
        };
        HelpService.prototype.LoadHeros = function () {
            var url = "./Heroes.csv";
            var heroInfo = this._HeroInfo;
            var deffered = this.$q.defer();
            Papa.parse(url, {
                download: true,
                delimiter: ",",
                skipEmptyLines: true,
                dynamicTyping: true,
                header: true,
                complete: function (results) {
                    var p = results.data.map(function (val) {
                        return new Hero(val.Name, val.Class, val.baseHealth, val.baseHealthRegen, val.baseMana, val.baseManaRegen, val.baseAtkSpeed, val.baseDamage, val.baseRange);
                    });
                    deffered.resolve(p);
                }
            });
            return deffered.promise;
        };
        return HelpService;
    }());
    HelpService.$inject = ['$q', '$http'];
    var app = HeroesApp.getModule();
    app.service("HelpService", HelpService);
})(HeroesApp || (HeroesApp = {}));
//# sourceMappingURL=Service.js.map