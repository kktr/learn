/*jshint esversion:6*/
/* eslint-env es6 */
const gridPg = document.querySelector('.grid-pg');
const gridBg = document.querySelector('.grid-bg');
const startButton = document.getElementById('start');
const scoreDisplay = document.getElementById('score');
const gameMessage = document.querySelector('.game-message');
let direction = 1;
let squaresPg = [];
let squaresBg = [];
let currentSnake = [2, 1, 0];
let snakeHead = currentSnake[0];
let snakeRoute = [];
let appleIndex = 0;

let movesWithoutApple = 0;
let appleAge = 0;
let score = 0;
let intervalTime = 1000;
let speed = 1;
let timerId = 0;
const width = 10;
let audios = [];
let audioHungry = new Audio('audio/hungry.mp3');
let audioAngry = new Audio('audio/angry.mp3');
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

const directions = {
  up: -width,
  left: -1,
  right: 1,
  down: width
};

function addAudio() {
  for (let i = 0; i < 10; i++) {
    audios[i] = new Audio(`audio/eat${i + 1}.mp3`);
  }
}
//create array with Auidos
addAudio();

function createGridPg() {
  //create 100 of these elements with a for loop
  for (let i = 0; i < width * width; i++) {
    //create element
    const squarePg = document.createElement('div');
    //add styling to the element
    squarePg.classList.add('square-pg');
    //put the element into our grid
    gridPg.appendChild(squarePg);
    //push it into a new squares array
    squaresPg.push(squarePg);
  }
}
//create playground grid
createGridPg();

function createGridBg() {
  //create 100 of these elements with a for loop
  for (let i = 0; i < width * width; i++) {
    //create element
    const squareBg = document.createElement('div');
    //add styling to the element
    squareBg.classList.add('square-bg');
    //put the element into our grid
    gridBg.appendChild(squareBg);
    //push it into a new squares array
    squaresBg.push(squareBg);
  }
}
//create background grid
createGridBg();

function startGame() {
  audioHungry.play();
  //reset intervalTime
  resetInterval();
  //remove from prevoius snake: head rotate
  removeSnakeHeadRotate();
  //remove from prevoius snake: head style
  removeSnakeHeadDisplay();
  //remove from prevoius snake: body style
  removeSnakeBodyDisplay();
  //remove previous apple
  removeApple();
  //reset start values
  resetValues();
  //re add the class of snake to our new currentSnake
  displaySnake();
  displayScore();
  //generate new apple index
  generateAppleIndex();
  //display apple
  displayApple();
}

startButton.addEventListener('click', startGame);

function resetInterval() {
  clearInterval(timerId);
  intervalTime = 1000;
  timerId = setInterval(game, intervalTime);
}

function removeSnakeHeadRotate() {
  removeSnakeHeadClass(
    'rotate-up',
    'rotate-down',
    'rotate-right',
    'rotate-left'
  );
}

function removeSnakeHeadDisplay() {
  //remove previous remove head style
  removeSnakeHeadClass(
    'snake-head-eat',
    'snake-head',
    'snake-head-dead',
    'snake-head-afraid',
    'snake-head-full-loop',
    'snake-fade',
    'snake-head-hungry'
  );
}

function removeSnakeHeadClass(...classes) {
  for (let value of classes) {
    squaresPg[snakeHead].classList.remove(value);
  }
}

function removeSnakeBodyDisplay() {
  //remove the snake
  currentSnake.forEach(index =>
    squaresPg[index].classList.remove('snake-body')
  );
  //remove snake-dead style
  currentSnake.forEach(index =>
    squaresPg[index].classList.remove('snake-body-dead')
  );
}

function removeApple() {
  //reset apple age
  appleAge = 0;
  //remove the previous apple
  squaresPg[appleIndex].classList.remove(
    'apple',
    'blink-fast',
    'apple-after-dead'
  );
}

function resetValues() {
  currentSnake = [2, 1, 0];
  snakeHead = currentSnake[0];
  direction = 1;
  score = 0;
  speed = 1;
  movesWithoutApple = 0;
  appleAge = 0;
  gameMessage.textContent = '';
}

function displaySnake() {
  currentSnake.forEach(index => squaresPg[index].classList.add('snake-body'));
  addSnakeHeadClass('snake-head');
}
//snake first display
displaySnake();

function addSnakeHeadClass(...classes) {
  for (let value of classes) {
    squaresPg[snakeHead].classList.add(value);
  }
}

function displayScore() {
  scoreDisplay.textContent = score;
}

displayScore();

function generateAppleIndex() {
  appleIndex = Math.floor(Math.random() * squaresPg.length);
  // check if every currentSnake index is diffrent from appleIndex
  let different = currentSnake.every(isDifferentIndex);

  if (!different) {
    return generateAppleIndex();
  }
}

function isDifferentIndex(index) {
  return index !== appleIndex;
}

function displayApple() {
  squaresPg[appleIndex].classList.add('apple');
}

function game() {
  //remove previous rotate and head style
  removeSnakeHeadRotate();
  removeSnakeHeadDisplay();
  // check if snake doesen't hit wall or himself
  if (!isSnakeAlive()) {
    return snakeDead();
  } else {
    //move snake to chosen direction
    snakeMove();
    //rotate snake head to direction
    snakeHeadRotation();
    // change snake head to afraid if he is on previous dead square
    snakeAfraid();
    //deal with snake head gets apple
    snakeEatApple();
    //apple disaper after too many moves
    appleDisappear();
    //deal with too many moves without an apple
    snakeHungry();
    //check if snake make fullLoop to change speed and points
    powerUpFullLoop();
  }
}

function isSnakeAlive() {
  if (
    (snakeHead + width >= width * width && direction === width) || //if snake has hit bottom
    (snakeHead % width === width - 1 && direction === 1) || //if snake has hit right wall
    (snakeHead % width === 0 && direction === -1) || //if snake has hit left wall
    (snakeHead - width < 0 && direction === -width) || //if snake has hit top
    squaresPg[snakeHead + direction].classList.contains('snake-body') //if snake has hit snake
  ) {
    //stop the game when snake hit wall or himself
    return false;
  } else return true;
}

function snakeDead() {
  //set correct head rotation
  snakeHeadRotation();
  //create a random index to select a random snake-tombstone img
  ripIndex = Math.floor(Math.random() * 10) + 1;
  if (!squaresBg[snakeHead].classList.contains('snake-tombstone')) {
    squaresBg[snakeHead].classList.add(
      'snake-tombstone',
      `snake-tombstone-${ripIndex}`
    );
  }
  //stop the game by stopping game intervalTime
  clearInterval(timerId);
  //play audio when snake dead
  audioAngry.play();
  //add dead style into snake head
  addSnakeHeadClass('snake-head-dead');
  //add snake-body-dead for fade out effect
  currentSnake.forEach(index =>
    squaresPg[index].classList.add('snake-body-dead')
  );
  //fade out apple after snake dead
  squaresPg[appleIndex].classList.add('apple-after-dead');
  gameMessage.textContent = 'Game Over!';
}

function snakeMove() {
  //remove last element from our currentSnake array
  tail = currentSnake.pop();
  //remove styling from last element
  squaresPg[tail].classList.remove('snake-body');
  //add square in direction we are heading
  currentSnake.unshift(snakeHead + direction);
  //reset snakeHead value
  snakeHead = currentSnake[0];
  //add styling so we can see it and add difrent head style to the head
  addSnakeHeadClass('snake-body', 'snake-head');
  //add 1 to the score
  changeScore();
  //add 1 to movesWithoutApple
  movesWithoutApple += 1;
  //add 1 to appleAge;
  appleAge += 1;
}

function snakeHeadRotation() {
  if (direction === directions.up) {
    addSnakeHeadClass('rotate-up');
  } else if (direction === directions.down) {
    addSnakeHeadClass('rotate-down');
  } else if (direction === directions.right) {
    addSnakeHeadClass('rotate-right');
  } else if (direction === directions.left) {
    addSnakeHeadClass('rotate-left');
  }
}

function snakeAfraid() {
  if (squaresBg[snakeHead].classList.contains('snake-tombstone')) {
    addSnakeHeadClass('snake-head-afraid');
    //speed up 2.1% our snake
    changeSpeed(2.1);
    //add 9 to the score
    changeScore(9);
  }
}

function changeSpeed(percent = 1) {
  //clear previous interval
  clearInterval(timerId);
  //calculate new interval, if up = 1 the game will be 1% faster
  intervalTime = intervalTime * speed * (1 - percent / 100);
  //set new Interval
  timerId = setInterval(game, intervalTime);
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
  if (squaresPg[snakeHead].classList.contains('apple')) {
    //remove the class of apple
    removeSnakeHeadClass('apple', 'blink-fast');
    //grow our snake by adding class of snake to it
    squaresPg[tail].classList.add('snake-body');
    //grow our snake array
    currentSnake.push(tail);
    //change snake head style when snake eat apple
    addSnakeHeadClass('snake-head-eat');
    //remove previous apple
    removeApple();
    //generate new apple
    generateAppleIndex();
    displayApple();
    //play random eat audio when snake eats the apple
    playEatAudio();
    //add 100 to the score
    changeScore(100);
    //speed up 5% our snake
    changeSpeed(5);
    //zero movesWithoutApple
    movesWithoutApple = 0;
  }
}

function playEatAudio() {
  audioIndex = Math.floor(Math.random() * 10);
  audios[audioIndex].play();
}

//old apple disaper
function appleDisappear(age = 20, score = -10) {
  if (appleAge === age - 10) {
    squaresPg[appleIndex].classList.add('blink-fast');
  }

  if (appleAge === age) {
    squaresPg[appleIndex].classList.remove('blink-fast');
    removeApple();
    generateAppleIndex();
    displayApple();
    changeScore(score);
  }
}

function snakeHungry(moves = 50, points = -11, speed = 1) {
  if (movesWithoutApple === moves) {
    audioHungry.play();
  } else if (movesWithoutApple > moves) {
    //add hungry style to snake head
    addSnakeHeadClass('snake-head-hungry');
    //add or remove poits to the score
    changeScore(points);
    //speed up our snake
    changeSpeed(speed);
    //zero movesWithoutApple
  }
}

// if snake made full clockwise loop, from square 0 to squar 10, change score and speed
function powerUpFullLoop(speed = -20, points = -500) {
  //track snake route
  snakeRoute.push(snakeHead);
  //loop through snakeRoute and fullLoop to check if they are identical
  for (let i = 0; i < snakeRoute.length; i++) {
    //clear snakeRoute if snakeRoute is difrent from fullLoop
    if (snakeRoute[i] != fullLoop[i]) {
      snakeRoute = [];
      return;
    } else if (snakeRoute.length == fullLoop.length) {
      changeSpeed(speed);
      changeScore(points);
      snakeRoute = [];
      addSnakeHeadClass('snake-head-full-loop');
    }
  }
}

function control(e) {
  if (e.keyCode === keyCodes.right) {
    direction = directions.right;
  } else if (e.keyCode === keyCodes.up) {
    direction = directions.up;
  } else if (e.keyCode === keyCodes.left) {
    direction = directions.left;
  } else if (e.keyCode === keyCodes.down) {
    direction = directions.down;
  }
}

document.addEventListener('keydown', control);

// What to code ?
// - snake tombstone after dead DONE
// - highscore
// - snake body rotten in time after dead DONE
// - Power up (make full clokwise loop to lower the speed ) DONE
// - apple disaper and regenerate after time (faster blinking efect)
// - rotten apples or shit lower the score
// - rwd
// - change snake images from jpg to png and play with snake color
//   (difrent color, when snake is older, difreent color when snake fade after dead)
// - create object with setup properities
