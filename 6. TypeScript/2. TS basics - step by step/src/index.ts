import { Category } from './store/types.js';
import { Task } from './classes/task.js';
import { renderTasks } from './helpers/render-tasks.helper.js';
import {
  addButtonEl,
  categoriesRadioButtons,
  inputTaskEl,
  createTodoEl,
} from './helpers/create-todo.helper.js';

const tasks: Task[] = [
  new Task('Learn Typescript', Category.Programing),
  new Task('Learn React', Category.Programing),
  new Task('get hired by elPassion', Category.Work),
];

const addTask = (task: Task) => {
  tasks.push(task);
};
