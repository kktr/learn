/* eslint-env es12 */

'use strict';

// 14/208 Constructor Functions and the new Operator

const Person = function (firstName, birthYear) {
  console.log(this);
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  // Never do this
  // this.calcAge = function () {
  //   console.log(2037 - this.birthYear);
  // };
};

const jonas = new Person('Jonas', 1991);
console.log(jonas);

const matilda = new Person('Matilda', 2017);
const jack = new Person('Jack', 1975);
console.log(matilda, jack);

console.log(jonas instanceof Person);

// 14/209 Prototypes

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

jonas.calcAge();
matilda.calcAge();

console.log(jonas.__proto__);
console.log(jonas.__proto__ === Person.prototype);

console.log(Person.prototype.isPrototypeOf(jonas));

Person.prototype.species = 'Homo Sapiens';
console.log(jonas.species, matilda.species);

console.log(jonas.hasOwnProperty('firstName'));
console.log(jonas.hasOwnProperty('species'));

// 14/211 Prototypal Inheritance on Built-In Objects

console.log(jonas.__proto__.__proto__);
console.log(jonas.__proto__.__proto__.__proto__);

console.log(Person.prototype.constructor);
console.dir(Person.prototype.constructor);

const arr = [1, 2, 3, 4, 4, 4, 5, 6];

console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype);

console.log(arr.__proto__.__proto__);

// don't do this
// Array.prototype.unique = function () {
//   return [...new Set(this)];
// };

// const arrUniqueValues = arr.unique();

// console.log('🚀 ~ arrUniqueValues', arrUniqueValues);

// const h1 = document.querySelector('h1');
// console.dir(h1);

// console.dir((x) => x + 1);

// 14/212 Coding Challenge #1

/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀
*/

const Car = function (name, currentSpeed) {
  this.make = name;
  this.speed = currentSpeed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(this.speed);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(this.speed);
};

const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);

bmw.accelerate();
bmw.accelerate();
bmw.accelerate();

bmw.brake();
bmw.brake();
bmw.brake();
bmw.brake();
console.log(bmw);

mercedes.brake();
mercedes.accelerate();
console.log(mercedes);

// 14/213 ES6 Classes

// class expression
// const PersonCl = class {}

// class declaration
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.firstName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  // Seta property that already exist
  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else console.log(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }

  // Static method
  static hey() {
    console.log('Hey there');
  }
}

const jessica = new PersonCl('Jessica Davis', 1996);
console.log(jessica);

jessica.calcAge();

console.log(jessica.__proto__ === PersonCl.prototype);

// PersonCl.prototype.greet = function () {
//   console.log(`Hey ${this.firstName}`);
// };

jessica.greet();

// 1. Classes are NOT hoisted
// 2. Class are first-class citizens
// 3. Classes are executed in strict mode

// 14/214 Setters and Getters

const account = {
  owner: 'jonas',
  movements: [200, 530, 120, 300],

  get latest() {
    return this.movements.slice(-1).pop();
  },

  set latest(mov) {
    this.movements.push(mov);
  },
};

console.log(account.latest);

account.latest = 50;
console.log(account.movements);

console.log(account.latest);

console.log(jessica.age);

const walter = new PersonCl('Walter', 1956);

// 14/215 Static Methods
PersonCl.hey();

//  don't work
// jessica.hey();

// 14/216 Object.create

const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.fullName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);

console.log('🚀 ~ steven', steven);

steven.name = 'Seven';
steven.birthYear = 2002;

steven.calcAge();

console.log(steven.__proto__ === PersonProto);

const sarah = Object.create(PersonProto);

sarah.init('sarah', 2000);
console.log('🚀 ~ sarah', sarah);

sarah.calcAge();
