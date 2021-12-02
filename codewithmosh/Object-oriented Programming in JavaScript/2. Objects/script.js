/*jshint esversion: 6*/
/* eslint-env es6 */

// 3. Factory Function

function createCircle1(radius) {
  return {
    radius,
    draw: function() {
      console.log('draw');
    }
  };
}

const circle1 = createCircle1(1);
circle1.draw();

// 4. Constructor Function

function Circle2(radius) {
  this.radius = radius;
  this.draw = function() {
    console.log('draw');
  };
}

// new create new object

const circle2 = new Circle2(1);

// 5. Constructor property
console.log(circle1.constructor);
console.log(circle2.constructor);

// 6. Functions are Objects

const Circle3 = new Function(
  'radius',
  `this.radius = radius;
  this.draw = function() {
    console.log('draw');
  }`
);

const circle3 = new Circle3(2);
console.log(circle3);

Circle2.call({}, 1);
Circle2.apply({}, [1, 2, 3]);

// 7. Values vs Reference Types

// Value Types - Primitives are copied by their Value
// Number, String, Boolean, Symbol, undefined
// References Types - Objects are copied by their reference
//Object, Function, Array

// 8. Adding or removing proterties

const circle4 = new Circle2(10);

circle4.location = { x: 1 };
circle4['location'] = { x: 1 };

delete circle4['location'];

// 9. Enumerating properites

for (let key in circle4) {
  if (typeof circle4[key] !== 'function') console.log(key, circle4[key]);
}

const keys = Object.keys(circle4);
console.log(keys);

if ('radius' in circle4) console.log('circle4 has a radius');

// 10. Abstraction

// hide the details and show the essentials
// Jeśli metoda używa innej metody, która nie powinna być wywoływana indywidualnie

// 11. Private Properties and Methods

function Circle5(radius) {
  this.radius = radius;

  let defaultLocation = { x: 0, y: 0 };

  let computeOptimumLocation = factor => factor * 2;

  this.draw = function() {
    computeOptimumLocation(0.1);
    console.log('draw');
  };
}

const circle5 = Circle5(10);

// 12. Getters and Setters

function Circle12(radius) {
  let defaultLocation = { x: 0, y: 0 };

  this.radius = radius;
  this.draw = function() {
    console.log('draw');
  };

  Object.defineProperty(this, 'defaultLocation', {
    get: function() {
      return defaultLocation;
    },
    set: function(value) {
      if (!value.x || !value.y) throw new Error('Invalid location');
      defaultLocation = value;
    }
  });
}

const circle12 = new Circle12(12);

console.log(circle12.defaultLocation);
circle12.defaultLocation = { x: 1, y: 2 };
console.log(circle12.defaultLocation);
// circle12.defaultLocation = 1;

// Exercise - Stop Watch

function Sw() {
  let startTime;
  let endTime;
  let duration = 0;
  let isStarted = false;

  const msToTime = function(s) {
    // Pad to 2 or 3 digits, default is 2
    function pad(n, z) {
      z = z || 2;
      return ('00' + n).slice(-z);
    }

    let ms = s % 1000;
    s = (s - ms) / 1000;
    let secs = s % 60;
    s = (s - secs) / 60;
    let mins = s % 60;
    let hrs = (s - mins) / 60;

    return pad(hrs) + ':' + pad(mins) + ':' + pad(secs) + '.' + pad(ms, 3);
  };

  this.start = function() {
    if (isStarted) {
      throw new Error('StopWatch has already started');
    }
    startTime = new Date().getTime();
    isStarted = true;
    console.log('start');
  };

  this.stop = function() {
    if (!isStarted) {
      throw new Error('Stopwatch is not started');
    }
    endTime = new Date().getTime();
    isStarted = false;
    console.log('stop');
    this.duration = msToTime(endTime - startTime);
  };

  this.reset = function() {
    startTime = null;
    endTime = null;
    isStarted = false;
    this.duration = 0;
  };

  Object.defineProperty(this, 'duration', {
    get: function() {
      return duration;
    },
    set: function(value) {
      duration = value;
    }
  });
}

const stopwatch = new Sw();
