/*jshint esversion:6*/
/* eslint-env es6 */
import { squaresPlayground } from './grid.js';
import { removeApple, changeScore } from './display.js';

import {
  audiosEat,
  getRandomIntInclusive,
  snakeBodyPosition
} from './script.js';

import { displayApple } from './display.js';

export function addEatAudios() {
  for (let i = 0; i < 10; i++) {
    audiosEat[i] = new Audio(`audio/eat${i + 1}.mp3`);
  }
}

export let applePosition = 0;

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

function isDifferentIndex(index) {
  return index !== applePosition;
}

export let appleAge = 0;

export function setAppleAge(age) {
  appleAge = age;
}
//old apple disaper
export function appleDisappearWhenOld(oldAge = 30, score = -10) {
  if (appleAge === oldAge - 10) {
    squaresPlayground[applePosition].classList.add('apple-blink');
  }

  if (appleAge === oldAge) {
    squaresPlayground[applePosition].classList.remove('apple-blink');
    removeApple();
    getAppleRandomPosition();
    displayApple();
    changeScore(score);
  }
}
