// 7/94 Built-in Generics & What are Generics?

// Array<T> - Generic
const names: Array<string> = ['Stachu', 'Janusz'];
const names2: string[] = ['Stachu', 'Janusz'];

const promise: Promise<string> = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('This is done');
  }, 2000);
});

// 7/95 Creating a Generic Function

function merge<T, U>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

console.log(merge({ name: 'Max' }, { age: 30 }));

const mergedObj = merge({ name: 'Max' }, { age: 30 });
console.log(mergedObj.age);

// 7/96 Working with constrains

function merge2<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

console.log(merge({ name: 'Max' }, { age: 30 }));

// error
// const mergedObj2 = merge2({ name: 'Max' }, 30);
// console.log(mergedObj2.age);

//  7/97 Another generic function

interface Lengthy {
  length: number;
}

function countAndDescribe<T extends Lengthy>(element: T) {
  let descriptionText = 'Got no value.';
  if (element.length === 1) {
    descriptionText = 'Got 1 element.';
  } else if (element.length > 1) {
    descriptionText = `Got ${element.length} elements`;
  }
  return [element, descriptionText];
}

console.log(countAndDescribe('Hi there'));

// 7/98 The "keyof" Constraint

function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  console.log('Value: ' + obj[key]);

  return 'Value: ' + obj[key];
}

extractAndConvert({ name: 'Max' }, 'name');

// 7/99 Generic classes

class DataStorage<T extends number | string | boolean> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();

textStorage.addItem('text data');

const numberStorage = new DataStorage<number>();

numberStorage.addItem(2);
console.log(numberStorage.getItems());

//  7/101 Generic Utility Types
interface LearningGoal {
  title: string;
  description: string;
  date: Date;
}

function learningGoal(
  title: string,
  description: string,
  date: Date
): LearningGoal {
  let learningGoal: Partial<LearningGoal> = {};
  learningGoal.title = title;
  learningGoal.description = description;
  learningGoal.date = date;

  return learningGoal as LearningGoal;
}

const names3: Readonly<string[]> = ['Michał', 'Zuzanna'];

// names3.push('Krystian');

// Required

type JobPosition = 'trainee' | 'junior' | 'mid' | 'senior';

type Employee = {
  name: string;
  lastName: string;
  id: number;
  jobPosition?: JobPosition;
};

function addEmployee(employee: Required<Employee>) {
  console.log(employee);
}

const krystian: Employee = { name: 'Krystian', lastName: 'Kat', id: 777 };

// addEmployee(krystian);

krystian.jobPosition = 'trainee';
console.log(krystian);

const krystian2: Required<Employee> = {
  name: 'Krystian',
  lastName: 'Kat',
  id: 777,
  jobPosition: 'trainee',
};

addEmployee(krystian2);

// Record

type Calibers = '9mm' | '5,56mm' | '44"';
type BrandKey = 'cz' | 'glock' | 'sw';

interface Weapon {
  name: string;
  range: number;
  caliber: Calibers;
}

const myWeapons: Record<BrandKey, Weapon> = {
  cz: {
    name: 'CZ Shadow 2',
    range: 100,
    caliber: '9mm',
  },
  glock: {
    name: '17',
    range: 75,
    caliber: '9mm',
  },
  sw: {
    name: '629',
    range: 150,
    caliber: '44"',
  },
};

// 6/102 Generics Types vs Union Types

// Union types don't work in that case
// class DataStorage2 {
//   private data: number[] | string[] | boolean[] = [];

//   addItem(item: number | string | boolean) {
//     this.data.push(item);
//   }

//   removeItem(item: number[] | string[] | boolean[]) {
//     this.data.splice(this.data.indexOf(item), 1);
//   }

//   getItems() {
//     return [...this.data];
//   }
// }
