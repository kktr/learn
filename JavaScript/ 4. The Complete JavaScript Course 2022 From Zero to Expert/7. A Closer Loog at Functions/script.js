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

// 10/135 Coding Challenge 1

/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favorite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what should the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/

const pollBtnEl = document.getElementById('btn-poll');

const poll = {
  question: 'What is your favorite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section 😃
  answers: new Array(4).fill(0),

  registerNewAnswer() {
    const answer = prompt(`What is your favorite programming language?
    0: JavaScript
    1: Python
    2: Rust
    3: C++
    (Write option number)`);

    if (answer >= 0 && answer <= 3) {
      console.log(poll.answers);
      this.answers[answer]++;
      return this.displayResults();
    } else {
      alert('Write option number, 0, 1, 2 or 3');
      return this.registerNewAnswer();
    }
  },

  displayResults(type = 'string') {
    const answersArr = [...this.answers];
    const answersStr = [answersArr.join(', ')];

    type === 'string'
      ? console.log(`Poll results are ${answersStr}`)
      : type === 'array'
      ? console.log(this.answers)
      : console.log('wrong DisplayResults type, chose string or array');
  },
};

pollBtnEl.addEventListener('click', poll.registerNewAnswer.bind(poll));

poll.displayResults.call({ answers: [5, 2, 3] }, 'array');
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }, 'array');
