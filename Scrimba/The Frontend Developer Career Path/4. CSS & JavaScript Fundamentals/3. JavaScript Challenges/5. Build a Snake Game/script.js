/*jshint esversion:6*/
/* eslint-env es6 */
const gridPlayground = document.querySelector('.grid-playground');
const gridBackground = document.querySelector('.grid-background');
const startButton = document.getElementById('start');
const scoreDisplay = document.getElementById('score');
const gameMessage = document.querySelector('.game-message');
const width = 10;
const directions = {
  up: -width,
  left: -1,
  right: 1,
  down: width
};
let directionOfMovement = directions.right;
let squaresPlayground = [];
let squaresBackground = [];
let snakeBodyPosition = [2, 1, 0];
let snakeHeadPosition = snakeBodyPosition[0];
let snakeRoute = [];
let applePosition = 0;

let movesWithoutApple = 0;
let appleAge = 0;
let score = 0;
let gameIntervalTime = 1000;
let speed = 1;
let timerId = 0;

let audiosEat = [];
let audioHungry = new Audio('audio/hungry.mp3');
let audioDead = new Audio('audio/dead.mp3');
// prettier-ignore
let fullLoop = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 19, 29, 39, 49, 59, 69, 79, 89,
                99, 98, 97, 96, 95, 94, 93, 92, 91, 90, 80, 70, 60, 50, 40, 30,
                20, 10];

const keyCodes = {
  up: 38,
  left: 37,
  right: 39,
  down: 40
};

//creating audio elements and placing them in the audiosEat array,
//they are playing when the snake eats an apple
function addEatAudios() {
  for (let i = 0; i < 10; i++) {
    audiosEat[i] = new Audio(`audio/eat${i + 1}.mp3`);
  }
}
addEatAudios();

// creating a playground with 100 fields for snake movements and the appearance of apples
function createGridPlayground() {
  //create 100 of these elements with a for loop
  for (let i = 0; i < width * width; i++) {
    //create element
    const squarePlayground = document.createElement('div');
    //add styling to the element
    squarePlayground.classList.add('square-playground');
    //put the element into our grid
    gridPlayground.appendChild(squarePlayground);
    //push it into a new squares array
    squaresPlayground.push(squarePlayground);
  }
}

createGridPlayground();

//create a playground with 100 fields for the snake tombstones and the background img
function createGridBackground() {
  //create 100 of these elements with a for loop
  for (let i = 0; i < width * width; i++) {
    //create element
    const squareBackground = document.createElement('div');
    //add styling to the element
    squareBackground.classList.add('square-background');
    //put the element into our grid
    gridBackground.appendChild(squareBackground);
    //push it into a new squares array
    squaresBackground.push(squareBackground);
  }
}

createGridBackground();

//after pressing the start button restore the game state to the initial values
function startGame() {
  audioHungry.play();
  //reset gameIntervalTime
  resetGameInterval();
  //removes head rotation classes from previous snake
  removeSnakeHeadRotate();
  //removes head styling classes from previous snake
  removeSnakeHeadDisplay();
  //removes snake-body and snake-body-dead styling classes from previous snake
  removeSnakeBodyDisplay();
  //remove previous apple
  removeApple();
  //restore variables to their initial values
  resetValues();
  //adding body and head classes to the new snake
  displaySnake();
  //displaying a new game score
  displayScore();
  //generate new apple index
  getAppleRandomPosition();
  //adding styling to a square with a new apple
  displayApple();
}

startButton.addEventListener('click', startGame);

//removing the old time interval, returning it to its initial value
//  and assigning it to the game function
function resetGameInterval() {
  clearInterval(timerId);
  gameIntervalTime = 1000;
  timerId = setInterval(game, gameIntervalTime);
}

function removeSnakeHeadRotate() {
  removeStyleFromSnakeHeadPosition(
    'rotate-up',
    'rotate-down',
    'rotate-right',
    'rotate-left'
  );
}

function removeSnakeHeadDisplay() {
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

function removeStyleFromSnakeHeadPosition(...classes) {
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

function removeApple() {
  //reset apple age
  appleAge = 0;
  //removing the apple styling from the previous apple square
  squaresPlayground[applePosition].classList.remove(
    'apple',
    'apple-blink',
    'apple-after-dead'
  );
}

function resetValues() {
  snakeBodyPosition = [2, 1, 0];
  snakeHeadPosition = snakeBodyPosition[0];
  directionOfMovement = directions.right;
  score = 0;
  speed = 1;
  movesWithoutApple = 0;
  appleAge = 0;
  gameMessage.textContent = '';
}

function displaySnake() {
  snakeBodyPosition.forEach(index =>
    squaresPlayground[index].classList.add('snake-body')
  );
  changeSnakeHeadStyle('snake-head');
}
//snake first display
displaySnake();

function changeSnakeHeadStyle(...classes) {
  for (let value of classes) {
    squaresPlayground[snakeHeadPosition].classList.add(value);
  }
}

function displayScore() {
  scoreDisplay.textContent = score;
}

displayScore();

function getAppleRandomPosition() {
  applePosition = getRandomIntInclusive(0, squaresPlayground.length - 1);
  // check if every snakeBodyPosition index is diffrent from applePosition
  let different = snakeBodyPosition.every(isDifferentIndex);
  // if isn't assign applePosition again
  if (!different) {
    return getAppleRandomPosition();
  }
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isDifferentIndex(index) {
  return index !== applePosition;
}

function displayApple() {
  squaresPlayground[applePosition].classList.add('apple');
}

function game() {
  //removes head rotation classes from previous snake squares
  removeSnakeHeadRotate();
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
  //last edited coment stoped here ..............................................................
  snakeBodyPosition.forEach(index =>
    squaresPlayground[index].classList.add('snake-body-dead')
  );
  //fade out apple after snake dead
  squaresPlayground[applePosition].classList.add('apple-after-dead');
  gameMessage.textContent = 'Game Over!';
}

function randomSnakeTombstoneDisplayInBg() {
  //create a random index to select a random snake-tombstone img
  tombstoneIndex = getRandomIntInclusive(1, 10);
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

function snakeMove() {
  //remove last element from our snakeBodyPosition array
  tail = snakeBodyPosition.pop();
  //remove styling from last element
  squaresPlayground[tail].classList.remove('snake-body');
  //add square in directionOfMovement we are heading
  snakeBodyPosition.unshift(snakeHeadPosition + directionOfMovement);
  //reset snakeHead value
  snakeHeadPosition = snakeBodyPosition[0];
  //add styling so we can see it and add difrent head style to the head
  changeSnakeHeadStyle('snake-body', 'snake-head');
  //add 1 to the score
  changeScore();
  //add 1 to movesWithoutApple
  movesWithoutApple += 1;
  //add 1 to appleAge;
  appleAge += 1;
}

function snakeHeadRotation() {
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

function snakeAfraid() {
  if (
    squaresBackground[snakeHeadPosition].classList.contains('snake-tombstone')
  ) {
    changeSnakeHeadStyle('snake-head-afraid');
    //speed up our snake
    changeGameSpeed(2.1);
    //add to the score
    changeScore(9);
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

function changeScore(points = 1) {
  //add ten to the score
  score += points;
  if (score < 0) {
    score = 0;
  }
  //display our score
  scoreDisplay.textContent = score;
}

function snakeEatApple() {
  //if snake head go into apple
  if (squaresPlayground[snakeHeadPosition].classList.contains('apple')) {
    //remove the class of apple
    removeStyleFromSnakeHeadPosition('apple', 'apple-blink');
    //grow our snake by adding class of snake to it
    squaresPlayground[tail].classList.add('snake-body');
    //grow our snake array
    snakeBodyPosition.push(tail);
    //change snake head style when snake eat apple
    changeSnakeHeadStyle('snake-head-eat');
    //remove previous apple
    removeApple();
    //generate new apple
    getAppleRandomPosition();
    displayApple();
    //play random eat audio when snake eats the apple
    playEatAudio();
    //add 100 to the score
    changeScore(100);
    //speed up our snake percentage value
    changeGameSpeed(5);
    //zero movesWithoutApple
    movesWithoutApple = 0;
  }
}

function playEatAudio() {
  audioIndex = Math.floor(Math.random() * 10);
  audiosEat[audioIndex].play();
}

//old apple disaper
function appleDisappearWhenOld(oldAge = 30, score = -10) {
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

function snakeHungry(moves = 50, points = -11, speed = 1) {
  if (movesWithoutApple === moves) {
    audioHungry.play();
  } else if (movesWithoutApple > moves) {
    //add hungry style to snake head
    changeSnakeHeadStyle('snake-head-hungry');
    //add or remove poits to the score
    changeScore(points);
    //speed up our snake
    changeGameSpeed(speed);
    //zero movesWithoutApple
  }
}

// if snake made full clockwise loop, from square 0 to squar 10, change score and speed
function powerUpFullLoop(speed = -20, points = -500) {
  //track snake route
  snakeRoute.push(snakeHeadPosition);
  //loop through snakeRoute and fullLoop to check if they are identical
  for (let i = 0; i < snakeRoute.length; i++) {
    //clear snakeRoute if snakeRoute is difrent from fullLoop
    if (snakeRoute[i] != fullLoop[i]) {
      snakeRoute = [];
      return;
    } else if (snakeRoute.length == fullLoop.length) {
      changeGameSpeed(speed);
      changeScore(points);
      snakeRoute = [];
      changeSnakeHeadStyle('snake-head-full-loop');
    }
  }
}

function control(e) {
  if (e.keyCode === keyCodes.right) {
    directionOfMovement = directions.right;
  } else if (e.keyCode === keyCodes.up) {
    directionOfMovement = directions.up;
  } else if (e.keyCode === keyCodes.left) {
    directionOfMovement = directions.left;
  } else if (e.keyCode === keyCodes.down) {
    directionOfMovement = directions.down;
  }
}

document.addEventListener('keydown', control);
