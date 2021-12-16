module Westeros.Food{

	export class BasicBeer{
		public Create(){
			this.AddIngredients();
			this.Stir();
			this.Ferment();
			this.Test();
			if(this.TestingPassed())
			{
				this.Distribute();
			}

		}

		AddIngredients(){
			throw "Dodaj składniki, które mają zostać zaimplementowane.";
		}

		Stir(){
			// zamieszaj 15 razy drewnianą łyżką
		}

		Ferment(){
			// odstaw na 30 dni
		}

		Test(){
			// odlej kufel piwa i skosztuj
		}

		TestingPassed(){
			throw "Wymagane do zaimplementowania warunki udanej próby."
		}

		Distribute(){
			// umieść piwo w 50-litrowych beczkach
		}
	}

	export class RaspberryBeer extends BasicBeer
	{
		AddIngredients()
		{
			// dodaj składniki, które prawdopodobnie obejmują maliny
		}

		TestingPassed()
		{
			// piwo musi być czerwonawe i mieć smak malinowy
		}
	}
}