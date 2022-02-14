/*jshint esversion: 6*/
/* eslint-env es6 */

function Shape() {}
function Circle() {}

// Prototypical inheritance
Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.constructor = Circle;

function Rectangle(color) {
  // To call the super constructor
  Shape.call(this, color);
}

// Method overriding
Shape.prototype.draw = function() {};
Circle.prototype.draw = function() {
  // Call the base implementation
  Shape.prototype.draw.call(this);

  // Do additional stuff here
};

function Bike(numberOfwheels) {
  this.numberOfwheels = numberOfwheels;
}

RoadBike.prototype = Object.create(Bike.prototype);
RoadBike.prototype.constructor = RoadBike;

function RoadBike(numberOfwheels) {
  Bike.call(this, numberOfwheels);
}

const szrot = new Bike(2);
const tcr = new RoadBike(2);
// Don't create large inheritance hierarchies.
// One level of inheritance is fine.

// Use mixins to combine multiple objects
// and implement composition in JavaScript.
const canEat = {
  eat: function() {}
};

const canWalk = {
  walk: function() {}
};

function mixin(target, ...sources) {
  // Copies all the properties from all the source objects
  // to the target object.
  Object.assign(target, ...sources);
}

function Person() {}

mixin(Person.prototype, canEat, canWalk);

const haveMudGuards = {
  protectFromMud: function() {
    console.log('I have mud guards');
  }
};

const haveLights = {
  lightOn: function() {
    console.log('The Light is turned on');
  }
};

function CityBike() {}

mixin(CityBike.prototype, haveMudGuards, haveLights);

const blackArrow = new CityBike();

function HtmlElement() {
  this.click = function() {
    console.log('clicked');
  };
}

HtmlElement.prototype.focus = function() {
  console.log(focus);
};

const e = new HtmlElement();

function HtmlSelectElement(items) {
  this.addItem = function(item) {
    this.items.push(item);
  };

  this.items = items;

  this.removeItems = function(item) {
    this.items.splice(this.items.indexOf(item, 1));
  };

  this.render = function() {
    return `<select>${this.items
      .map(item => `<option>${item}</option>`)
      .join('')}
    </select>`;
    // let options = '';
    //
    // for (let i = 0; i < this.items.length; i++) {
    //   if (i == 0) {
    //     options = '<select>';
    //   }
    //
    //   options += `<option>${this.items[i]}</option>`;
    //
    //   if (i == this.items.length - 1) {
    //     options += '<select/>';
    //   }
    // }
    // return options;
  };
}

HtmlSelectElement.prototype = new HtmlElement();
HtmlSelectElement.prototype.constructor = HtmlSelectElement;

let numbers = [1, 2, 3];
const s = new HtmlSelectElement(numbers);

function HtmlImageElement(src) {
  this.src = src;

  this.render = function() {
    return `<img src="${this.src}" />`;
  };
}

HtmlImageElement.prototype = new HtmlElement();
HtmlImageElement.prototype.constructor = HtmlImageElement;

const img = new HtmlImageElement();

const elements = [
  new HtmlSelectElement(numbers),
  new HtmlImageElement('http://')
];

for (let element of elements) console.log(element.render());
