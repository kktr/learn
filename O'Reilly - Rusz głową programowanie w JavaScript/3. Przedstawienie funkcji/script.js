function dogHau(name, weight) {
  if (weight > 20) {
    console.log(name + " szczeka HAU HAU");
  } else console.log(name + " szczeka hau hau");
}

/*dogHau("Burek", 23);
dogHau("Mops", 12);
dogHau("Reksio", -1);
dogHau("Saba", 17, 0);*/

function whatShallWear(temp) {
  if (temp < 15) {
    console.log("Ubierz kurtkę");
  } else if (temp < 25) {
    console.log("Ubierz sweter");
  } else console.log("Ubierz t-shirt");
}

/*whatShallWear(15);
whatShallWear(30);
whatShallWear(10);*/

function doIt(param) {
  param = 2;
}
let test = 1
doIt(test)
console.log(test);
