/*jshint esversion: 6*/
/* eslint-env es6 */

'use strict';

// Scoping in Practice
function calcAge(birthYear) {
  const age = 2037 - birthYear;
  let output2 = 'output2';

  function printAge() {
    const output = `${firstName} ${age}, born in ${birthYear}`;
    console.log(output);
  }

  if (birthYear >= 1981 && birthYear <= 1996) {
    // const firstName = 'Steven';/*  */
    // var millennial = true;
    const str = `Oh, and you're a millennial, ${firstName}`;
    console.log(str);

    //   function add(a, b) {
    //     return a + b;
    //   }

    //  Creating NEW variable with same name as outer scope's variable
    const age = 3000;

    // Reassigning outer scope's variable
    output2 = 'changed output2';
  }
  // work only without use strict
  // console.log(add(2, 3));

  // out off scope
  // console.log(str);
  // console.log(millennial);

  console.log(output2);

  printAge();

  return age;
}

const firstName = 'Jonas';

console.log(calcAge(2000));

// console.log(age);
// printAge();
// console.log(millennial);

// 2. Hoisting in practice

// console.log(me);
// console.log(teacher);
// console.log(year);

var me = 'Jonas';
let job = 'teacher';
const year = 1991;

// Functions
console.log(addDec(1, 1));
// console.log(addExpr(3,3));
// console.log(addArrow(2,2));

function addDec(a, b) {
  return a + b;
}

var addExpr = function (a, b) {
  return a + b;
};

const addArrow = (a, b) => a + b;

var x = 1;
let y = 2;
const z = 3;

console.log(x === window.x); // true in browser
console.log(y === window.y);
console.log(z === window.z);

// 3. The this keyword

const jonas = {
  firstName: 'Jonas',
  year: 1991,

  calcAge: function () {
    console.log(this);

    // in arrow function this is isMillennial parent this = jonas
    const isMillennial = () => {
      console.log(this.year >= 1981 && this.year <= 1996);
    };

    isMillennial();
  },

  greet: () => console.log(`Hey ${this.firstName}`),
};

jonas.calcAge(); //this is jonas because jonas calling calcAge method

const matilda = {
  firstName: 'Matilda',
  year: 2017,
};

// matilda.calcAge = jonas.calcAge;
// matilda.calcAge();

// this.firstName is undefined because this in arrow function use parent this
//  word, and in strict mode this word for jonas is undefined
// console.log(jonas.calcAge());

// 4. arguments keyword
const addExpr2 = function (a, b) {
  console.log(arguments);
  return a + b;
};

addExpr2(1, 1);
addExpr2(11, 22, 33);

let addArrow2 = (a, b) => {
  // arguments is not defined in arrow function
  // console.log(arguments);
  return a + b;
};

addArrow2(100, 200);

// 5. Primitives vs Objects

let age = 30;
let oldAge = age;
age = 31;
console.log(age);
console.log(oldAge);

const me2 = {
  name: 'jonas',
  age: 30,
};

const friend = me2;
friend.age = 20;

console.log(friend.age);
console.log(me2.age);

// 6. Coping Objects

const jessica2 = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
  family: ['Alice', 'Bop'],
};

// it's not deep copy, .family points at the same object in the memory  heap
const jessicaCopy = Object.assign({}, jessica2);

// it works only for first level deep
jessicaCopy.lastName = 'Davis';
console.log(jessica2.lastName);
console.log(jessicaCopy.lastName);

jessicaCopy.family.push('Mary');
jessicaCopy.family.push('John');
// push only to jessicaCopy, but family in jessicaCopy and jessica2 is reference
//  to this same object
console.log(`before marriage: ${jessica2.family}`);
console.log(`after marriage: ${jessicaCopy.family}`);
