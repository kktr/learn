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

class Product {
  @Log
  price: number;

  setPrice(val: number) {
    if (val <= 0) return;
    this.price = val;
  }

  constructor(title: string, price: number) {
    this.price = price;
  }

  getPriceWithTax(tax: number) {
    return this.price * (1 + tax);
  }
}

const product = new Product('mleko', 4);
