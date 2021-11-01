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

const keyCodes = {
  up: 38,
  left: 37,
  right: 39,
  down: 40
};
const width = 10;
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

currentSnake.forEach(index => squares[index].classList.add('snake'));
scoreDisplay.textContent = score;

function startGame() {
  //remove the snake
  currentSnake.forEach(index => squares[index].classList.remove('snake'));
  //remove the apple
  squares[appleIndex].classList.remove('apple');
  generateApple();
  currentSnake = [2, 1, 0];
  //readd the class of snake to our new currentSnake
  currentSnake.forEach(index => squares[index].classList.add('snake'));
  direction = 1;
  score = 0;
  //re add new score to browser
  scoreDisplay.textContent = score;
  clearInterval(timerId);
  intervalTime = 1000;
  timerId = setInterval(move, intervalTime);
}

function move() {
  if (
    (currentSnake[0] + width >= width * width && direction === width) || //if snake has hit bottom
    (currentSnake[0] % width === width - 1 && direction === 1) || //if snake has hit right wall
    (currentSnake[0] % width === 0 && direction === -1) || //if snake has hit left wall
    (currentSnake[0] - width < 0 && direction === -width) || //if snake has hit top
    squares[currentSnake[0] + direction].classList.contains('snake')
  )
    return clearInterval(timerId);

  //remove last element from our currentSnake array
  const tail = currentSnake.pop();
  //remove styling from last element
  squares[tail].classList.remove('snake');
  //add square in direction we are heading
  currentSnake.unshift(currentSnake[0] + direction);

  //deal with snake head gets apple
  if (squares[currentSnake[0]].classList.contains('apple')) {
    //remove the class of apple
    squares[currentSnake[0]].classList.remove('apple');
    //grow our snake by adding class of snake to it
    squares[tail].classList.add('snake');
    //grow our snake array
    currentSnake.push(tail);
    //generate new apple
    generateApple();
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
}

function generateApple() {
  do {
    appleIndex = Math.floor(Math.random() * squares.length);
  } while (squares[appleIndex].classList.contains('snake'));
  squares[appleIndex].classList.add('apple');
}

generateApple();

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
startButton.addEventListener('click', startGame);
