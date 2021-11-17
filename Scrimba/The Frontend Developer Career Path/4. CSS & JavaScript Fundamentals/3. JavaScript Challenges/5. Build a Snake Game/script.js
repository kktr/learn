/*jshint esversion:6*/
/* eslint-env es6 */
import { createGridPlayground, createGridBackground } from './grid.js';

import {
  updateGame,
  resetGameInterval,
  resetValues,
  snakeMove
} from './update.js';

import {
  firstDisplay,
  startDisplay,
  outputDisplay,
  removeDisplay,
  output
} from './display.js';

import { updateSnake, isSnakeAlive, isSnakeDead } from './snake.js';

import { appleDisappearWhenOld } from './apple.js';

createGridPlayground();
createGridBackground();

firstDisplay();

//after pressing the start button restore the game state to the initial values
export let isGameStart = false;
export function setGameStart(value) {
  isGameStart = value;
}

export function startGame() {
  if (isSnakeDead) {
    isGameStart = true;
    resetGameInterval();
    removeDisplay();
    resetValues();
    startDisplay();
  }
}

export function game() {
  isSnakeAlive();
  snakeMove();
  updateSnake();
  appleDisappearWhenOld();
  updateGame();
  output();
}
