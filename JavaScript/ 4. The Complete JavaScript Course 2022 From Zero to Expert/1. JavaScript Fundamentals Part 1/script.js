/*jshint esversion: 6*/
/* eslint-env es6 */

// Coding Challenge 1 & 2
let mark = { mass: 78, height: 1.69 };
let john = { mass: 92, height: 1.95 };

let markHigherBMI;

function isMarkHigherBMI(mark, john) {
  let markBMI = mark.mass / mark.height ** 2;
  let johnBMI = john.mass / john.height ** 2;
  console.log('Mark BMI is ' + Math.round(markBMI));
  console.log('John BMI is ' + Math.round(johnBMI));

  if (markBMI > johnBMI) {
    markHigherBMI = true;
  } else {
    markHigherBMI = false;
  }
}

isMarkHigherBMI(mark, john);
console.log(markHigherBMI);
isMarkHigherBMI({ mass: 95, height: 1.88 }, { mass: 85, height: 1.76 });
console.log(markHigherBMI);

// Coding Challenge 3

let dolphinsScore = [96, 108, 89];
let koalasScore = [88, 91, 110];

function whoWin(teamA, teamB) {
  teamAavg = teamA.reduce((a, b) => a + b, 0) / teamA.length;
  teamBavg = teamB.reduce((a, b) => a + b, 0) / teamB.length;
  console.log(teamAavg);
  if (teamAavg >= 100 || teamBavg >= 100) {
    if (teamAavg > teamBavg) {
      console.log(`Team A WIN`);
    } else if (teamAavg < teamBavg) {
      console.log(`Team B WIN`);
    } else if (teamAavg == teamBavg) {
      console.log(`It's draw`);
    } else {
      console.log('wrong data');
    }
  } else {
    console.log('No team win the trophy, avg score is under 100');
  }
}

whoWin(dolphinsScore, koalasScore);

// switch statment

const day = 'friday';
switch (day) {
  case 'monday':
    console.log('Learn HTML');
    break;
  case 'tuesday':
    console.log('Learn CSS');
    break;
  case 'wednesday':
    console.log('Learn JS');
    break;
  case 'thursday':
    console.log('Learn REACT');
    break;
  case 'friday':
    console.log('Learn REDUX');
    break;
  case 'saturday':
    console.log('Learn node.js');
    break;
  case 'sunday':
  case 'weekend':
    console.log('Learn next.js');
    break;
  default:
    console.log(`Sorry, ${day} isn't a day`);
}

// The conditional (Ternary) Operator
let age = 15;
const weaponAllowed = age >= 21 ? 'real gun' : 'plastic toy';
console.log(weaponAllowed);

console.log(`Give me a ${age >= 21 ? 'real gun' : 'plastic toy'}`);

// Coding Challenge 4

let bill = 100;
let tip = bill > 300 || bill < 50 ? bill * 0.2 : bill * 0.15;
console.log(
  `The bill was ${bill}, the tip was ${tip}, and the total value ${bill + tip}`
);

// ES5, ES6+ amd ESNext
