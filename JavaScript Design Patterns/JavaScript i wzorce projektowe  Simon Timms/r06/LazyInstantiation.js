var Westeros;
(function (Westeros) {
    var FoodSuppliers;
    (function (FoodSuppliers) {
        class Bakery {
            constructor() {
                this.requiredBreads = [];
            }
            orderBreadType(breadType) {
                this.requiredBreads.push(breadType);
            }
            pickUpBread(breadType) {
                console.log("Zgłoszono odbiór chleba typu: " + breadType + ".");
                if (!this.breads) {
                    this.createBreads();
                }
                for (var i = 0; i < this.breads.length; i++) {
                    if (this.breads[i].breadType == breadType)
                        return this.breads[i];
                }
            }
            createBreads() {
                this.breads = [];
                for (var i = 0; i < this.requiredBreads.length; i++) {
                    this.breads.push(new Bread(this.requiredBreads[i]));
                }
            }
        }
        FoodSuppliers.Bakery = Bakery;
        class Bread {
            constructor(breadType) {
                this.breadType = breadType;
                //złożona i czasochłonna operacja
                console.log("Przygotowano chleb typu: " + breadType + ".");
            }
        }
        FoodSuppliers.Bread = Bread;
    })(FoodSuppliers = Westeros.FoodSuppliers || (Westeros.FoodSuppliers = {}));
})(Westeros || (Westeros = {}));
var bakery = new Westeros.FoodSuppliers.Bakery();
bakery.orderBreadType("Brioszka");
bakery.orderBreadType("Chleb Anadama");
bakery.orderBreadType("Ćapati");
bakery.orderBreadType("Focaccia");
console.log(bakery.pickUpBread("Brioszka").breadType + " – odebrano.");
