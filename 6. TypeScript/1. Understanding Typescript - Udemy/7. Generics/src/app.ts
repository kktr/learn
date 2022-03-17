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
