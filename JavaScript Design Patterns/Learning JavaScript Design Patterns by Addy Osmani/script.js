/*jshint esversion: 6*/
/* eslint-env es6 */

// Examples of anti-patterns in JavaScript are the following:
//
// Polluting the global namespace by defining a large number of variables in the global context
// Passing strings rather than functions to either setTimeout or setInterval as this triggers the use of eval() internally.
// Modifying the Object class prototype (this is a particularly bad anti-pattern)
// Using JavaScript in an inline form as this is inflexible
// The use of document.write where native DOM alternatives such as document.createElement are more appropriate. document.write has been grossly misused over the years and has quite a few disadvantages including that if it's executed after the page has been loaded it can actually overwrite the page we're on, whilst document.createElement does not. We can see here for a live example of this in action. It also doesn't work with XHTML which is another reason opting for more DOM-friendly methods such as document.createElement is favorable.

// The Constructor Pattern

function Car(model, year, miles) {
  this.model = model;
  this.year = year;
  this.miles = miles;
}

// Note here that we are using Object.prototype.newMethod rather than
// Object.prototype so as to avoid redefining the prototype object
Car.prototype.toString = function() {
  return this.model + ' has done ' + this.miles + ' miles';
};

// Usage:

var civic = new Car('Honda Civic', 2009, 20000);
var mondeo = new Car('Ford Mondeo', 2010, 5000);

console.log(civic.toString());
console.log(mondeo.toString());

// The Module Pattern
