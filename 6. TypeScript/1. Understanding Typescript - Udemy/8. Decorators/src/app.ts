// 8/105 First Class Decorator

// decorators runs when class is created
function Logger(constructor: Function) {
  console.log('Logging...');
  console.log(constructor);
}

// 8/106 Working with decorator factories
//  8/107 Adding multiple decorators
function Logger2(logString: string) {
  console.log('Logger2', '1 step creating function from Top');

  return function (constructor: Function) {
    console.log('Logger2', '4 step Rendering template, bottom first');
    console.log(logString);
    console.log(constructor);
  };
}

// 8/107 Building more usefully decorators
function WithTemplate(template: string, hookId: string) {
  console.log('WithTemplate', '2 step creating function from Top');
  return function (constructor: Function) {
    console.log('WithTemplate', '3 step Rendering template, bottom first');

    const hookEl = document.getElementById(hookId);
    const p = constructor;
    if (hookEl) {
      hookEl.innerHTML = template;
      hookEl.querySelector('h1')!.innerText = p.name;
    }
  };
}
// @Logger
@Logger2('decorator factory')
@WithTemplate('<h1>Header H1 made by decorator WithTemplate<h1/>', 'heading')
class Person {
  name = 'Max';

  constructor() {
    console.log('creating person object...');
  }
}

const person = new Person();

console.log(person);

// 8/109 Diving into property decorators
function Log(target: any, propertyName: string | symbol) {
  console.log('Property decorator!');
  console.log(target, propertyName);
}

// 9/109 Accessor and Parameter decorators
function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log('Accessor decorator !');
  console.log(target, name, descriptor);
}

function Log3(
  target: any,
  name: string | symbol,
  descriptor: PropertyDescriptor
) {
  console.log('Method decorator !');
  console.log(target, name, descriptor);
}

function Log4(target: any, name: string | symbol, position: number) {
  console.log('Parameter decorator !');

  console.log(target, name, position);
}

class Product {
  @Log
  _price: number;

  @Log2
  set price(val: number) {
    if (val <= 0) return;
    this._price = val;
  }

  constructor(title: string, _price: number) {
    this._price = _price;
  }

  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this.price * (1 + tax);
  }
}

const product = new Product('mleko', 4);
