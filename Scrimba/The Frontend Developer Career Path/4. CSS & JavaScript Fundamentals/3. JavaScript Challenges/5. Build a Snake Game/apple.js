/*jshint esversion:6*/
/* eslint-env es6 */
import { squaresPlayground } from './grid.js';
import { removeApple, changeScore, getRandomIntInclusive } from './display.js';
import { displayApple } from './display.js';
import { snakeBodyPosition } from './update.js';

export let applePosition = 0;
export let snailPosition = 0;

export function setApplePosition(position) {
  applePosition = position;
}

//generate new apple index
export function getAppleRandomPosition() {
  applePosition = getRandomIntInclusive(0, squaresPlayground.length - 1);
  // check if every snakeBodyPosition index is diffrent from applePosition
  let different = snakeBodyPosition.every(isDifferentIndex);
  // if isn't assign applePosition again
  if (!different) {
    return getAppleRandomPosition();
  }
}

//generate new apple index
export function getSnailRandomPosition() {
  snailPosition = getRandomIntInclusive(0, squaresPlayground.length - 1);
  // check if every snakeBodyPosition index is diffrent from applePosition
  let different = snakeBodyPosition.every(isDifferentSnailIndex);
  // if isn't assign applePosition again
  if (!different) {
    return getSnailRandomPosition();
  }
}

function isDifferentIndex(index) {
  return index !== applePosition;
}

function isDifferentSnailIndex(index) {
  return index !== snailPosition;
}

export let appleAge = 0;

export function setAppleAge(age) {
  appleAge = age;
}

export let isAppleOld = false;
export let isAppleMaxOld = false;

//old apple blinks, maxold apple disapear
export function appleDisappearWhenOld(oldAge = 30) {
  if (appleAge <= 1) {
    isAppleMaxOld = false;
    isAppleOld = false;
  }

  if (appleAge === oldAge - 10) {
    isAppleOld = true;
  }

  if (appleAge === oldAge) {
    isAppleOld = false;
    isAppleMaxOld = true;
    appleAge = 0;
  }
}
