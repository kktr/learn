/*jshint esversion: 6*/
/* eslint-env es6 */

// 1. Aray Replace

function replace(array, elemToReplace, substitutionElem) {
  let result = array;
  for (let i = 0; i < array.length; i++) {
    if (result[i] == elemToReplace) {
      result[i] = substitutionElem;
    }
  }
  return console.log(result);
}
replace([1, 2, 1], 1, 3);

// 2. Case Insensitive Palindrome

function caseInsensitivePalindrome(str) {
  cases = str.toLowerCase();
  if (str.length % 2 == 1) {
    caseRight = cases.slice((cases.length + 1) / 2);
    caseRightArray = caseRight.split('');
    caseRightReverse = caseRightArray.reverse();
    caseLeft = cases.slice(0, (str.length - 1) / 2);
    caseLeftArray = caseLeft.split('');
    console.log(caseRightReverse);
    console.log(caseRightReverse);
    console.log(caseRightReverse == caseLeftArray);

    if (
      caseRightReverse.every((value, index) => value === caseLeftArray[index])
    ) {
      console.log(`${str} is Palindrome`);
    }
  } else console.log(`${str} is not Palindrome`);
}

caseInsensitivePalindrome('aaBAA');
caseInsensitivePalindrome('aaAaBAaA');

function caseInsensitivePalindromeTwo(str) {
  const caselessStr = str.toLowerCase();
  const reversedCaselessStr = caselessStr
    .split('')
    .reverse()
    .join('');

  return caselessStr === reversedCaselessStr;
}

function caseInsensitivePalindromeThree(str) {
  const caselessStr = str.toLowerCase();
  // const reversedCaselessStr = caselessStr.split('').reverse().join('');
  let reversedCaselessStr = '';

  for (let i = caselessStr.length - 1; i >= 0; i--) {
    reversedCaselessStr += caselessStr[i];
  }

  return caselessStr === reversedCaselessStr;
}

// 3. Enclose in Brackets

function encloseInBrackets(str) {
  let bracketStr = `(${str})`;
  console.log(bracketStr);
}

encloseInBrackets('tadam');

function encloseInBracketsTwo(str) {
  leftSide = '(';
  rightSide = ')';
  let bracketStr = `${leftSide}${str}${rightSide}`;
  console.log(bracketStr);
}

encloseInBracketsTwo('tadam2');

// const solution1 = '(' + str + ')';
// const solution3 = '('.concat(str, ')');

// 4. Factorial Number

function factorialNumber(num) {
  let result = 1;
  for (let i = 1; i <= num; i++) {
    result *= i;
  }
  console.log(result);
}

factorialNumber(5);
factorialNumber(3);

// 5. First Digit

function firstDigit(str) {
  let numFirstDigit = str.split('');
  for (let i = 0; i < numFirstDigit.length; i++) {
    if (!isNaN(numFirstDigit[i])) return `${numFirstDigit[i]}`;
  }
}

firstDigit('var_1_abc');

function firstDigitTwo(str) {
  const strNums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const chars = str.split('');

  for (const char of chars) {
    if (strNums.includes(char)) {
      return char;
    }
  }
}

// 6. Largest numbers

function largestNumber(num) {
  let largestNum = 10;
  for (let i = 1; i < num; i++) {
    largestNum *= 10;
  }
  largestNum -= 1;
  console.log(largestNum);
}

largestNumber(3);

function largestNumberTwo(num) {
  let placeholder = '';

  for (let i = 0; i < num; i++) {
    placeholder = placeholder.concat('9');
  }

  return parseInt(placeholder);
}

function largestNumber(num) {
  const placeholder = '9'.repeat(num);

  return parseInt(placeholder);
}

// 7. Max Multiple

function maxMultiple(divisor, bound) {
  for (let i = 0; i < divisor; i++) {
    if (bound % divisor == i) {
      console.log(bound - i);
      return bound - i;
    }
  }
}

maxMultiple(3, 30);

function maxMultipleTwo(divisor, bound) {
  const remainder = bound % divisor;

  return bound - remainder;
}
