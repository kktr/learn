/*jshint esversion: 6*/
/* eslint-env es6 */

//26. Who likes it? 6kyu
// https://www.codewars.com/kata/5266876b8f4bf2da9b000362/solutions/javascript

//my dirty solution

function likes(names) {
  let string = '';
  let endstring = 'like this';
  let endstring2 = 'likes this';
  if (names[0] == undefined) {
    return 'no one likes this';
  } else if (names.length == 1) {
    return (string = names[0] + ' ' + endstring2);
  } else
    for (let i = 0; i < names.length; i++) {
      if (i == names.length - 1) {
        return (string += ' ' + 'and' + ' ' + names[i] + ' ' + endstring);
      } else if (names.length > 2 && i < names.length - 2) {
        string += names[i] + ',' + ' ';
      } else if (names.length > 3) {
        return `${names[0]}, ${names[1]} and ${names.length -
          2} others ${endstring}`;
      } else {
        string += names[i];
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
    4: `${names[0]}, ${names[1]} and ${names.length - 2} others like this`
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
    odds = A.sort(function(a, b) {
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
