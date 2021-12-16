module Westeros.FoodSuppliers{

	export class Bakery{
		breads: Bread[];
		requiredBreads: string[];
		constructor() {
		    this.requiredBreads = [];
		}

		public orderBreadType(breadType: string){
			this.requiredBreads.push(breadType);
		}

		public pickUpBread(breadType: string):Bread{
			console.log("Zgłoszono odbiór chleba typu: " + breadType + ".")
			if(!this.breads)
			{
				this.createBreads();
			}
			for(var i=0; i<this.breads.length; i++){
				if(this.breads[i].breadType == breadType)
					return this.breads[i];
			}
		}

		createBreads(){
			this.breads = [];
			for(var i =0; i<this.requiredBreads.length; i++)
			{
				this.breads.push(new Bread(this.requiredBreads[i]));
			}
		}
	}

	export class Bread{
		constructor(public breadType: string){
			//złożona i czasochłonna operacja
			console.log("Przygotowano chleb typu: " + breadType + ".");
		}
	}
}

var bakery = new Westeros.FoodSuppliers.Bakery();
bakery.orderBreadType("Brioszka");
bakery.orderBreadType("Chleb Anadama");
bakery.orderBreadType("Ćapati");
bakery.orderBreadType("Focaccia");

console.log(bakery.pickUpBread("Brioszka").breadType);
