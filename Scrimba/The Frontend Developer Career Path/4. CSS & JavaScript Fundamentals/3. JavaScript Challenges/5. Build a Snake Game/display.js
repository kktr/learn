/*jshint esversion:6*/
/* eslint-env es6 */
import { isGameStart, setGameStart } from './script.js';

import { squaresPlayground, squaresBackground } from './grid.js';

import {
  isSnakeEatApple,
  isSnakeAfraid,
  isSnakeHungry,
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

export function firstDisplay() {
  //adding body and head classes to the new snake
  displaySnake();
  //displaying a new game score
  displayScore();
}

export function startDisplay() {
  firstDisplay();
  //adding styling to a square with a new apple
  displayApple();
}

export function output() {
  outputDisplay();
  outputAudio();
  setGameStart(false);
}

export function outputDisplay() {
  removeSnakeHeadDisplay();
  gameMessage.textContent = '';
  //remove styling from last element
  squaresPlayground[snakeTailPosition].classList.remove('snake-body');
  //add styling so we can see it and add difrent head style to the head
  changeSnakeHeadStyle('snake-body', 'snake-head');
  snakeHeadRotation();

  if (isSnakeDead) {
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
      removeApple();
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

let audiosEat = [];
let audioHungry = new Audio('audio/hungry.mp3');
let audioDead = new Audio('audio/dead.mp3');

//creating audio elements and placing them in the audiosEat array,
//they are playing when the snake eats an apple

addEatAudios();
export function outputAudio() {
  if (isSnakeDead) {
    //play audio when snake dead
    audioDead.play();
    //normal move
  } else {
    if (isGameStart) {
      audioHungry.play();
    }
    if (isSnakeEatApple) {
      //play random eat audio when snake eats the apple
      playEatAudio();
    }

    if (isPowerUpFullLoop) {
    }

    if (isSnakeAfraid) {
    }
    if (isSnakeHungry) {
      audioHungry.play();
    }
  }
}

function addEatAudios() {
  for (let i = 0; i < 10; i++) {
    audiosEat[i] = new Audio(`audio/eat${i + 1}.mp3`);
  }
}

function playEatAudio() {
  let audioIndex = getRandomIntInclusive(1, 10);
  audiosEat[audioIndex].play();
}

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
let snakeHead = [];

export function removeStyleFromSnakeHeadPosition(...classes) {
  if (isSnakeDead) {
    snakeHead = snakeHeadPosition;
  } else {
    snakeHead = snakeBodyPosition[1];
  }

  for (let value of classes) {
    squaresPlayground[snakeHead].classList.remove(value);
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
