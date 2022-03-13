const tasks: Task[] = [
  new Task('Learn Typescript', Category.Programing),
  new Task('Learn React', Category.Programing),
  new Task('get hired by elPassion', Category.Work),
];

const addTask = (task: Task) => {
  tasks.push(task);
};
