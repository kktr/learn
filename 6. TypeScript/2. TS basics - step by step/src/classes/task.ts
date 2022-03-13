import { Category } from '../store/types.js';

export class Task {
  name;
  category;
  doneStatus;

  constructor(
    name: string,
    category: string = Category.General.toString(),
    doneStatus: boolean = false
  ) {
    this.name = name;
    this.category = category;
    this.doneStatus = doneStatus;
  }
}
