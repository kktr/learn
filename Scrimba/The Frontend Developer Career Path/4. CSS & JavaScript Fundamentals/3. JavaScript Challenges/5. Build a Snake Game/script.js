/*jshint esversion:6*/
/* eslint-env es6 */
import {
  createGridPlayground,
  createGridBackground,
  squaresPlayground,
  squaresBackground
} from './grid.js';

import {
  addEatAudios,
  getAppleRandomPosition,
  applePosition,
  appleDisappearWhenOld,
  appleAge,
  setAppleAge
} from './apple.js';

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
  displayApple,
  displayApple3000
} from './display.js';

const startButton = document.getElementById('start');
const gameMessage = document.querySelector('.game-message');

export let snakeBodyPosition = [2, 1, 0];
export let snakeHeadPosition = snakeBodyPosition[0];
let snakeRoute = [];

let movesWithoutApple = 0;

let gameIntervalTime = 1000;
let speed = 1;
let timerId = 0;

export let audiosEat = [];
let audioHungry = new Audio('audio/hungry.mp3');
let audioDead = new Audio('audio/dead.mp3');
// prettier-ignore
let fullLoop = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 19, 29, 39, 49, 59, 69, 79, 89,
                99, 98, 97, 96, 95, 94, 93, 92, 91, 90, 80, 70, 60, 50, 40, 30,
                20, 10];

//creating audio elements and placing them in the audiosEat array,
//they are playing when the snake eats an apple

addEatAudios();

createGridPlayground();

createGridBackground();

//after pressing the start button restore the game state to the initial values
function startGame() {
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
  gameMessage.textContent = '';
}

//snake first display
displaySnake();

displayScore();

export function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function game() {
  //removes head rotation classes from previous snake squares
  //removes head styling classes from previous snake squares
  removeSnakeHeadDisplay();
  //checking that the snake did not hit the wall or itself
  if (!isSnakeAlive()) {
    return snakeDead();
  } else {
    //move snake to chosen directionOfMovement
    snakeMove();
    //turn the snake's head to the the chosen directionOfMovement
    snakeHeadRotation();
    //stylize the snake's head to afraid if it is on a square with a tombstone
    snakeAfraid();
    //deal with snake head gets apple
    snakeEatApple();
    //an apple disappears if it is not eaten for the specified number of moves
    appleDisappearWhenOld();
    //the snake is hungry if it does not eat the apple for a certain number of moves,
    // then re-style the head to hungry, play audio-hungry, subtract points and speed up the game
    displayApple3000();
    snakeHungry();
    //check Did the snake loop around the outside edge of the playground,
    //    to reduce speed at the cost of losing points?
    powerUpFullLoop();
  }
}

function isSnakeAlive() {
  if (
    isSnakeHitBottom() ||
    isSnakeHitRightWall() ||
    isSnakeHitLeftWall() ||
    isSnakeHitTop() ||
    isSnakeHitHimself()
  ) {
    return false;
  } else return true;
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

function snakeDead() {
  //set correct head rotation
  snakeHeadRotation();
  //display random tombstone after snake dead
  randomSnakeTombstoneDisplayInBg();
  //stop the game by stopping function game gameIntervalTime
  clearInterval(timerId);
  //play audio when snake dead
  audioDead.play();
  //add dead-head style into snake head square
  changeSnakeHeadStyle('snake-head-dead');
  //add snake-body-dead for fade out effect
  snakeBodyPosition.forEach(index =>
    squaresPlayground[index].classList.add('snake-body-dead')
  );
  //fade out apple after snake dead
  squaresPlayground[applePosition].classList.add('apple-after-dead');
  gameMessage.textContent = 'Game Over!';
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

export let isSnakeMove = false;
export let snakeTailPosition;

export function snakeMove() {
  //remove last element from our snakeBodyPosition array
  snakeTailPosition = snakeBodyPosition.pop();
  //remove styling from last element
  // squaresPlayground[tail].classList.remove('snake-body');
  //add square in directionOfMovement we are heading
  snakeBodyPosition.unshift(snakeHeadPosition + directionOfMovement);
  //reset snakeHead value
  snakeHeadPosition = snakeBodyPosition[0];
  //add styling so we can see it and add difrent head style to the head
  // changeSnakeHeadStyle('snake-body', 'snake-head');
  //add 1 to the score
  changeScore();
  //add 1 to movesWithoutApple
  movesWithoutApple += 1;
  //add 1 to appleAge;
  setAppleAge(appleAge + 1);
}

export let isSnakeAfraid = false;

function snakeAfraid() {
  if (
    squaresBackground[snakeHeadPosition].classList.contains('snake-tombstone')
  ) {
    isSnakeAfraid = true;

    //speed up our snake
    changeGameSpeed(2.1);
    //add to the score
    changeScore(9);
  } else isSnakeAfraid = false;
}

function changeGameSpeed(percent = 1) {
  //clear previous interval
  clearInterval(timerId);
  //calculate new interval, if up = 1 the game will be 1% faster
  gameIntervalTime = gameIntervalTime * speed * (1 - percent / 100);
  //set new Interval
  timerId = setInterval(game, gameIntervalTime);
}

export let isSnakeEatApple = false;

function snakeEatApple() {
  //if snake head go into apple
  if (squaresPlayground[snakeHeadPosition].classList.contains('apple')) {
    isSnakeEatApple = true;
    //remove the class of apple
    // removeStyleFromSnakeHeadPosition('apple', 'apple-blink');
    //grow our snake by adding class of snake to it
    //squaresPlayground[snakeTailPosition].classList.add('snake-body');
    //grow our snake array
    snakeBodyPosition.push(snakeTailPosition);
    //change snake head style when snake eat apple
    // changeSnakeHeadStyle('snake-head-eat');
    //remove previous apple
    // removeApple();
    setAppleAge(0);
    //generate new apple
    // getAppleRandomPosition();
    // displayApple();
    //play random eat audio when snake eats the apple
    playEatAudio();
    //add 100 to the score
    changeScore(100);
    //speed up our snake percentage value
    changeGameSpeed(5);
    //zero movesWithoutApple
    movesWithoutApple = 0;
  } else {
    isSnakeEatApple = false;
  }
}

function playEatAudio() {
  let audioIndex = Math.floor(Math.random() * 10);
  audiosEat[audioIndex].play();
}
export let isSnakeHuangry = false;

function snakeHungry(moves = 50, points = -11, speed = 1) {
  if (movesWithoutApple === moves) {
    audioHungry.play();
  }

  if (movesWithoutApple >= moves) {
    isSnakeHuangry = true;
    //add hungry style to snake head
    //changeSnakeHeadStyle('snake-head-hungry');
    //add or remove poits to the score
    changeScore(points);
    //speed up our snake
    changeGameSpeed(speed);
    //zero movesWithoutApple
  } else isSnakeHuangry = false;
}
export let isPowerUpFullLoop = false;
// if snake made full clockwise loop, from square 0 to squar 10, change score and speed
function powerUpFullLoop(speed = -20, points = -500) {
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
      changeGameSpeed(speed);
      changeScore(points);
      snakeRoute = [];
      // changeSnakeHeadStyle('snake-head-full-loop');
      isPowerUpFullLoop = true;
    }
  }
}
