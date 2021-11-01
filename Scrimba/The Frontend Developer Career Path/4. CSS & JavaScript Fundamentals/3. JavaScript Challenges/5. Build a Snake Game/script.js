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

let audiohungry = new Audio('audio/hungry.mp3');
let audioEat1 = new Audio('audio/eat1.mp3');
let audioEat2 = new Audio('audio/eat2.mp3');
let audioEat3 = new Audio('audio/eat3.mp3');
let audioEat4 = new Audio('audio/eat4.mp3');
let audioEat5 = new Audio('audio/eat5.mp3');
let audioEat6 = new Audio('audio/eat6.mp3');
let audioEat7 = new Audio('audio/eat7.mp3');
let audioEat8 = new Audio('audio/eat8.mp3');
let audioEat9 = new Audio('audio/eat9.mp3');
let audioEat10 = new Audio('audio/eat10.mp3');
let audioAngry = new Audio('audio/angry.mp3');

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

currentSnake.forEach(index => squares[index].classList.add('snake'));
squares[currentSnake[0]].classList.add('snake-head');
scoreDisplay.textContent = score;

function startGame() {
  audiohungry.play();
  //remove the snake
  currentSnake.forEach(index => squares[index].classList.remove('snake'));
  //remove after dead: snake, snake-head, snake-head-dead and head rotation
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

function move() {
  if (
    (currentSnake[0] + width >= width * width && direction === width) || //if snake has hit bottom
    (currentSnake[0] % width === width - 1 && direction === 1) || //if snake has hit right wall
    (currentSnake[0] % width === 0 && direction === -1) || //if snake has hit left wall
    (currentSnake[0] - width < 0 && direction === -width) || //if snake has hit top
    squares[currentSnake[0] + direction].classList.contains('snake')
  )
    return dead();

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
    //change snake head
    squares[currentSnake[0]].classList.add('snake-head-eat');
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
    eatPlayAdio();
  }
  //add styling so we can see it
  squares[currentSnake[0]].classList.add('snake');
  snakeHeadDisplay();
}

function snakeHeadDisplay() {
  squares[currentSnake[0]].classList.add('snake-head');
  squares[currentSnake[1]].classList.remove('snake-head');
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

function dead() {
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

function eatPlayAdio() {
  if (currentSnake.length === 3) {
    audioEat1.play();
  } else if (currentSnake.length === 4) {
    audioEat2.play();
  } else if (currentSnake.length === 5) {
    audioEat3.play();
  } else if (currentSnake.length === 6) {
    audioEat4.play();
  } else if (currentSnake.length === 7) {
    audioEat5.play();
  } else if (currentSnake.length === 8) {
    audioEat6.play();
  } else if (currentSnake.length === 9) {
    audioEat7.play();
  } else if (currentSnake.length === 10) {
    audioEat8.play();
  } else if (currentSnake.length === 11) {
    audioEat9.play();
  } else if (currentSnake.length > 11) {
    audioEat10.play();
  }
  return;
}
//const snakeHeadDead = document.querySelector('.snake-head-dead');
