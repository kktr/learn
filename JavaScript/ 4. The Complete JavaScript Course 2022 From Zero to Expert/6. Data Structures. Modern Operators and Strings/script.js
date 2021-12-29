/*jshint esversion: 9*/
/* eslint-env es9 */

'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';
console.log(flights);

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 0,
    time = '20:00',
    address,
  }) {
    console.log(
      `Order received!
      ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]}
      will be delivered to ${address}
      at ${time}`
    );
  },

  orderPasta: function (ingredient1, ingredient2, ingredient3) {
    console.log(
      `Here is your delicious pasta with ${ingredient1}, ${ingredient2}, ${ingredient3}`
    );
  },

  orderPizza: function (ingredientMain, ...ingredientOthers) {
    console.log(ingredientMain);
    console.log(ingredientOthers);
    return [ingredientMain, ingredientOthers];
  },
};

restaurant.orderDelivery({
  time: '23:30',
  address: 'Via del Sole, 21',
  mainIndex: 2,
  starterIndex: 2,
});

restaurant.orderDelivery({ address: 'Via del Sole, 999' });

// Destructing Arrays

const arr = [2, 3, 4];
const a = arr[0];
const b = arr[1];
const c = arr[2];

console.log(a, b, c);

const [x, y, z] = arr;
console.log(x, y, z);
console.log(arr);

let [first, , third] = restaurant.categories;
console.log(first, third);

// Switching variables
[first, third] = [third, first];

console.log(first, third);

// return 2 values from the function by destructuring
const [starter, main] = restaurant.order(2, 0);
console.log('main: ' + main, 'starter: ' + starter);

// Destructuring nested arrays
const nested = [2, 4, [5, 6]];
const [i, , [j, k]] = nested;
console.log(i, j, k);

// Default values for array
const [p = 1, q = 1, r = 1] = [8, 9];
console.log(p, q, r);

// Destructuring objects

const { thu, fri, saturday } = restaurant.openingHours;
console.log(thu, fri, saturday);

const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;

console.log(restaurantName, hours, tags);

// Default values for object
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);

//Mutating variables
let a2 = 111;
let b2 = 999;
const obj2 = { a: 23, b: 7, c: 14 };
console.log(a2, b2);

({ a2, b2 } = obj2);
console.log(a2, b2);

// Nested objects
const {
  fri: { open: o2, close: c2 },
} = restaurant.openingHours;
console.log(o2, c2);

// 9/105 The spread operator

const arr2 = [7, 8, 9];
const arr3 = [5, 6, ...arr2, 10];
console.log(...arr3);
console.log(5, 6, 7, 8, 9, 10);

const newMenu = [...restaurant.mainMenu, 'Gnocci'];
console.log(newMenu);

// Copy array
const mainMenuCopy = [...restaurant.mainMenu];
console.log(mainMenuCopy);

// Join 2 arrays
const menu2 = [...restaurant.mainMenu, ...restaurant.starterMenu];
console.log(menu2);

// Iterables: arrays, strings, maps, sets, NOT objects
const str = 'Jonas';
const letters = [...str, '', 'J.'];
console.log(...letters);

// Real word example
const ingredients = [
  prompt("Let's make pasta! Ingredient 1?"),
  prompt('Ingredient 2?'),
  prompt('Ingredient 3'),
];

console.log(restaurant.orderPasta(...ingredients));

// Objects
const newRestaurant = { foundedIn: 1998, ...restaurant, founder: 'Thomas' };
console.log(newRestaurant);

const restaurantCopy = { ...restaurant };
restaurantCopy.name = 'Restaurante Roma';
console.log(restaurantCopy);

// 9/106 Rest pattern and parameters

// 1) Destructuring

// SPREAD, because on RIGHT side of =
const arr4 = [1, 2, ...[3, 4]];
console.log(arr4);

// REST because on the LEFT side of =
const [a3, b3, ...others] = [1, 2, 3, 4, 5];
console.log(a3, b3, others);

const [pizza, , risotto, focaccia, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza, risotto, focaccia, otherFood);

// Objects
const { sat, ...weekdays } = restaurant.openingHours;
console.log(weekdays);
console.log(sat);

const {
  mon: mon2 = 'closed',
  sat: sat2,
  ...weekdays2
} = restaurant.openingHours;
console.log(weekdays2);
console.log(sat2);
console.log(mon2);

// 2) Functions
const add = function (...numbers) {
  console.log(numbers);
  return numbers.reduce((a, b) => a + b, 0);
};

console.log(add(2, 3));
console.log(add(5, 7, 2, 6));
console.log(add(3, 4, 5, 6, 2, 5, 6, 3));

console.log(restaurant.orderPizza('mozzarella', 'basil', 'olives'));
