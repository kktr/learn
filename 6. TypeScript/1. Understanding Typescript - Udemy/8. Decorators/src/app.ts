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
@Logger
@Logger2('decorator factory')
class Person {
  name = 'Max';

  constructor() {
    console.log('creating person object...');
  }
}

const person = new Person();

console.log(person);
