import { Task } from '../classes/task.js';
import { tasksListEl } from './create-todo.helper.js';

export function renderTasks(tasks: Task[]) {
  tasks.forEach((taskEl) => {
    const taskItemEl = document.createElement('li');
    const taskLabelEl = document.createElement('label');
    const taskCheckboxEl = document.createElement('input');

    tasksListEl.appendChild(taskItemEl);

    taskItemEl.className = `tasks__task tasks__task--${taskEl.category}`;
    taskItemEl.appendChild(taskLabelEl);
    taskItemEl.appendChild(taskCheckboxEl);

    taskLabelEl.htmlFor = taskEl.name;
    taskLabelEl.innerText = taskEl.name;

    taskCheckboxEl.type = 'checkbox';
    taskCheckboxEl.id = taskEl.name;
    taskCheckboxEl.className = 'task-checkbox';
  });
}
