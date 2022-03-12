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
    doneStatus: boolean
  ) {
    this.name = name;
    this.category = category;
    this.doneStatus = doneStatus;
  }
}
