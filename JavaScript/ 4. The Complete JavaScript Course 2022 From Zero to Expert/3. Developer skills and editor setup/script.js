/*jshint esversion: 6*/
/* eslint-env es6 */

'use strict';

// Debuging

// 1. IDENTIFY
// -during development
// -testing software
// -user reports during production
// - context: browser, users, etc.

// 2. FIND
// -Developer console (simple code)
// -Debugger (complex code)

// 3. FIX
// -replace wrong solution with new correct solution

// 4. PREVENT
// -searching for the same bug in similar code
// -wiriting tests using testing software

const measureKelvin = function() {
  const measurement = {
    type: 'temp',
    unit: 'celsius',
    value: Number('20')
  };

  let kelvins = measurement.value + 273;
  console.log(kelvins);
  console.table(measurement);
  return kelvins;
};

measureKelvin();

const calcTempAmlitudeBug = function(t1, t2) {
  const temps = t1.concat(t2);
  console.log(temps);

  // bug max and min = temps[0]
  let max = 0;
  let min = 0;

  for (let i = 0; i < temps.length; i++) {
    const curTemp = temps[i];

    // debugger;
    if (curTemp > max) max = curTemp;
    if (curTemp < min) min = curTemp;
  }
  console.log(max, min);
  return max - min;
};

const amplitudeBug = calcTempAmlitudeBug([3, 5, 1], [9, 4, 5]);
console.log(amplitudeBug);

// Coding Challenge 1

let data1 = [17, 21, 23];
let data2 = [12, 5, -5, 0, 4];

function printForecast(data) {
  let forecast = '...';
  for (let i = 0; i < data.length; i++) {
    forecast += ` ${data[i]}°C in ${i + 1} days ...`;
  }
  console.log(forecast);
}

printForecast(data1);
printForecast(data2);
