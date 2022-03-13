import { Category } from '../store/types.js';

const todoEl = document.createElement('div');
const formEl = document.createElement('form');
const labelTaskEl = document.createElement('label');
export const inputTaskEl = document.createElement('input');
const categoriesContainerEl = document.createElement('div');
export const categoriesRadioButtons: HTMLInputElement[] = [];
export const addButtonEl = document.createElement('button');
const tasksContainerEl = document.createElement('div');
export const tasksListEl = document.createElement('ul');

const categories: Category[] = [
  Category.General,
  Category.Gym,
  Category.Hobby,
  Category.Programing,
  Category.Social,
  Category.Work,
];

export function createTodoEl(): void {
  document.body.appendChild(todoEl);

  todoEl.className = 'todo';
  todoEl.appendChild(formEl);

  formEl.className = 'form';
  formEl.name = 'form';
  todoEl.appendChild(formEl);
  formEl.appendChild(labelTaskEl);
  formEl.appendChild(inputTaskEl);
  formEl.appendChild(addButtonEl);
  todoEl.appendChild(tasksContainerEl);

  labelTaskEl.htmlFor = 'task-name';
  labelTaskEl.innerText = 'Task: ';

  inputTaskEl.type = 'text';
  inputTaskEl.id = 'task-name';
  inputTaskEl.name = 'task-name';
  inputTaskEl.required = true;

  categoriesContainerEl.className = 'form__radios-container';

  addButtonEl.type = 'submit';
  addButtonEl.className = 'form__button';
  addButtonEl.name = 'add-task';
  addButtonEl.innerText = 'Add';

  tasksContainerEl.innerHTML = `
  <p>TODO: </p>
  `;
  tasksContainerEl.appendChild(tasksListEl);
  tasksContainerEl.className = 'tasks';

  categories.forEach((category) => {
    const categoryContainerEl = document.createElement('div');
    const categoryInputEl = document.createElement('input');
    const categoryLabelEl = document.createElement('label');

    formEl.appendChild(categoryContainerEl);

    categoryContainerEl.className = `form__radio-container form__radio-container--${category}`;
    categoryContainerEl.appendChild(categoryInputEl);
    categoryContainerEl.appendChild(categoryLabelEl);

    categoryInputEl.className = `form__radio-input test form__radio-input--${category}`;
    categoryInputEl.type = 'radio';
    categoryInputEl.id = category;
    categoryInputEl.value = category;
    categoryInputEl.name = 'categories';

    categoryLabelEl.htmlFor = category;
    categoryLabelEl.innerText = category;

    categoriesRadioButtons.push(categoryInputEl);
  });
}
