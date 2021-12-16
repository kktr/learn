module Westeros.Potion{
  export class Ingredient{
    Name: string;
    Quantity: number;
  }

  export class CombinedIngredient{
    Add(ingredient: Ingredient){

    }
  }

  class Step{
    Name: string;
  }

  export class Combiner{
    waitingForChunks = 0;
    combine(ingredients: Array<Ingredient> ){
      console.log("Inicjowanie łączenia");
      if(ingredients.length > 10)
      {
        for(var i = 0; i< Math.ceil(ingredients.length/2); i++){
          this.waitingForChunks++;
          console.log("Liczba wysłanych porcji dla: " + this.waitingForChunks);
          var worker = new Worker("FanOutInWebWorker.js");
          worker.addEventListener('message', (message) => this.complete(message));
          worker.postMessage({ingredients: ingredients.slice(i,i*2)});
        }
      }
    }
    complete(message){
      this.waitingForChunks--;
      console.log("Liczba zaległych porcji dla: " + this.waitingForChunks);
      if(this.waitingForChunks == 0)
        console.log("Odebrano wszystkie porcje");
    }
  }
}
