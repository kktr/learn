let fruit = ["apple", "orange", "apple", "orange", "apple"]
let appleShelf = document.getElementById("apple-shelf")
let orangeShelf = document.getElementById("orange-shelf")

// Create a function that puts the apples onto the appleShelf
// and the oranges onto the orangeShelf. Use a for loop,
// a conditional statement, and the textContent property.

function sort() {
  for (var i = 0; i < fruit.length; i++) {
    if (fruit[i] == "apple") {
      orangeShelf.textContent += fruit[i] + " ";
    } else if (fruit[i] == "orange") {
      appleShelf.textContent += fruit[i] + " ";
    }
  }
}
sort();
