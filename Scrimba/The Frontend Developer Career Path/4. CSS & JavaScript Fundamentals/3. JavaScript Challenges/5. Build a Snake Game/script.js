/*jshint esversion:6*/
/* eslint-env es6 */
import { createGridPlayground, createGridBackground } from './grid.js';

import {
  displaySnake,
  displayScore,
  display3000,
  snakeHeadRotation,
  removeSnakeHeadDisplay
} from './display.js';

import { update3000 } from './update.js';

import { updateSnake, isSnakeAlive } from './snake.js';

import { appleDisappearWhenOld } from './apple.js';

createGridPlayground();

createGridBackground();

//first display
displaySnake();
displayScore();

export function game() {
  isSnakeAlive();
  //removes head rotation classes from previous snake squares
  //removes head styling classes from previous snake squares
  removeSnakeHeadDisplay();

  update3000();
  updateSnake();
  //an apple disappears if it is not eaten for the specified number of moves
  appleDisappearWhenOld();

  display3000();
}
