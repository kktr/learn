/*jshint esversion:6*/
/* eslint-env es6 */
import { squaresPlayground, squaresBackground } from './grid.js';
import {
  isSnakeEatApple,
  isSnakeAfraid,
  isSnakeSuperHungry,
  isPowerUpFullLoop,
  isSnakeDead
} from './snake.js';

import {
  applePosition,
  appleAge,
  setAppleAge,
  getAppleRandomPosition,
  isAppleOld,
  isAppleMaxOld
} from './apple.js';

import { directionOfMovement, directions } from './input.js';

import {
  snakeBodyPosition,
  snakeHeadPosition,
  snakeTailPosition
} from './update.js';

export function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const scoreDisplay = document.getElementById('score');
const gameMessage = document.querySelector('.game-message');

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

export let score = 0;

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
  // setAppleAge(0);
  //removing the apple styling from the previous apple square
  squaresPlayground[applePosition].classList.remove(
    'apple',
    'apple-blink',
    'apple-after-dead'
  );
}

export function display3000() {
  gameMessage.textContent = '';
  //remove styling from last element
  squaresPlayground[snakeTailPosition].classList.remove('snake-body');
  //add styling so we can see it and add difrent head style to the head
  changeSnakeHeadStyle('snake-body', 'snake-head');

  snakeHeadRotation();

  if (isSnakeDead) {
    console.log('isSnakeDead = true Display');
    //add dead-head style into snake head square
    changeSnakeHeadStyle('snake-head-dead');
    //display random tombstone after snake dead
    randomSnakeTombstoneDisplayInBg();
    //add snake-body-dead for fade out effect
    snakeBodyPosition.forEach(index =>
      squaresPlayground[index].classList.add('snake-body-dead')
    );
    //fade out apple after snake dead
    squaresPlayground[applePosition].classList.add('apple-after-dead');
    gameMessage.textContent = 'Game Over!';
  } else {
    if (isSnakeEatApple) {
      //remove the class of apple
      removeStyleFromSnakeHeadPosition('apple', 'apple-blink');
      //grow our snake by adding class of snake to it
      // squaresPlayground[snakeTailPosition].classList.add('snake-body');
      //change snake head style when snake eat apple
      changeSnakeHeadStyle('snake-head-eat');
    }
    if (isPowerUpFullLoop) {
      changeSnakeHeadStyle('snake-head-full-loop');
    }

    if (isSnakeAfraid) {
      changeSnakeHeadStyle('snake-head-afraid');
    }

    if (isSnakeSuperHungry) {
      //add hungry style to snake head
      changeSnakeHeadStyle('snake-head-hungry');
    }

    if (isAppleOld) {
      squaresPlayground[applePosition].classList.add('apple-blink');
    } else {
      squaresPlayground[applePosition].classList.remove('apple-blink');
    }
    if (isAppleMaxOld || isSnakeEatApple) {
      removeApple();
      displayApple();
    }
  }
}

function randomSnakeTombstoneDisplayInBg() {
  //create a random index to select a random snake-tombstone img
  let tombstoneIndex = getRandomIntInclusive(1, 10);
  //check if there isn't a tombstone, if not, display a random tombstone
  if (
    !squaresBackground[snakeHeadPosition].classList.contains('snake-tombstone')
  ) {
    squaresBackground[snakeHeadPosition].classList.add(
      'snake-tombstone',
      `snake-tombstone-${tombstoneIndex}`
    );
  }
}
