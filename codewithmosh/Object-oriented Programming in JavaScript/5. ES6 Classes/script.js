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

const _radius = Symbol('radius');
const _draw = Symbol('draw');

class Circle3 {
  constructor(radius) {
    this[_radius] = radius;
  }

  [_draw]() {
    console.log('draw');
  }
}

const c3 = new Circle3(3);

console.log(Object.getOwnPropertySymbols(c3)[0]);

// 6. Private members using WaksMaps

const _radius2 = new WeakMap();
const _move = new WeakMap();

class Circle4 {
  constructor(radius) {
    _radius2.set(this, radius);

    _move.set(this, () => {
      console.log('move4');
    });
  }

  draw() {
    _move.get(this)();

    console.log('draw4');
  }
}

const c4 = new Circle4(4);

console.log(c4.draw());
console.log(_radius2);

// 7. Getters and setters

const _radius5 = new WeakMap();

class Circle5 {
  constructor(radius) {
    _radius5.set(this, radius);
  }

  get radius() {
    return _radius5.get(this);
  }

  set radius(value) {
    if (value <= 0) throw new Error('invalid radius');
    _radius5.set(this, value);
  }
}

const c5 = new Circle5(5);

// 8. Class Inheritance

class Shape8 {
  constructor(color) {
    this.color = color;
  }

  move() {
    console.log('move8');
  }
}

class Circle8 extends Shape8 {
  constructor(color, radius) {
    super(color);
    this.radius = radius;
  }

  draw() {
    console.log('draw8');
  }
}

const c8 = new Circle8('red', 8);

// 9. Method OverRiding

class Shape9 {
  move() {
    console.log('moveshape8');
  }
}

class Circle9 extends Shape9 {
  move() {
    console.log('movecircle9');
  }
}

const c9 = new Circle9();

// 10 Execrcise

const _stack = new WeakMap();

class Stack {
  constructor() {}

  get count() {
    return _stack.length;
  }

  pop() {
    if (this.count <= 0) throw new Error('stack is empty');
    _stack.pop();
  }

  push(value) {
    _stack.push(value);
  }
}

const stack = new Stack();
//
// const _radius5 = new WeakMap();
//
// class Circle5 {
//   constructor(radius) {
//     _radius5.set(this, radius);
//   }
//
//   get radius() {
//     return _radius5.get(this);
//   }
//
//   set radius(value) {
//     if (value <= 0) throw new Error('invalid radius');
//     _radius5.set(this, value);
//   }
// }
//
// const c5 = new Circle5(5);
