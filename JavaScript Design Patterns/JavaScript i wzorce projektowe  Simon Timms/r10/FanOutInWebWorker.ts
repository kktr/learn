module Westeros.Potion{
  export class Ingredient{
    Name: string;
    Quantity: number;
  }

  export class CombinedIngredient{
    Add(ingredient: Ingredient){

    }
  }
}

var combinedIngredient;
self.addEventListener('message', function(e) {
  var data = e.data;
  var ingredients = data.ingredients;
  combinedIngredient = new Westeros.Potion.CombinedIngredient();
  for(var i = 0; i< ingredients.length; i++)
  {
    combinedIngredient.Add(ingredients[i]);
  }
  console.log("Łączenie obliczeń");
  setTimeout(combinationComplete, 2000);
}, false);

function combinationComplete(){
  console.log("Ukończono łączenie");
  (<any>self).postMessage({event: 'combinationComplete', result: combinedIngredient});
}
