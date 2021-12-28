/*jshint esversion: 6*/
/* eslint-env es6 */

'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

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

const { thu, fri, sat } = restaurant.openingHours;
console.log(thu, fri, sat);

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

// The spread operator

const arr2 = [7, 8, 9];
const arr3 = [5, 6, ...arr2, 10];
console.log(arr3);
