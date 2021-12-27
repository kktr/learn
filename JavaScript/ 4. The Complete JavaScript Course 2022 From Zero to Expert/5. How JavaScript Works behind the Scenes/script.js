/*jshint esversion: 6*/
/* eslint-env es6 */

'use strict';

// Scoping in Practice
function calcAge(birthYear) {
  const age = 2037 - birthYear;

  function printAge() {
    const output = `${firstName} ${age}, born in ${birthYear}`;
    console.log(output);
  }

  if (birthYear >= 1981 && birthYear <= 1996) {
    // var millennial = true;
    const str = `Oh, and you're a millennial, ${firstName}`;
    console.log(str);

    //   function add(a, b) {
    //     return a + b;
    //   }
  }

  // add(2, 3);
  // console.log(str);
  // console.log(millennial);
  printAge();

  return age;
}

const firstName = 'Jonas';

console.log(calcAge(1991));

// console.log(age);
// printAge();
// console.log(millennial);
