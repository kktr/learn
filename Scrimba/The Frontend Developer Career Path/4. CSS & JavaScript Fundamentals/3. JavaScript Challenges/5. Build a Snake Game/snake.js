/*jshint esversion:6*/
/* eslint-env es6 */
import {
  createGridPlayground,
  createGridBackground,
  squaresPlayground,
  squaresBackground
} from './grid.js';

import {
  directionOfMovement,
  directions,
  width,
  setDirectionOfMovement
} from './input.js';

import {
  removeDisplay,
  removeSnakeHeadDisplay,
  removeSnakeHeadStyle,
  removeStyleFromSnakeHeadPosition,
  removeApple,
  displaySnake,
  displayScore,
  changeSnakeHeadStyle,
  changeScore,
  snakeHeadRotation,
  score,
  displayApple
} from './display.js';

import {
  snakeHeadPosition,
  movesWithoutApple,
  snakeBodyPosition
} from './update.js';

export function updateSnake() {
  snakeEatApple();
  snakeEatSnail();
  snakeAfraid();
  snakeHungry();
  powerUpFullLoop();
}

let isAlive = true;
export let isSnakeDead = true;
export function setIsSnakeDead(set) {
  isSnakeDead = set;
}

export function isSnakeAlive() {
  if (
    isSnakeHitBottom() ||
    isSnakeHitRightWall() ||
    isSnakeHitLeftWall() ||
    isSnakeHitTop() ||
    isSnakeHitHimself()
  ) {
    isSnakeDead = true;
  } else {
    isSnakeDead = false;
  }
}

function isSnakeHitBottom() {
  return isSnakeOnBottomBorder() && directionOfMovement === directions.down;
}

function isSnakeOnBottomBorder() {
  return snakeHeadPosition + width >= width * width;
}

function isSnakeHitRightWall() {
  return isSnakeOnRightBorder() && directionOfMovement === directions.right;
}
function isSnakeOnRightBorder() {
  return snakeHeadPosition % width === width - 1;
}

function isSnakeHitLeftWall() {
  return isSnakeOnLeftBorder() && directionOfMovement === directions.left;
}
function isSnakeOnLeftBorder() {
  return snakeHeadPosition % width === 0;
}

function isSnakeHitTop() {
  return isSnakeOnTopBorder() && directionOfMovement === directions.up;
}

function isSnakeOnTopBorder() {
  return snakeHeadPosition - width < 0;
}

function isSnakeHitHimself() {
  return squaresPlayground[
    snakeHeadPosition + directionOfMovement
  ].classList.contains('snake-body');
}

export let isSnakeAfraid = false;

function snakeAfraid() {
  if (
    squaresBackground[snakeHeadPosition].classList.contains('snake-tombstone')
  ) {
    isSnakeAfraid = true;
  } else isSnakeAfraid = false;
}

export let isSnakeEatApple = false;

function snakeEatApple() {
  //if snake head go into apple
  if (squaresPlayground[snakeHeadPosition].classList.contains('apple')) {
    isSnakeEatApple = true;
  } else {
    isSnakeEatApple = false;
  }
}
export let isSnakeEatSnail = false;

function snakeEatSnail() {
  //if snake head go into apple
  if (squaresPlayground[snakeHeadPosition].classList.contains('snail')) {
    isSnakeEatSnail = true;
  } else {
    isSnakeEatSnail = false;
  }
}

export let isSnakeHungry = false;
export let isSnakeSuperHungry = false;

function snakeHungry(moves = 50) {
  if (movesWithoutApple === moves) {
    isSnakeHungry = true;
  } else if (movesWithoutApple > moves) {
    isSnakeSuperHungry = true;
  } else {
    isSnakeHungry = false;
    isSnakeSuperHungry = false;
  }
}

let snakeRoute = [];
// prettier-ignore
let fullLoop = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 19, 29, 39, 49, 59, 69, 79, 89,
                99, 98, 97, 96, 95, 94, 93, 92, 91, 90, 80, 70, 60, 50, 40, 30,
                20, 10];

export let isPowerUpFullLoop = false;
// if snake made full clockwise loop, from square 0 to squar 10, change score and speed
function powerUpFullLoop() {
  //track snake route
  snakeRoute.push(snakeHeadPosition);
  //loop through snakeRoute and fullLoop to check if they are identical
  for (let i = 0; i < snakeRoute.length; i++) {
    //clear snakeRoute if snakeRoute is difrent from fullLoop
    if (snakeRoute[i] != fullLoop[i]) {
      isPowerUpFullLoop = false;
      snakeRoute = [];
      return;
    } else if (snakeRoute.length == fullLoop.length) {
      isPowerUpFullLoop = true;
    }
  }
}
