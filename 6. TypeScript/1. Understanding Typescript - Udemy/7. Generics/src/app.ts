// 7/94 Built-in Generics & What are Generics?

// Array<T> - Generic
const names: Array<string> = ['Stachu', 'Janusz'];
const names2: string[] = ['Stachu', 'Janusz'];

const promise: Promise<string> = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('This is done');
  }, 2000);
});
