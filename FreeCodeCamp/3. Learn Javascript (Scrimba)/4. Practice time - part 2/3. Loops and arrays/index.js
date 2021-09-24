let largeCountries = ["China","India","USA","Indonesia","Pakistan"];

/* Use a for loop to log the following to the console:

The 5 largest countries in the world:
- China
- India
- United States
- Indinesia
- Pakistan
*/
let zad = "The 5 largest countries in the world: ";
  for (var i = 0; i < largeCountries.length; i++) {
    zad += "\n" + "- " + largeCountries[i];
  } console.log(zad);
