/*jshint esversion: 11*/
/* eslint-env es12 */

'use strict';

// 10/126 Section Intro
// 10/127 Section Roadmap

// 10/128 Default

const bookings = [];

const createBooking = function (flightNum, numPassengers = 1, price = 199) {
  // ES5
  // numPassengers = numPassengers || 1
  // price = price || 199

  const booking = {
    flightNum,
    numPassengers,
    price,
  };

  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123');

// 129 How Passing Arguments Works: Value vs. Reference

const flight = 'LH234';
const jonas = {
  name: 'Jonas Schmedtmann',
  passport: 235448789354,
};

const checkIn = function (flightNum, passenger) {
  flightNum = 'LH999';
  passenger.name = 'Mr.' + passenger.name;

  if (passenger.passport === 235448789354) {
    alert('Checked in');
  } else {
    alert('Wrong passport!');
  }
};

checkIn(flight, jonas);
// flight doesn't change
console.log(flight);
// name changes
console.log(jonas);

// Is the same as doing
// const flightNum = flight;
// const passenger = jonas;

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 1000000000);
};

newPassport(jonas);
checkIn(flight, jonas);

console.log(jonas);

// 10/130 First Class and Higher Order Functions

// 10/131 Functions Accepting Callback Functions

const oneWord = function (str) {
  console.log(str.replace(/ /g, '').toLowerCase());
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

// Higher order function
const transformer = function (str, fn) {
  console.log(`Original string: ${str} `);
  console.log(`Transformed string: ${fn(str)}`);

  console.log(`Transformed by: ${fn.name}`);
};

transformer('JavaScript is the best!', upperFirstWord);
transformer('JavaScript is the best!', oneWord);

// JS uses callback all the time
const high5 = function () {
  // console.log('🙏');
};

document.body.addEventListener('click', high5);

// 10/132 Functions Returning Functions

const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greeterHey = greet('Hey');
greeterHey('Jonas');
greeterHey('Steven');

greet('Hello')('Jonas');

const greet2 = (greeting) => (name) => {
  console.log(`${greeting} ${name}`);
};

const greeterHey2 = greet2('Hey');
greeterHey2('Jack');

// 10/133 The call and apply Methods

const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],

  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );

    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

lufthansa.book(239, 'Jonas Schmedtmann');
lufthansa.book(635, 'John Smith');
console.log(lufthansa);

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

lufthansa.book.call(eurowings, 999, 'Jack');
console.log(eurowings);

const book = lufthansa.book;

// Does NOT work
// book(23, 'Sarah Williams')

book.call(eurowings, 23, 'Sarah Williams');
console.log(eurowings);

const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: [],
};

book.call(swiss, 583, 'George Cooper');

// Apply method (not used in modern JS)
const flightData = [583, 'George Cooper'];
book.apply(swiss, flightData);
console.log(swiss);

// Modern method
book.call(swiss, ...flightData);
console.log(swiss);

// 10/134 the bind Method

const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(lufthansa);

bookEW(23, 'Steven Williams');

const bookEW23 = book.bind(eurowings, 23);
bookEW23('Jonas Schmedtmann');
bookEW23('Martha Cooper');

// With Event Listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);

  this.planes++;
  console.log(this.planes);
};

// need bind to have proper this keyword, without bind this = button
document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// Partial application

const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

// set this to null, add rate = 0.23
const addVAT = addTax.bind(null, 0.23);

// call only with value parameter
console.log(addVAT(100));

function addVAT2(value) {
  return addTax(0.23, value);
}

console.log(addVAT2(1000));
