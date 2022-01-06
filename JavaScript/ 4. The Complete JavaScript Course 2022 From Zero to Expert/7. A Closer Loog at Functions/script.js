/*jshint esversion: 11*/
/* eslint-env es12 */

'use strict';

// 10/126 Section Intro
// 10/127 Section Roadmap

// 10/128 Default Parameters

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
