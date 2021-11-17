/*jshint esversion:6*/
/* eslint-env es6 */
import { game } from './script.js';

import {
  isSnakeEatApple,
  isSnakeAfraid,
  isSnakeHungry,
  isSnakeSuperHungry,
  isPowerUpFullLoop,
  isSnakeDead,
  setIsSnakeDead
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
  displayApple
} from './display.js';

export let snakeTailPosition;
export let movesWithoutApple = 0;
export let snakeBodyPosition = [2, 1, 0];
export let snakeHeadPosition = snakeBodyPosition[0];

let gameIntervalTime = 1000;
let speed = 1;
let timerId = 0;

export function snakeMove() {
  //grow our snake array
  if (isSnakeEatApple) {
    snakeBodyPosition.push(snakeTailPosition);
  }
  if (!isSnakeDead) {
    //remove last element from our snakeBodyPosition array
    snakeTailPosition = snakeBodyPosition.pop();
    //add square in directionOfMovement we are heading
    snakeBodyPosition.unshift(snakeHeadPosition + directionOfMovement);
    //reset snakeHead value
    snakeHeadPosition = snakeBodyPosition[0];
  }
}

export function updateGame() {
  if (isSnakeDead) {
    //stop the game by stopping function game gameIntervalTime
    clearInterval(timerId);
  } else {
    if (isSnakeEatApple) {
      setAppleAge(0);
      // //play random eat audio when snake eats the apple
      // playEatAudio();
      //add 100 to the score
      changeScore(100);
      //speed up our snake percentage value
      changeGameSpeed(5);
      //zero movesWithoutApple
      movesWithoutApple = 0;
    } else {
      changeScore();
      //add 1 to movesWithoutApple
      movesWithoutApple += 1;
      //add 1 to appleAge;
      setAppleAge(appleAge + 1);
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
export function resetGameInterval() {
  clearInterval(timerId);
  gameIntervalTime = 500;
  timerId = setInterval(game, gameIntervalTime);
}

export function resetValues() {
  setIsSnakeDead(false);
  snakeBodyPosition = [2, 1, 0];
  snakeHeadPosition = snakeBodyPosition[0];
  setDirectionOfMovement();
  changeScore(-score);
  speed = 1;
  movesWithoutApple = 0;
  setAppleAge(0);
}
