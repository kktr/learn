var Westros;
(function (Westros) {
    var Buildings;
    (function (Buildings) {
        class BaseStructure {
            constructor() {
                console.log("Zbudowano strukturę");
            }
        }
        Buildings.BaseStructure = BaseStructure;
        class Castle extends BaseStructure {
            constructor(name) {
                super();
                this.name = name;
            }
            Build() {
                console.log("Zbudowano zamek: " + this.name);
            }
        }
        Buildings.Castle = Castle;
    })(Buildings = Westros.Buildings || (Westros.Buildings = {}));
})(Westros || (Westros = {}));
