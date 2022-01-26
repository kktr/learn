/*jshint esversion: 11*/
/* eslint-env es12 */

'use strict';
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2022-01-20T23:36:17.929Z',
    '2022-01-21T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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
// Functions

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  const displayDate = (i, locale) => {
    const movDate = new Date(acc.movementsDates[i]);

    const currDate = new Date();
    const daysDifference = Math.round(
      (+currDate - +movDate) / (60 * 60 * 24 * 1000)
    );

    if (daysDifference < 1) {
      return 'today';
    } else if (daysDifference < 2) {
      return 'yesterday';
    } else if (daysDifference < 8) {
      return `${daysDifference} day's ago`;
    } else {
      // const day = `${movDate.getDate()}`.padStart(2, 0);
      // const month = `${movDate.getMonth() + 1}`.padStart(2, 0);
      // const year = `${movDate.getFullYear()}`;

      return new Intl.DateTimeFormat(locale).format(movDate);
    }
  };

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate(i, acc.locale)}</div>
        <div class="movements__value">${mov}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance.toFixed(2)}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes.toFixed(2)}€`;

  const out = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out).toFixed(2)}€`;

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)}€`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map((name) => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
// Event handlers
let currentAccount;

currentAccount = account1;
updateUI(currentAccount);
containerApp.style.opacity = 100;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    const now2 = new Date();
    const locale = navigator.language;
    // const day = `${now2.getDate()}`.padStart(2, 0);
    // const month = `${now2.getMonth() + 1}`.padStart(2, 0);
    // const year = `${now2.getFullYear()}`;
    console.log(now2.getDate);
    const options = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now2);

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    const now = new Date().toISOString();

    currentAccount.movements.push(-amount);
    currentAccount.movementsDates.push(now);
    receiverAcc.movements.push(amount);
    receiverAcc.movementsDates.push(now);
    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const now = new Date().toISOString();
  const amount = Math.floor(inputLoanAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    // Add movement
    currentAccount.movements.push(amount);
    currentAccount.movementsDates.push(now);

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// 12/170 Converting and Checking Numbers

console.log(23 === 23.0);

console.log(0.3 + 0.1);
console.log(0.3 + 0.1 === 0.3);

// Conversions
console.log('  ', Number('23'));
console.log('  ', +'23');

// Parsing
console.log('PARSING');
console.log('  ', Number.parseInt('30px', 10));
console.log('  ', "don't work", Number.parseInt('e30', 10));

console.log('  ', 2, Number.parseInt('  2.5  ', 10));
console.log('  ', 2.5, Number.parseFloat('  2.5  ', 10));

// Check if value is NAN
console.log('IS NAN');
console.log('  ', Number.isNaN(20));
console.log('  ', Number.isNaN('20'));
console.log('  ', Number.isNaN(+'20X'));
console.log('  ', Number.isNaN(23 / 0));

// Checking if value is number
console.log('isFinite');

console.log('  ', Number.isFinite(20));
console.log('  ', Number.isFinite('20'));
console.log('  ', Number.isFinite(+'20X'));
console.log('  ', Number.isFinite(23 / 0));

console.log('isInteger');
console.log('  ', Number.isInteger(23));
console.log('  ', Number.isInteger(23.0));
console.log('  ', Number.isInteger(23 / 0));

// 12/171 Math and rounding

console.log(Math.sqrt(25));
console.log(25 ** (1 / 2));
console.log(8 ** (1 / 3));

console.log(Math.max(5, 18, 23, 11, 2));
console.log(Math.min(5, 18, 23, 11, 2));

console.log(Math.PI * Number.parseFloat('10px') ** 2);

console.log(Math.trunc(Math.random() * 6) + 1);

const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min) + 1) + min;
};

console.log(randomInt(90, 100));

// Rounding integers
console.log('Rounding integers');

console.log(Math.round(23.3));
console.log(Math.round(23.9));

console.log('round up');
console.log(Math.ceil(23.3));
console.log(Math.ceil(23.9));

console.log('round down');
console.log(Math.floor(23.3));
console.log(Math.floor(23.9));

// trunc only cut decimal
console.log(Math.trunc(-23.3));
console.log(Math.floor(-23.3));

// Rounding decimals
// toFixed return string
console.log((2.7).toFixed(0));
console.log((2.7).toFixed(3));
console.log((2.345).toFixed(2));

console.log(+(2.345).toFixed(2));

console.log('rest');
console.log(5 % 2);
console.log(5 / 2);

const isEven = (n) => n % 2 === 0;

console.log(isEven(2));
console.log(isEven(3));

labelBalance.addEventListener('click', function () {
  console.log('click');
  [...document.querySelectorAll('.movements__row')].forEach((row, i) => {
    if (isEven(i)) {
      return (row.style.backgroundColor = 'orange');
    }
    if (i % 3) {
      return (row.style.backgroundColor = 'blue');
    }
  });
});

// 12/173 Numeric separators

const diameter = 287_460_000_000;

console.log('🚀 ~ diameter', diameter);

// 12/173 Working with BigInt

console.log(2 ** 53 - 1);
console.log(Number.MAX_SAFE_INTEGER);

const huge = 48646846513135654684684651313516849846515619n;
console.log('🚀 ~ huge', huge);

console.log(1000000n + 1000000n);

// doesn't work
// console.log(Math.sqrt(16n));

// error cannot mix BigInt and other types
// console.log(huge + 1);

// exception
console.log(huge > 1);
console.log(20n === 20);
console.log(20n == 20);
console.log(typeof huge);

console.log(huge + ' is REALLY big!!!');

// divisions cut decimal part

console.log(10n / 3n);
console.log(11n / 3n);
console.log(10 / 7);

// 12/175 Creating Dates

const now = new Date();
console.log(now);

console.log(new Date('december 24, 2015'));

console.log(new Date(accounts[0].movementsDates[0]));

console.log(new Date(2037, 10, 19, 15, 23, 5));

console.log(new Date(0));
console.log(new Date(3 * 24 * 60 * 60 * 1000));

// Working with dates
const future = new Date(2037, 10, 31, 15, 23, 5);
console.log('🚀 ~ future', future);

console.log(future.getFullYear());
console.log(future.getMonth());
console.log('getDate', future.getDate());
console.log('getDay', 'day of the week: thu = 2.', future.getDay());
console.log('getHours', future.getHours());
console.log('getMinutes', future.getMinutes());
console.log('getSeconds', future.getSeconds());
console.log('getMilliseconds', future.getMilliseconds());

// 2037-12-01T14:23:05.000Z
console.log(future.toISOString());

// time in ms from unix time
console.log(future.getTime());

console.log(new Date(2143290185000));

// time now in ms
console.log(Date.now());

future.setFullYear(2040);
console.log(future);

// 12/177 Operations with dates
const future2 = new Date(2037, 10, 31, 15, 23, 5);
const now3 = new Date();

console.log('🚀 ~ future2', future2);
console.log('🚀 ~ now3', now3);

console.log(future2);
console.log(now3);
console.log((Number(future2) - Number(now3)) / 1000 / 60 / 60 / 24);

const daysPassed = (day1, day2) => {
  return Math.round(Math.abs((+day1 - +day2) / 1000 / 60 / 60 / 24));
};

const dayPassedTest1 = daysPassed(future2, now3);
const dayPassedTest2 = daysPassed(now3, future2);
console.log('🚀 ~ dayPassedTest1', dayPassedTest1);
console.log('🚀 ~ dayPassedTest2', dayPassedTest2);
