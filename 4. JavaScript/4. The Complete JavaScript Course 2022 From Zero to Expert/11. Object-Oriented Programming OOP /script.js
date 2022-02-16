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

// 14/217 Coding Challenge #2

/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

GOOD LUCK 😀
*/

class Car2 {
  constructor(name, currentSpeed) {
    this.make = name;
    this.speed = currentSpeed;
  }

  accelerate() {
    this.speed += 10;
  }

  brake() {
    this.speed -= 5;
  }

  get speedUS() {
    return console.log(this.speed * 1.6 + ' mp/h');
  }

  set speedUS(speed) {
    this.speed = speed / 1.6;
  }
}

const bmw2 = new Car2('BMW', 120);
const mercedes2 = new Car2('Mercedes', 95);

bmw2.accelerate();
bmw2.accelerate();
console.log('🚀 ~ bmw2', bmw2);

mercedes2.brake();
mercedes2.brake();
mercedes2.brake();
console.log('🚀 ~ mercedes2', mercedes2);

mercedes2.speedUS = 160;
console.log('🚀 ~ mercedes2', mercedes2);

mercedes2.speedUS;

// 14/218 Inheritance Between "Classes": Constructor Functions

const Person2 = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person2.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  Person2.call(this, firstName, birthYear);
  this.course = course;
};

// Linking prototypes
Student.prototype = Object.create(Person2.prototype);

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student('Mike', 2020, 'Computer Science');
console.log('🚀 ~ mike', mike);

mike.introduce();
mike.calcAge();

console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);
console.log(mike.__proto__.__proto__.__proto__);
console.log(mike.__proto__.__proto__.__proto__.__proto__);

Student.prototype.constructor = Student;
console.log(mike.__proto__);
console.dir(Student.prototype.constructor);

// 14/219 Coding Challenge 3

/* 
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definition of polymorphism 😉

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

const Car3 = function (make, currentSpeed) {
  this.make = make;
  this.speed = currentSpeed;
};

Car3.prototype.accelerate = function () {
  this.speed += 10;
  console.log(this.speed);
};

Car3.prototype.brake = function () {
  this.speed -= 5;
  console.log(this.speed);
};

const EV = function (make, currentSpeed, charge) {
  Car3.call(this, make, currentSpeed);

  this.charge = charge;
};

EV.prototype = Object.create(Car3.prototype);

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

EV.prototype.accelerate = function () {
  this.charge -= 1;
  this.speed += 20;
  console.log(
    `Tesla going at ${this.speed} km/h, with a charge of ${this.charge}%`
  );
};

EV.prototype.constructor = EV;

const tesla = new EV('tesla', 120, 23);

console.log(tesla);

tesla.accelerate();
tesla.accelerate();
tesla.accelerate();

tesla.brake();
console.log('🚀 ~ tesla', tesla);

tesla.chargeBattery(100);
console.log('🚀 ~ tesla', tesla);

// 14/220 Inheritance Between "Classes": ES6 Classes

class PersonCl2 {
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

class Student2 extends PersonCl2 {
  constructor(fullName, birthYear, course) {
    super(fullName, birthYear);

    this.course = course;
  }

  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }

  calcAge() {
    console.log(
      `I'm ${
        2037 - this.birthYear
      } years old, but as a student i feel more like ${
        2037 - this.birthYear + 10
      }`
    );
  }
}

const marta = new Student2('Marta Jones', 2000, 'Math');
console.log('🚀 ~ marta', marta);

marta.introduce();

marta.calcAge();

// 14/221 Inheritance Between "Classes": Object.create

const PersonProto2 = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven2 = Object.create(PersonProto2);

const StudentProto = Object.create(PersonProto2);

StudentProto.init = function (firstName, birthYear, course) {
  PersonProto2.init.call(this, firstName, birthYear);
  this.course = course;
};

StudentProto.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const jay = Object.create(StudentProto);
jay.init('Jay', 2010, 'Computer Science');

jay.introduce();
jay.calcAge();

// 14/222 Another Class Example

class Account {
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this._pin = pin;
    this._movements = [];
    this.locale = navigator.language;

    console.log(`Thanks for opening an account, ${owner}`);
  }

  getMovements() {
    return this._movements;
  }

  deposit(val) {
    this._movements.push(val);
  }

  withdraw(val) {
    this.deposit(-val);
  }

  _approveLoan(val) {
    return true;
  }

  requestLoad(val) {
    if (this._approveLoan) {
      this.deposit(val);
      console.log('Loan approved');
    }
  }
}

const acc1 = new Account('Jonas', 'EUR', 1111);
console.log(acc1);

acc1.deposit(200);
acc1.deposit(100);
acc1.deposit(300);

acc1.withdraw(50);
console.log('🚀 ~ acc1', acc1);

acc1.requestLoad(1000);
console.log('🚀 ~ acc1', acc1);

// 14/223 Encapsulation: Protected Properties and Methods
