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

let summary = 0;
let sumInt = 0;
let currentAccount = '';

function display(account) {
  displayApp();
  displayWelcome(account);
  updateUI(account);
}

function updateUI(account) {
  displayMovements(account);
  displaySummary(account);
  displayBalance(account);
}

function displayApp() {
  containerApp.style.opacity = 1;
}

function displayMovements(account, sorted = false) {
  containerMovements.innerHTML = '';

  const moves = sorted
    ? account.movements.slice().sort((a, b) => a - b)
    : account.movements;

  moves.forEach((mov, i) => {
    const movType = mov > 0 ? 'deposit' : 'withdrawal';
    const movNumber = i + 1;

    const movementHtml = `<div class="movements__row">
      <div class="movements__type movements__type--${movType}">${movNumber} ${movType}</div>
      <div class="movements__date"></div>
      <div class="movements__value">${mov.toFixed(2)} €</div>
    </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', movementHtml);
  });
}

function displayWelcome(account) {
  labelWelcome.textContent = `Good Morning, ${account.owner.split(' ')[0]}`;
}

function displaySummary(account) {
  account.balance = account.movements
    .reduce((acc, cur) => acc + cur)
    .toFixed(2);

  const summaryIn = account.movements
    .filter((mov) => mov > 0)
    .reduce((acc, cur) => acc + cur)
    .toFixed(2);

  const summaryOut = summary - summaryIn;

  sumInt = account.movements
    .filter((mov) => mov > 0)
    .map((mov) => (mov * account.interestRate) / 100)
    .filter((mov) => mov > 1)
    .reduce((acc, cur) => acc + cur)
    .toFixed(2);

  labelSumIn.textContent = `${summaryIn} €`;
  labelSumOut.textContent = `${summaryOut} €`;
  labelSumInterest.textContent = `${sumInt} €`;
}

function displayBalance(account) {
  labelBalance.textContent = `${account.balance} €`;
}

function getUsername(user) {
  return user
    .split(' ')
    .map((word) => word.at(0))
    .join('')
    .toLocaleLowerCase();
}

function createUsernames(accounts) {
  accounts.forEach((account) => {
    account.username = getUsername(account.owner);
  });
}

function setCurrentAccount() {
  const user = inputLoginUsername.value;
  currentAccount = accounts.find(({ username }) => username === user);
}

function isPinCorrect() {
  return currentAccount?.pin === Number(inputLoginPin.value);
}

function clearInput() {
  inputLoginUsername.value = inputLoginPin.value = '';
  inputLoginPin.blur();
}

createUsernames(accounts);

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  setCurrentAccount();

  if (isPinCorrect()) {
    display(currentAccount);
  }

  clearInput();
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const receiver = accounts.find(
    ({ username }) => username === inputTransferTo.value
  );
  const amount = Number(inputTransferAmount.value);

  if (
    receiver &&
    isBiggerThanZero(amount) &&
    hasEnoughMoney(currentAccount, amount) &&
    !isTransferToHimself(receiver, currentAccount)
  ) {
    currentAccount.movements.push(-amount);
    receiver.movements.push(amount);

    updateUI(currentAccount);
  }

  inputTransferTo.value = inputTransferAmount.value = '';
  inputTransferAmount.blur();
});

function isBiggerThanZero(x) {
  return x > 0;
}

function hasEnoughMoney(currentAccount, amount) {
  return currentAccount.balance >= amount;
}

function isTransferToHimself(receiver, currentAccount) {
  return receiver?.username === currentAccount.username;
}

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const loan = Number(inputLoanAmount.value);

  if (loan > 0 && currentAccount.movements.some((mov) => mov * 0.1 >= loan)) {
    currentAccount.movements.push(loan);
    updateUI(currentAccount);
  }

  inputLoanAmount.value = '';
  inputLoanAmount.blur();
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    const accountNum = accounts.findIndex(
      ({ username }) => username === inputCloseUsername.value
    );
    accounts.splice(accountNum, 1);
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
  inputCloseUsername.blur();
});

btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount.isSorted = !currentAccount.isSorted || false;

  displayMovements(currentAccount, currentAccount.isSorted);
});

console.log(
  '🚀 ~ currentAccount.sortedMovements',
  currentAccount.sortedMovements
);
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

// 10/145 forEach with Maps and Sets

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

// 11/148 Coding challenge 1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

let dogsJulia = [3, 5, 2, 12, 7];
let dogsKate = [4, 1, 15, 8, 3];

function checkDogs(dogsJulia, dogsKate) {
  const dogsJuliaCorrect = dogsJulia.slice(1, -2);
  const allDogs = dogsJuliaCorrect.concat(dogsKate);

  allDogs.forEach((dog, index) => {
    const adultOrPuppy = dog >= 3 ? 'an adult' : 'still a puppy';
    const dogNumber = index + 1;

    console.log(`Dog number ${dogNumber} is ${adultOrPuppy}`);
  });
}

checkDogs(dogsJulia, dogsKate);

dogsJulia = [9, 16, 6, 8, 3];
dogsKate = [10, 5, 6, 1, 4];

console.log('test data 2');
checkDogs(dogsJulia, dogsKate);

// 11/149 Data Transformation map, filter, reduce

// 11/150 The map method

const movements3 = [200, 50, -400, -650, -130, 70, 1300];

const eurToUsd = 1.1;

const movements3Usd = movements.map((mov) => mov * eurToUsd);

console.log(movements3Usd);

//  this same operation with forOf loop
// let movements3Usd2 = [];
// for (const mov of movements3) {
//   movements3Usd2.push(mov * eurToUsd);
// }
// console.log(movements3Usd2);

const movements3Usd3 = movements3.map((mov, i) =>
  mov > 0
    ? `Movement ${i + 1}: You deposited ${mov}`
    : `Movement ${i + 1}: You withdrew ${Math.abs(mov)}`
);

const movements3Usd4 = movements3.map((mov, i) => {
  return mov > 0
    ? `Movement ${i + 1}: You deposited ${mov}`
    : `Movement ${i + 1}: You withdrew ${Math.abs(mov)}`;
});
console.log(movements3Usd3);
console.log(movements3Usd4);

movements3Usd4.forEach((mov) => console.log(mov));

// 11/151 Computing usernames

function getUsername2(user) {
  return user
    .split(' ')
    .map((word) => word.at(0))
    .join('')
    .toLocaleLowerCase();
}

function createUsernames2(accounts) {
  accounts.forEach((account) => {
    account.username = getUsername2(account.owner);
  });
}

createUsernames2(accounts);
console.log(accounts);

// 11/152 The filter method

const movements4 = [200, 450, -400, -650, -130, 70, 1300];

const movementsAboveZero = movements4.filter((value) => value > 0);

console.log(movementsAboveZero);

const withdrawals2 = movements4.filter((value) => value < 0);
console.log(withdrawals2);

// 11/153 The reduce Method

const movements5 = [200, 450, -400, 3000, -650, -130, 70, 1300];

const movSum = movements5.reduce((acc, cur) => acc + cur);
console.log(movSum);

// start counting at 60
const movSum2 = movements5.reduce(function (acc, cur, i) {
  console.log(i, acc);
  return acc + cur;
}, 60);
console.log(movSum2);

// maximum value
const maxVal = movements5.reduce((acc, cur) => (acc > cur ? acc : cur));

console.log(maxVal);

// 11/154 Coding challenge 2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

function calcHumDogAge1(dogAge) {
  return dogAge > 2 ? dogAge * 4 + 16 : dogAge * 2;
}

function calcAverageHumanAge(dogAges) {
  let avgHumAge = dogAges
    .map(calcHumDogAge1)
    .filter((dogAge) => dogAge >= 18)
    .reduce((acc, cur, _, arr) => {
      return acc + cur / arr.length;
    }, 0);
  console.log(avgHumAge);
}

calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

// 11/155 The magic of chaining methods

const eurToUsd2 = 1.1;
const movements6 = [200, 450, -400, 3000, -650, -130, 70, 1300];

const totalDepositUsd = movements6
  .filter((mov) => mov > 0)
  .map((mov) => mov * eurToUsd2)
  .reduce((acc, mov) => acc + mov);

console.log(totalDepositUsd);

// 11/156 Coding challenge 3

/* 
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

const calcAverageHumanAge2 = (dogAges) =>
  dogAges
    .map(calcHumDogAge1)
    .filter((dogAge) => dogAge >= 18)
    .reduce((acc, cur, _, arr) => acc + cur / arr.length, 0);

console.log(calcAverageHumanAge2([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAge2([16, 6, 10, 5, 6, 1, 4]));

// 11/157 The find method

const movements7 = [200, 450, -400, 3000, -650, -130, 70, 1300];
console.log(movements7.find((mov) => mov > 500));

// find with destructuring {}
const accounts2 = [account1, account2, account3, account4];
console.log(accounts2.find(({ owner }) => owner === 'Sarah Smith'));

// 11/158 Implementing Login

// 11/159 Implementing transfers

// 11/160 The findIndex Method

// 11/161 some and every

// EQUALITY
console.log(movements.includes(-130));

// CONDITION

// Some
console.log(movements.some((mov) => mov > 0));

const anyDeposits = movements.some((mov) => mov > 0);
console.log('🚀 ~ anyDeposits', anyDeposits);

// Every
const allDeposits1 = movements.every((mov) => mov > 0);
console.log('🚀 ~ allDeposits1', allDeposits1);

const allDeposits2 = accounts.at(3).movements.every((mov) => mov > 0);
console.log('🚀 ~ allDeposits2', allDeposits2);

// 11/162 flat and flatMap

const arr7 = [[1, 2], [3, 4], 5, 6, 7, 8];
const arr7Flat = arr7.flat();
console.log('🚀 ~ arr7Flat', arr7Flat);

const arr8 = [1, 2, [3, [4]]];
const arr8Flat = arr8.flat();
console.log('🚀 ~ arr8Flat', arr8Flat);

const arr8Flat2 = arr8.flat(2);
console.log('🚀 ~ arr8Flat2', arr8Flat2);

const totalBalance = accounts
  .map((acc) => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov);
console.log('🚀 ~ totalBalance', totalBalance);

// flatMap
const totalBalance2 = accounts
  .flatMap((acc) => acc.movements)
  .reduce((acc, mov) => acc + mov);
console.log('🚀 ~ totalBalance2', totalBalance2);

// 11/163 Sorting arrays

const arr9 = [20, -50, 2000, 3];

arr9.sort((a, b) => a - b);
console.log('🚀 ~ arr9', arr9);

arr9.sort((a, b) => b - a);
console.log('🚀 ~ arr9', arr9);

// 11/164 More Ways of Creating and Filling Arrays

const arr10 = [1, 2, 3, 4, 5, 6, 7];

new Array(1, 2, 3, 4, 5, 6, 7);
console.log('🚀 ~ new Array(1,2,3,4,5,6,7)', new Array(1, 2, 3, 4, 5, 6, 7));

const x = new Array(7);
console.log('🚀 ~ x', x);

// fill with 1 from place 3 to place 5
x.fill(1, 3, 5);
console.log('🚀 ~ x', x);

arr10.fill(23, 2, 6);
console.log('🚀 ~ arr10', arr10);

// Array.from
const y = Array.from({ length: 7 }, () => 1);
console.log('🚀 ~ y', y);

const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log('🚀 ~ z', z);

labelBalance.addEventListener('click', function () {
  const movementsUiEl = Array.from(
    document.querySelectorAll('.movements__value'),
    (el) => Number(el.textContent.replace('€', ''))
  );

  console.log('🚀 ~ movementsUiEl', movementsUiEl);
});

// 11/165 summary, which array method to use

// 11/166 Array Method Practice

// 1.
const bankDepositSum = accounts
  .flatMap(({ movements }) => movements.filter((x) => x > 0))
  .reduce((acc, cur) => acc + cur, 0);
console.log('🚀 ~ bankDepositSum', bankDepositSum);

// 2
const numDeposits1000 = accounts.flatMap(({ movements }) =>
  movements.filter((x) => x >= 1000)
).length;
console.log('🚀 ~ numDeposits1000', numDeposits1000);

const numDeposits1000v2 = accounts
  .flatMap(({ movements }) => movements)
  .reduce((count, curr) => (curr >= 1000 ? ++count : count), 0);

console.log('🚀 ~ numDeposits1000v2', numDeposits1000v2);

// 3
const { deposits, withdrawals } = accounts
  .flatMap(({ movements }) => movements)
  .reduce(
    (acc, curr) => {
      acc[curr > 0 ? 'deposits' : 'withdrawals'] += curr;

      return acc;
    },
    { deposits: 0, withdrawals: 0 }
  );
console.log('🚀 ~ deposits', deposits);
console.log('🚀 ~ withdrawals', withdrawals);

// 4 Convert title case
let sentence = 'a Convert a titLe cAsE Yet';
function convertTitleCase(sentence) {
  const exceptions = [
    'and',
    'as',
    'but',
    'for',
    'if',
    'nor',
    'or',
    'so',
    'yet',
    'a',
    'an',
    'the',
    'as',
    'at',
    'by',
    'for',
    'in',
    'of',
    'off',
    'on',
    'per',
    'to',
    'up',
    'via',
  ];
  console.log('🚀 ~ convertTitleCase ~ exceptions', exceptions);

  let converted = sentence
    .toLowerCase()
    .split(' ')
    .map((word, index) => {
      console.log(!exceptions.some((exceptions) => exceptions === word));
      return !exceptions.includes(word) || index === 0
        ? word.at(0).toUpperCase() + word.slice(1)
        : word;
    })
    .join(' ');

  console.log(converted);
}

convertTitleCase(sentence);

//  */ 11/167 Coding Challenge #4

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Formula: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

GOOD LUCK 😀
*/

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// recommendedFood = weight ** 0.75 * 28.
// (The result is in grams of food, and the weight needs to be in kg)
// 1
dogs.forEach((dog) => (dog.recommendedFood = dog.weight ** 0.75 * 28));

console.log(dogs);
// 2
function isYouDogEatingToMuch(owner) {
  let dog = {};
  dogs.forEach(({ owners }, index) => {
    if (owners.includes(owner)) {
      return (dog = dogs.at(index));
    }
  });

  const isEatingToMuch = () => dog.curFood > dog.recommendedFood;

  isEatingToMuch()
    ? console.log(owner + "'s dog eating too much")
    : console.log(owner + "'s dog eating to little");
}

isYouDogEatingToMuch('Sarah');

// better solution
const dogSarah = dogs.find((dog) => dog.owners.includes('Sarah'));
console.log(dogSarah);

// 3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').

let ownersEatTooMuch = [];
let ownersEatTooLittle = [];

dogs.forEach((dog) => {
  dog.curFood > dog.recommendedFood
    ? ownersEatTooMuch.push(dog.owners)
    : dog.curFood < dog.recommendedFood
    ? ownersEatTooLittle.push(dog.owners)
    : console.log('eating good');
});
console.log('🚀 ~ ownersEatTooMuch', ownersEatTooMuch);
console.log('🚀 ~ ownersEatTooLittle', ownersEatTooLittle);

// better solution
const ownersEatTooMuch2 = dogs
  .filter((dog) => dog.curFood > dog.recommendedFood)
  .flatMap((dog) => dog.owners);
console.log(ownersEatTooMuch2);

const ownersEatTooLittle2 = dogs
  .filter((dog) => dog.curFood < dog.recommendedFood)
  .flatMap((dog) => dog.owners);
console.log(ownersEatTooLittle2);

// 4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"

console.log(ownersEatTooMuch.flat().join(' and ') + "'s dogs eat too much!");
console.log(
  ownersEatTooLittle.flat().join(' and ') + "'s dogs eat too little!"
);

// 5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)

dogs.forEach((dog, index) => {
  let isEatingExactly = [];
  if (dog.curFood === dog.recommendedFood) {
    console.log(true);
    isEatingExactly.push(true);
  }

  if (index === dogs.length - 1 && isEatingExactly.includes(true)) {
    return console.log(true);
  } else if (index === dogs.length - 1) {
    return console.log(false);
  }
});

// better solution
console.log(dogs.some((dog) => dog.curFood === dog.recommendedFood));

// 6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)

dogs.forEach((dog, index) => {
  let isEatingOkay = [];
  if (
    dog.curFood > dog.recommendedFood * 0.9 &&
    dog.curFood < dog.recommendedFood * 1.1
  ) {
    isEatingOkay.push(true);
  }

  if (index === dogs.length - 1 && isEatingOkay.includes(true)) {
    return console.log(true);
  } else if (index === dogs.length - 1) {
    return console.log(false);
  }
});

// better solution
const checkEatingOk = (dog) => {
  return (
    dog.curFood > dog.recommendedFood * 0.9 &&
    dog.curFood < dog.recommendedFood * 1.1
  );
};

console.log(dogs.some((dog) => checkEatingOk(dog)));

// 7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)

dogs.forEach((dog, index) => {
  let isEatingOkay = [];
  if (
    dog.curFood > dog.recommendedFood * 0.9 &&
    dog.curFood < dog.recommendedFood * 1.1
  ) {
    isEatingOkay.push(dog);
  }

  if (index === dogs.length - 1) {
    return console.log(isEatingOkay);
  }
});

// better solution
const dogsEatingOk = dogs.filter(checkEatingOk);
console.log('dogsEatingOk', dogsEatingOk);

// 8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

const dogsSorted = dogs.slice().sort((a, b) => {
  return a.recommendedFood - b.recommendedFood;
});
console.log('🚀 ~ dogsSorted', dogsSorted);
