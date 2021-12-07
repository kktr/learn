/*jshint esversion: 6*/
/* eslint-env es6 */

class Circle {
  constructor(radius) {
    this.radius = radius;

    this.move = function() {
      console.log('move');
    };

    this.drawThis = function() {
      console.log(this);
    };

    this.drawThis2 = () => {
      console.log(this);
    };
  }

  // Instance Method
  draw() {
    console.log('draw');
  }

  // Static Method
  static parse(str) {
    const radius = JSON.parse(str).radius;
    return new Circle(radius);
  }
}

const c = new Circle(1);

// Method Call
c.drawThis();

// this in drawTest point to the global object - window
const drawTest = c.drawThis;
// Function Call as stand alone function, this point to the global object - window
drawTest();

// this in drawTest2 point to the Circle object, because We use arrow function
const drawTest2 = c.drawThis2;
// Function Call
drawTest2();

const c2 = Circle.parse('{"radius": 2}');

sayHello();
// Function Declaration is hoisted
function sayHello() {
  console.log('Say Hello');
}

// Function Expression isn't hoisted
const sayGoodbye = function() {};

// Classes aren't hoisted

// Class Declaration
class Circe {}

// Class Expression
const Square = class {};

// 5. Private members using sybols

class Circle3 {
  constructor(radius) {
    this.radius = radius;
  }
}

const c3 = new Circle3(3);
