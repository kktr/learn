/*jshint esversion: 11*/
/* eslint-env es12 */

'use strict';

// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
// 10/142 Simple array methods

// SLICE return new array without changing origin array
let arr = ['a', 'b', 'c', 'd', 'e'];
console.log(arr.slice(2));
let arr2 = arr.slice(2);
console.log(arr2);
// spice from position 2 to position 3
console.log(arr.slice(2, 3));
console.log(arr.slice(-2));

// SPLICE return new array and change current array
let arr3;
console.log(arr.splice(2));
console.log(arr);
console.log((arr3 = arr.splice(-1)));
console.log(arr);
console.log(arr3);

let arr4 = ['a', 'b', 'c', 'd', 'e'];
// delete from place 3 next 2 values
console.log(arr4.splice(3, 2));
console.log(arr4);

// REVERSE change origin array
arr = ['a', 'b', 'c', 'd', 'e'];
const arr5 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr5.reverse());
console.log(arr5);

// CONCAT
const letters = arr.concat(arr5);
console.log(letters);

// JOIN
console.log(letters.join(' - '));

// 10/143 The new at method

const arr6 = [23, 11, 64];
console.log(arr6[0]);
console.log(arr6.at(0));

console.log(arr6[arr6.length - 2]);
// get first value of last element in arr
console.log(arr6.slice(-1)[0]);
console.log(arr6.at(-1));

console.log('jonas'.at(0));

//  10/144 Looping arrays forEach

const movements2 = [200, 50, -400, -650, -130, 70, 1300];

for (const movement of movements2) {
  if (movement > 0) {
    console.log(`You deposited ${movement}`);
  } else {
    console.log(`You withdrew ${Math.abs(movement)}`);
  }
}

console.log('-- for of with counter --');

for (const [index, movement] of movements2.entries()) {
  console.log(index);

  if (movement > 0) {
    console.log(`You deposited ${movement}`);
  } else {
    console.log(`You withdrew ${Math.abs(movement)}`);
  }
}

console.log('--- forEach ---');

movements2.forEach((movement, index, array) => {
  movement > 0
    ? console.log(`You deposited ${movement}`)
    : console.log(`You withdrew ${Math.abs(movement)}`);

  index === array.length - 1
    ? console.log(`${index}, it's end of array: [${array.join(', ')}]`)
    : console.log(index);
});

// if need brake use for of method

// 10/145 for Each with Maps and Sets

// Map
const currencies2 = new Map([
  ['USD', 'united States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

// first value, second key
currencies2.forEach((value, key) => {
  console.log(`${key} is shortcut for ${value}`);
});

const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);

// for Set second parameter = first parameter , third = whole set
currenciesUnique.forEach((value, value2, set) => {
  console.log(`${value}: ${value2}`);
  console.log(set);
  console.log(...set);
});

// use _ to omit parameter
currenciesUnique.forEach((value, _, set) => {
  console.log(...set);
});
