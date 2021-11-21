/*jshint esversion: 9*/
/* eslint-env es9 */
// 1. Template Literals

// let word1 = 'Dylan';
// let word2 = 'Israel';
// let num1 = 2;
// let num2 = 3;

// const fullName = `${num1 + num2} ${word2}`;
// let example = `${word1} ${word2}`;
// console.log(fullName);
// console.log(example);
// document.getElementById('example').innerText = example;

// 2. Destructuring objects

// const player = {
//   name: 'Lebron James',
//   club: 'LA Lakers',
//   address: {
//     city: 'Los Angeles'
//   }
// };

// console.log( player.address.city );

// const {
//   name,
//   club,
//   address: { city }
// } = player;

// console.log(`${name} plays for ${club}`);

// console.log(`${name} lives in ${city}`);

// 4. Destructuring objects challenge

// const student = {
//   name: 'Kyle',
//   age: 24,
//   projects: {
//     diceGame: 'Two player dice game using JavaScript'
//   }
// };
//
// const {
//   name,
//   age,
//   projects: { diceGame }
// } = student;
//
// console.log(`${name} is ${age} old`);

// 5. Destructuring Arrays
//
// let [firstName, middleName, lastName] = ['Dylan', 'Coding God', 'Israel'];
//
// lastName = 'Clements';
//
// console.log(lastName)

// 6. Object literal

// let [firstName, middleName, lastName] = ['Dylan', 'Coding God', 'Israel'];
//
// lastName = 'Clements';
//
// console.log(lastName)

// 7. Object literal challenge

// function addressMaker(adress) {
//   const { city, state, country } = adress;
//   const newAddress = {
//     city,
//     state,
//     country
//   };
//   console.log(`${city} ${state} ${country}`);
// }
//
// addressMaker({ city: 'Austin', state: 'Texas', country: 'USA' });

// 8. For of Loop

// let incomes = [62000, 67000, 75000];
// let total = 0;
//
// for (const income of incomes) {
//     console.log(income);
//     total += income;
// }

// console.log(total);

// 9. For of Loop Challenge

// Using the For of Loop, iterate through the array and print into the console, a message like:
// Tom lives in Lisbon

// const students = [
//   { name: 'John', city: 'New York' },
//   { name: 'Peter', city: 'Paris' },
//   { name: 'Kate', city: 'Sidney' }
// ];
//
// for (const student of students) {
//   const { name, city } = student;
//   let whereStudentLive = `${name} lives in ${city}`;
//   // console.log(whereStudentLive);
// }

// 10 Spread Operator

// let contacts = ['Mary', 'Joel', 'Danny'];
//
// let personalFriends = ['David', ...contacts, 'Lily'];
//
// contacts.push('John');
// // console.log(contacts);
// // console.log(personalFriends);
//
// let person = {
//   name: 'Adam',
//   age: 25,
//   city: 'Manchester'
// };
//
// let employee = { ...person, salary: 50000 };
// console.log(employee);

// 11 Spread Operator Challenge

/*
    **** Challenge ****

    Imagine you are going out to do some grocery shopping.
    So you have an array called shoppingList with all the products you want to buy.

    Now that you are inside of the shop, you have a basket with all the products from your list, but you want to add a few more.

    Create a new array called shoppingBasket, that will be a copy of the shoppingList array, and add some new products into it.

*/

// const shoppingList = ['eggs', 'milk', 'butter'];
// let shoppingBasket = [...shoppingList, 'apple'];
// console.log(shoppingBasket);

// 12 Rest Operator

// function add(...nums) {
//   console.log(nums);
// }
//
// add(4, 5, 7, 8, 12);

// 13. Arrow Functions

//function declaration
// function breakfastMenu() {
//   return "I'm going to scrambled eggs for breakfast";
// }
//
// //anonymous function
// const lunchMenu = function() {
//   return "I'm going to eat pizza for lunch";
// };
//
// const menu = (...foods) => console.log(`I'm going to eat${foods} for lunch`);
//
// menu(' chicken', ' apple');

// 14. Default params

// const leadSinger = (artist = 'Chris Martin') => {
//   console.log(`${artist} is the lead singer of Cold Play`);
// };
//
// leadSinger();
// leadSinger('Tom Hanks');

// 15. Default params Challenge

/*
**** Challenge *****

Create a function that receives a parameter of food.
If your parameter food is going to have a value of "milk"
the function should print into the console the following:

"I'm going to buy milk from the grocery shop"

But if you dont pass a value to your parameter food, it should print
"I'm going to buy something from the grocery shop"

*/

// const whatIbuy = (food = 'something') =>
//   console.log(`I'm going to buy ${food} from the grocery shop`);
//
// whatIbuy();
// whatIbuy('milk');

// 16. Includes

// let numArray = [1,2,3,4,5];
//
// console.log(numArray.includes(0))

// 16. Includes Challenge

/*
 ** includes() Challenge
 * You want to make a chocolate cake
 * And you have a list of ingredients represented with an array
 * Using the JavaScript includes() function
 * Check if you have the ingredient chocolate in your list of ingredients, and print into the console "We are going to make a chocolate cake" if you have it
 * Else print into the console "We can't make a chocolate cake because we are missing the ingredient chocolate"
 */

// const listIngredients = ['flour', 'sugar', 'eggs', 'butter'];
//
// const canWeMakeChocolateCake = ingredients => {
//   if (ingredients.includes('chocolate')) {
//     console.log('We are going to make a chocolate cake');
//   } else
//     console.log(
//       "We can't make a chocolate cake because we are missing the ingredient chocolate"
//     );
// };
//
// canWeMakeCake(listIngredients);

// 17. Let & Const

// if (false) {
//   var example = 5;
// }
//
// console.log(example);
//
// /*
// var example;
//
// if (false) {
//     example = 5;
// }
//
// */
//
// const example = [];
// example.push(5);
// console.log(example);

// 18. Import and Export

// import { data } from './example.js';
// let updatedData = data;
//
// data.push(5)
// console.log(data);

// 19. Import and Export Challenge

// **Challenge**
//
// Inside of the file data.js, create a function add, that will receive 2 numbers and return the sum of them.
// Make sure to export this function.
//
// - Import the function add, into the index.js file
// - Create a variable result, that will hold the result of the function add when you call it and pass 2 numbers into it.
// - print into the console the value of the variable result;

// export const add = (num1, num2) => {
//     return num1 + num2;
// }
//
// import { add } from './data.js';
//
// let result = add(3, 2);
//
// console.log(result);

// 20. padStart() & padEnd()

// let example = 'Dylan';
//
//
//
// console.log(example.padEnd(10, 'a'));

// 21.  padStart() & padEnd() Challenge

// let example = 'YouTube.com/CodingTutorials360';

// console.log(example.padStart(100));
// console.log(example.padEnd(1));

// 22. Classes

// class Animal {
//   constructor(type, legs) {
//     this.type = type;
//     this.legs = legs;
//   }
//
//   makeNoise(sound = 'Loud Noise') {
//     console.log(sound);
//   }
//
//   get metaData() {
//     return `Type: ${this.type}, Legs: ${this.legs}`;
//   }
//
//   static return10() {
//     return 10;
//   }
// }
// let cat = new Animal('Cat', 4);
//
// console.log(cat.metaData);

// 22. Classes Challenge

// Create a class Player with the following:
// - Add a Name and Country properties
// - Add a function that when it runs should print into the console ("Messi was born in Argentina");
// - Make sure to adapt this function to receive dynamic Names and Clubs.
//
// Create a Subclass called TennisPlayer that extends from the class Player
// - Add a new property Age.
// - Add a function that when it runs should print into the console something similar ("Rafael Nadal is 34 years old and knows how to play Tennis");
// - Make sure the Name and Age are dynamic.

// class Player {
//   constructor(name, country) {
//     this.name = name;
//     this.country = country;
//   }
//   whereBorn() {
//     console.log(`${this.name} was born in ${this.country}`);
//   }
// }
//
// let messi = new Player('Messi', 'Argentina');
// console.log(messi.whereBorn());
//
// class TennisPlayer extends Player {
//   constructor(name, country, age, discipline) {
//     super(name, country);
//     this.age = age;
//     this.discipline = discipline;
//   }
//   whatKnowPlayer() {
//     console.log(
//       `${this.name} is ${this.age} old and knows how to play ${this.discipline}`
//     );
//   }
// }
//
// let Nadal = new TennisPlayer('Rafael Nadal', 'Spain', '34', 'tenis');
//
// console.log(Nadal.whatKnowPlayer());

// 23. Trailling Commas

// function add(param1,){
//     const example = {
//         name: 'Dylan',
//     };
//
//     console.log(example)
// };
//
// add(2);
