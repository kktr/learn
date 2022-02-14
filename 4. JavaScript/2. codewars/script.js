/*jshint esversion: 6*/
/* eslint-env es6 */

//26. Who likes it? 6kyu
// https://www.codewars.com/kata/5266876b8f4bf2da9b000362/solutions/javascript

//my dirty solution
'use strict';

function likes(names) {
  let string = '';
  let endString = 'like this';
  let endString2 = 'likes this';
  if (names[0] == undefined) {
    return 'no one likes this';
  } else if (names.length == 1) {
    return (string = names[0] + ' ' + endString2);
  } else {
    for (let i = 0; i < names.length; i++) {
      if (i == names.length - 1) {
        return (string += ' ' + 'and' + ' ' + names[i] + ' ' + endString);
      } else if (names.length > 2 && i < names.length - 2) {
        string += names[i] + ',' + ' ';
      } else if (names.length > 3) {
        return `${names[0]}, ${names[1]} and ${
          names.length - 2
        } others ${endString}`;
      } else {
        string += names[i];
      }
    }
  }
}
//clever

function likes2(names) {
  return {
    0: 'no one likes this',
    1: `${names[0]} likes this`,
    2: `${names[0]} and ${names[1]} like this`,
    3: `${names[0]}, ${names[1]} and ${names[2]} like this`,
    4: `${names[0]}, ${names[1]} and ${names.length - 2} others like this`,
  }[Math.min(4, names.length)];
}

//27. Find the odd int 6kyu

//my solutions
function findOdd(A) {
  let odds;
  let sort = [];
  let prevIndex = -1;
  if (A.length == 1) {
    return A;
  } else {
    odds = A.sort(function (a, b) {
      return a - b;
    });
    console.log(odds);
    for (let i = 0; i < odds.length; i++) {
      sort[i] = [];
      sort[i].push(odds[prevIndex]);
      for (; sort[i][0] == odds[prevIndex + 1]; prevIndex++) {
        console.log('i=' + i + ' ' + 'prevIndex=' + prevIndex + ' ' + sort);
        sort[i].push(odds[prevIndex + 1]);
      }
    }
  }
  console.log(sort);
}

let testNumbers = [2, 2, 3, 3];
findOdd(testNumbers);

let obj = [];
obj[0] = [];
obj[0][0] = 1;
obj[0][1] = 2;
obj[0].push(3);
console.log(obj);
console.log(obj[0][0]);

// Get the Middle Character 7 6kyu

//my solutions
function getMiddle(s) {
  if (s.length == 1) {
    return s;
  } else if (s.length % 2 == 0) {
    return s[s.length / 2 - 1] + s[s.length / 2];
  } else {
    return s[s.length / 2 - 0.5];
  }
}

// Clever
function getMiddle2(s) {
  return s.substr(Math.ceil(s.length / 2 - 1), s.length % 2 === 0 ? 2 : 1);
}

// Sum of Digits / Digital Root 6 kyu

//my solutions
function digital_root(n) {
  let myFunc = (num) => Number(num);
  let intArr = Array.from(String(n), myFunc);
  let sumIntArr = intArr.reduce((a, b) => a + b, 0);

  if (sumIntArr < 10) {
    return sumIntArr;
  } else {
    return digital_root(sumIntArr);
  }
}

// Clever
function digital_root2(n) {
  return ((n - 1) % 9) + 1;
}

// Stop gninnipS My sdroW! 6 kyu

//my solutions
function spinWords(string) {
  let words = string.split(' ');
  let solution = [];
  words.forEach((word) => {
    if (word.length < 5) {
      solution.push(word);
    } else {
      solution.push(word.split('').reverse().join(''));
    }
  });
  return solution.join(' ');
}

console.log(spinWords('This is another test'));

// Clever
function spinWords2(words) {
  return words
    .split(' ')
    .map(function (word) {
      return word.length > 4 ? word.split('').reverse().join('') : word;
    })
    .join(' ');
}

// Array.diff 6 kyu

//my solutions
function arrayDiff(a, b) {
  let uniqueChars = [...new Set(a)].concat([...new Set(b)]);
  let unique = uniqueChars.filter((item, i, ar) => ar.indexOf(item) === i);

  console.log(uniqueChars);
  console.log(unique);
}

arrayDiff([3, 3, 4], [3]);
