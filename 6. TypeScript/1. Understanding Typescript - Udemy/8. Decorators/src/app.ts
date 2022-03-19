// 8/105 First Class Decorator

// decorators runs when class is created
function Logger(constructor: Function) {
  console.log('Logging...');
  console.log(constructor);
}

@Logger
class Person {
  name = 'Max';

  constructor() {
    console.log('creating person object...');
  }
}

const person = new Person();

console.log(person);
