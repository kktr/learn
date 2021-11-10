/*jshint esversion:6*/
/* eslint-env es6 */
import { squaresPlayground } from './grid.js';

import { snakeBodyPosition, snakeHeadPosition } from './script.js';

import {
  applePosition,
  appleAge,
  setAppleAge,
  getAppleRandomPosition
} from './apple.js';

import { directionOfMovement, directions } from './input.js';

const scoreDisplay = document.getElementById('score');
export let score = 0;

export function displaySnake() {
  snakeBodyPosition.forEach(index =>
    squaresPlayground[index].classList.add('snake-body')
  );
  changeSnakeHeadStyle('snake-head');
}

export function changeSnakeHeadStyle(...classes) {
  for (let value of classes) {
    squaresPlayground[snakeHeadPosition].classList.add(value);
  }
}

export function snakeHeadRotation() {
  if (directionOfMovement === directions.up) {
    changeSnakeHeadStyle('rotate-up');
  } else if (directionOfMovement === directions.down) {
    changeSnakeHeadStyle('rotate-down');
  } else if (directionOfMovement === directions.right) {
    changeSnakeHeadStyle('rotate-right');
  } else if (directionOfMovement === directions.left) {
    changeSnakeHeadStyle('rotate-left');
  }
}

export function displayScore() {
  scoreDisplay.textContent = score;
}

export function changeScore(points = 1) {
  //add ten to the score
  score += points;
  if (score < 0) {
    score = 0;
  }
  //display our score
  scoreDisplay.textContent = score;
}

export function removeDisplay() {
  removeSnakeHeadDisplay();
  //removes snake-body and snake-body-dead styling classes from previous snake
  removeSnakeBodyDisplay();
  //remove previous apple
  removeApple();
}

export function removeSnakeHeadDisplay() {
  //removes head rotation classes from previous snake
  removeSnakeHeadRotate();
  //removes head styling classes from previous snake
  removeSnakeHeadStyle();
}

function removeSnakeHeadRotate() {
  removeStyleFromSnakeHeadPosition(
    'rotate-up',
    'rotate-down',
    'rotate-right',
    'rotate-left'
  );
}

export function removeSnakeHeadStyle() {
  removeStyleFromSnakeHeadPosition(
    'snake-head-eat',
    'snake-head',
    'snake-head-dead',
    'snake-head-afraid',
    'snake-head-full-loop',
    'snake-fade',
    'snake-head-hungry'
  );
}

export function removeStyleFromSnakeHeadPosition(...classes) {
  for (let value of classes) {
    squaresPlayground[snakeHeadPosition].classList.remove(value);
  }
}

function removeSnakeBodyDisplay() {
  snakeBodyPosition.forEach(index =>
    squaresPlayground[index].classList.remove('snake-body')
  );
  snakeBodyPosition.forEach(index =>
    squaresPlayground[index].classList.remove('snake-body-dead')
  );
}

export function displayApple() {
  getAppleRandomPosition();
  squaresPlayground[applePosition].classList.add('apple');
}

export function removeApple() {
  //reset apple age
  setAppleAge(0);
  //removing the apple styling from the previous apple square
  squaresPlayground[applePosition].classList.remove(
    'apple',
    'apple-blink',
    'apple-after-dead'
  );
}
