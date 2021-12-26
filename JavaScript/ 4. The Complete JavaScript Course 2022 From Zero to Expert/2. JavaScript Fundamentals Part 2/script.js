/*jshint esversion: 6*/
/* eslint-env es6 */

'use strict';

// Coding Challenge 1
function calcAverage(results) {
  return results.reduce((a, b) => a + b, 0) / results.length;
}

let dolphins = [44, 23, 71];
let koalas = [85, 54, 500];

console.log(calcAverage(dolphins));

function checkWinner(teamA, teamB) {
  const avgA = calcAverage(teamA);
  const avgB = calcAverage(teamB);

  return avgA / calcAverage(teamB) >= 2
    ? console.log(`Team A win ${avgA} vs ${avgB}`)
    : avgB / avgA >= 2
    ? console.log(`Team B win ${avgB} vs ${avgA}`)
    : console.log('No team wins');
}

checkWinner(dolphins, koalas);

// Coding Challenge 2
let bills = [125, 55, 44];
let tips = [];
let totals = [];

function calcTip(bills) {
  for (let bill of bills) {
    let tip = bill > 300 || bill < 50 ? bill * 0.2 : bill * 0.15;
    tips.push(tip);

    let total = bill + tip;
    totals.push(total);
    console.log(
      `The bill was ${bill}, the tip was ${tip}, and the total value ${total}`
    );
  }
}

calcTip(bills);
console.log(tips);
console.log(totals);

// Coding Challenge 3

let mark = {
  fullname: 'Mark Miller',
  mass: 78,
  heigh: 1.69,
  calcBmi: function() {
    return (this.mass / this.heigh) * this.heigh;
  }
};

let john = {
  fullname: 'John Smith',
  mass: 92,
  heigh: 1.95,
  calcBmi: function() {
    return (this.mass / this.heigh) * this.heigh;
  }
};

function whoHasHigherBmi(person1, person2) {
  person1.calcBmi() > person2.calcBmi()
    ? console.log(
        `${person1.fullname}'s BMI (${person1.calcBmi()}) is higher than ${
          person2.fullname
        }'s (${john.calcBmi()})'`
      )
    : console.log(
        `${person2.fullname}'s BMI (${person2.calcBmi()}) is higher than ${
          person1.fullname
        }'s (${mark.calcBmi()})`
      );
}

whoHasHigherBmi(mark, john);

// Looping Arrays, Breacking and Continuing

const jonas = [
  'Jonas',
  'Sronas',
  2000 - 1899,
  'teacher',
  ['Michael', 'Peter'],
  true
];

for (let i = 0; i < jonas.length; i++) {
  if (typeof jonas[i] !== 'string') continue;
  console.log(jonas[i]);
}

// Coding Challenge 4

function calcTip2(bills) {
  for (let i = 0; i < bills.length; i++) {
    let tip =
      bills[i] > 300 || bills[i] < 50 ? bills[i] * 0.2 : bills[i] * 0.15;
    tips.push(tip);

    let total = bills[i] + tip;
    totals.push(total);
    console.log(
      `The bill was ${bills[i]}, the tip was ${tip}, and the total value ${total}`
    );
  }
}

calcTip2(bills);
console.log(tips);
console.log(totals);

function calcAverage(nums) {
  let sum = 0;
  for (let num of nums) {
    sum += num;
  }
  let avg = sum / nums.length;
  console.log(avg);
  return avg;
}

calcAverage([100, 899, 1]);
