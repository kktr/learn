// 6/83 Intersection types

type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

type ElevatedEmployee = Admin & Employee;
// interface ElevatedEmployee extends Employee, Admin {}

const e1: ElevatedEmployee = {
  name: 'Max',
  privileges: ['create-server'],
  startDate: new Date(),
};

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;

// 6/84 More on type guards

function add(a: Combinable, b: Combinable): number {
  if (typeof a === 'string' || typeof b === 'string') {
    return Number(a) + Number(b);
  }
  return a + b;
}

function printEmployee(emp: Employee | Admin) {
  if ('privileges' in emp) {
    console.log(emp.privileges);
  }
  if ('startDate' in emp) {
    console.log(emp.startDate);
  }
}

class Car {
  drive() {
    console.log('Driving...');
  }
}

class Truck {
  drive() {
    console.log('Driving a truck...');
  }
  loadCargo(amount: number) {
    console.log('Loading cargo ...' + amount);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  if (vehicle instanceof Truck) {
    vehicle.loadCargo(100);
  }
}

// 6/85 Discriminated Unions

interface Cat {
  type: 'ground';
  runningSpeed: number;
}
interface Eagle {
  type: 'air';
  flightingSpeed: number;
}
interface GoldenFish {
  type: 'water';
  swimmingSpeed: number;
}

type Animal = Cat | Eagle | GoldenFish;

function moveAnimal(animal: Animal) {
  let speed;
  switch (animal.type) {
    case 'air':
      speed = animal.flightingSpeed;
      break;
    case 'ground':
      speed = animal.runningSpeed;
      break;
    case 'water':
      speed = animal.swimmingSpeed;
  }
  console.log('Moving at speed:' + speed);
}

// 6/86 Type Casting

const userInputElement = <HTMLInputElement>document.getElementById('input');
const userInputElement2 = document.getElementById(
  'input2'
)! as HTMLInputElement;
const userInputElement3 = document.getElementById('input3');

userInputElement.value = 'Hi there!';
userInputElement2.value = 'Hi there 2!';
if (userInputElement3) {
  (userInputElement3 as HTMLInputElement).value = 'Hi there 3!';
}

// 6/87 Index Properties

interface ErrorContainer {
  [prop: string]: string;
}

const errorBag: ErrorContainer = {
  email: 'Not a valid email!',
  username: 'Muse start with a capital character',
};
