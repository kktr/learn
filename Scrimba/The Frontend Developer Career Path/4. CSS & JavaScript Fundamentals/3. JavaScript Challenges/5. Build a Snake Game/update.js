/*jshint esversion:6*/
/* eslint-env es6 */
import { game } from './script.js';

import {
  isSnakeEatApple,
  isSnakeAfraid,
  isSnakeHungry,
  isSnakeSuperHungry,
  isPowerUpFullLoop,
  isSnakeDead
} from './snake.js';

import {
  // getAppleRandomPosition,
  // applePosition,
  // appleDisappearWhenOld,
  isAppleOld,
  isAppleMaxOld,
  appleAge,
  setAppleAge
} from './apple.js';

import {
  directionOfMovement,
  // directions,
  // width,
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
  displayApple,
  display3000
} from './display.js';

export let snakeTailPosition;
export let movesWithoutApple = 0;
export let snakeBodyPosition = [2, 1, 0];
export let snakeHeadPosition = snakeBodyPosition[0];

let gameIntervalTime = 1000;
let speed = 1;
let timerId = 0;

let audiosEat = [];
let audioHungry = new Audio('audio/hungry.mp3');
let audioDead = new Audio('audio/dead.mp3');

function addEatAudios() {
  for (let i = 0; i < 10; i++) {
    audiosEat[i] = new Audio(`audio/eat${i + 1}.mp3`);
  }
}
//creating audio elements and placing them in the audiosEat array,
//they are playing when the snake eats an apple
addEatAudios();

const startButton = document.getElementById('start');

//after pressing the start button restore the game state to the initial values
export function startGame() {
  audioHungry.play();
  //reset gameIntervalTime
  resetGameInterval();

  removeDisplay();
  //restore variables to their initial values
  resetValues();
  //adding body and head classes to the new snake
  displaySnake();
  //displaying a new game score
  displayScore();

  //adding styling to a square with a new apple
  displayApple();
}

startButton.addEventListener('click', startGame);

export function update3000() {
  changeScore();
  //add 1 to movesWithoutApple
  movesWithoutApple += 1;
  //add 1 to appleAge;
  setAppleAge(appleAge + 1);

  if (isSnakeEatApple) {
    //grow our snake array
    snakeBodyPosition.push(snakeTailPosition);
    setAppleAge(0);
    //play random eat audio when snake eats the apple
    playEatAudio();
    //add 100 to the score
    changeScore(100);
    //speed up our snake percentage value
    changeGameSpeed(5);
    //zero movesWithoutApple
    movesWithoutApple = 0;
  }

  if (isPowerUpFullLoop) {
    changeGameSpeed(-20);
    changeScore(-500);
  }

  if (isSnakeAfraid) {
    //speed up our snake
    changeGameSpeed(2.1);
    //add to the score
    changeScore(9);
  }
  if (isSnakeHungry) {
    audioHungry.play();
  }

  if (isSnakeSuperHungry) {
    changeScore(-21);
    //speed up our snake
    changeGameSpeed(1);
    //zero movesWithoutApple
  }

  if (isAppleOld) {
  }

  if (isAppleMaxOld) {
    changeScore(-10);
  }

  if (isSnakeDead) {
    //stop the game by stopping function game gameIntervalTime
    clearInterval(timerId);
    //play audio when snake dead
    audioDead.play();
    //normal moves
  } else {
    //remove last element from our snakeBodyPosition array
    snakeTailPosition = snakeBodyPosition.pop();
    //add square in directionOfMovement we are heading
    snakeBodyPosition.unshift(snakeHeadPosition + directionOfMovement);
    //reset snakeHead value
    snakeHeadPosition = snakeBodyPosition[0];
  }
}

function changeGameSpeed(percent = 1) {
  //clear previous interval
  clearInterval(timerId);
  //calculate new interval, if up = 1 the game will be 1% faster
  gameIntervalTime = gameIntervalTime * speed * (1 - percent / 100);
  //set new Interval
  timerId = setInterval(game, gameIntervalTime);
}

//removing the old time interval, returning it to its initial value
//  and assigning it to the game function
function resetGameInterval() {
  clearInterval(timerId);
  gameIntervalTime = 500;
  timerId = setInterval(game, gameIntervalTime);
}

function resetValues() {
  snakeBodyPosition = [2, 1, 0];
  snakeHeadPosition = snakeBodyPosition[0];
  setDirectionOfMovement();
  changeScore(-score);
  speed = 1;
  movesWithoutApple = 0;
  setAppleAge(0);
}

function playEatAudio() {
  let audioIndex = Math.floor(Math.random() * 10);
  audiosEat[audioIndex].play();
}
