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
  console.log(`Orginal string: ${str} `);
  console.log(`Transformed string: ${fn(str)}`);

  console.log(`Transformed by: ${fn.name}`);
};

transformer('JavaScript is the best!', upperFirstWord);
transformer('JavaScript is the best!', oneWord);

// JS uses callback all the time
const high5 = function () {
  console.log('🙏');
};

document.body.addEventListener('click', high5);
