// 8/105 First Class Decorator

// decorators runs when class is created
function Logger(constructor: Function) {
  console.log('Logging...');
  console.log(constructor);
}

// 8/106 Working with decorator factories
function Logger2(logString: string) {
  return function (constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

// 8/107 Building more usefully decorators
function WithTemplate(template: string, hookId: string) {
  return function (constructor: Function) {
    const hookEl = document.getElementById(hookId);
    const p = constructor;
    if (hookEl) {
      hookEl.innerHTML = template;
      hookEl.querySelector('h1')!.innerText = p.name;
    }
  };
}
// @Logger
// @Logger2('decorator factory')
@WithTemplate('<h1>Header H1 made by decorator WithTemplate<h1/>', 'heading')
class Person {
  name = 'Max';

  constructor() {
    console.log('creating person object...');
  }
}

const person = new Person();

console.log(person);
