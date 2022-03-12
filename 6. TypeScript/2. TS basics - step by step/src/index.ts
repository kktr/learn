const taskNameInputEl = document.querySelector('#task-name');
const addButtonEl = document.querySelector('.form__submit-button');
const taskContainer = document.querySelector('.task-container');

class Task {
  name;
  category;
  doneStatus;

  constructor(
    name: string,
    category: Category = Category.General,
    doneStatus: boolean = false
  ) {
    this.name = name;
    this.category = category;
    this.doneStatus = doneStatus;
  }
}

const tasks: Task[] = [
  new Task('Learn Typescript', Category.Programing),
  new Task('Learn React', Category.Programing),
  new Task('get hired by elPassion', Category.Work),
];
