/*jshint esversion:6*/
/* eslint-env es6 */
const grid = document.querySelector('.grid');
const startButton = document.getElementById('start');
const scoreDisplay = document.getElementById('score');
let direction = 1;
let squares = [];
let currentSnake = [2, 1, 0];
let appleIndex = 0;
let score = 0;
let intervalTime = 1000;
let speed = 0.9;
let timerId = 0;
const width = 10;
let audios = [];
let audioHungry = new Audio('audio/hungry.mp3');
let audioAngry = new Audio('audio/angry.mp3');

function addAudio() {
  for (let i = 0; i < 10; i++) {
    audios[i] = new Audio(`audio/eat${i + 4}.mp3`);
  }
}

addAudio();

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

function createGrid() {
  //create 100 of these elements with a for loop
  for (let i = 0; i < width * width; i++) {
    //create element
    const square = document.createElement('div');
    //add styling to the element
    square.classList.add('square');
    //put the element into our grid
    grid.appendChild(square);
    //push it into a new squares array
    squares.push(square);
  }
}

createGrid();

//first display
currentSnake.forEach(index => squares[index].classList.add('snake'));
squares[currentSnake[0]].classList.add('snake-head');
scoreDisplay.textContent = score;

function startGame() {
  audioHungry.play();
  //remove the snake
  currentSnake.forEach(index => squares[index].classList.remove('snake'));
  //remove from snake head after dead
  squares[currentSnake[0]].classList.remove(
    'snake-head',
    'snake-head-dead',
    'rotate-up',
    'rotate-down',
    'rotate-right',
    'rotate-left'
  );
  //remove the apple
  squares[appleIndex].classList.remove('apple');
  generateApple();
  currentSnake = [2, 1, 0];
  //re add the class of snake to our new currentSnake
  currentSnake.forEach(index => squares[index].classList.add('snake'));
  squares[currentSnake[0]].classList.add('snake-head');
  direction = 1;
  score = 0;
  //re add new score to browser
  scoreDisplay.textContent = score;
  //reser intervalTime
  clearInterval(timerId);
  intervalTime = 1000;
  timerId = setInterval(move, intervalTime);
}

startButton.addEventListener('click', startGame);

function move() {
  if (
    (currentSnake[0] + width >= width * width && direction === width) || //if snake has hit bottom
    (currentSnake[0] % width === width - 1 && direction === 1) || //if snake has hit right wall
    (currentSnake[0] % width === 0 && direction === -1) || //if snake has hit left wall
    (currentSnake[0] - width < 0 && direction === -width) || //if snake has hit top
    squares[currentSnake[0] + direction].classList.contains('snake') //if snake hit snake
  )
    return snakeDead();

  //remove last element from our currentSnake array
  const tail = currentSnake.pop();
  //remove styling from last element
  squares[tail].classList.remove('snake');
  //add square in direction we are heading
  currentSnake.unshift(currentSnake[0] + direction);

  //remove previous snake head rotation value
  squares[currentSnake[1]].classList.remove(
    'rotate-up',
    'rotate-down',
    'rotate-right',
    'rotate-left',
    'snake-head-eat',
    'snake-head'
  );
  snakeHeadRotation();
  //deal with snake head gets apple
  if (squares[currentSnake[0]].classList.contains('apple')) {
    //remove the class of apple
    squares[currentSnake[0]].classList.remove('apple');
    //grow our snake by adding class of snake to it
    squares[tail].classList.add('snake');
    //grow our snake array
    currentSnake.push(tail);
    //change snake head style when snake eat apple
    squares[currentSnake[0]].classList.add('snake-head-eat');
    //generate new apple
    generateApple();
    //play audio when eat apple
    if (currentSnake.length < 13) {
      audios[currentSnake.length - 3].play();
    } else audios[9].play();
    //add one to the score
    score++;
    //display our score
    scoreDisplay.textContent = score;
    //speed up our snake
    clearInterval(timerId);
    intervalTime = intervalTime * speed;
    timerId = setInterval(move, intervalTime);
  }
  //add styling so we can see it
  squares[currentSnake[0]].classList.add('snake');
  //add difrent head style to the head
  snakeHeadDisplay();
}

function snakeHeadDisplay() {
  squares[currentSnake[0]].classList.add('snake-head');
  squares[currentSnake[1]].classList.remove('snake-head');
}

function generateApple() {
  appleIndex = Math.floor(Math.random() * squares.length);
  //preventing from apples appears inside snake
  currentSnake.forEach(function(index) {
    if (index == appleIndex) return generateApple();
  });
  squares[appleIndex].classList.add('apple');
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

document.addEventListener('keyup', control);

function snakeDead() {
  squares[currentSnake[0]].classList.add('snake-head-dead');
  squares[currentSnake[0]].classList.remove(
    'rotate-up',
    'rotate-down',
    'rotate-right',
    'rotate-left',
    'snake-head-eat'
  );
  snakeHeadRotation();
  audioAngry.play();
  clearInterval(timerId);
}

function snakeHeadRotation() {
  if (direction === directions.up) {
    squares[currentSnake[0]].classList.add('rotate-up');
  } else if (direction === directions.down) {
    squares[currentSnake[0]].classList.add('rotate-down');
  } else if (direction === directions.right) {
    squares[currentSnake[0]].classList.add('rotate-right');
  } else if (direction === directions.left) {
    squares[currentSnake[0]].classList.add('rotate-left');
  }
}
