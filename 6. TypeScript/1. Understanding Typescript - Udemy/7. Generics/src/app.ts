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
