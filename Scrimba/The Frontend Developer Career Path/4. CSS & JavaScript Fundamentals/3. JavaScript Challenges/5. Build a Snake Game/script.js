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

//create array with Auidos
function addAudio() {
  for (let i = 0; i < 10; i++) {
    audios[i] = new Audio(`audio/eat${i + 1}.mp3`);
  }
}

addAudio();

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

function displaySnakeAndScore() {
  currentSnake.forEach(index => squares[index].classList.add('snake'));
  squares[currentSnake[0]].classList.add('snake-head');
  scoreDisplay.textContent = score;
}
//first display
displaySnakeAndScore();

function startGame() {
  audioHungry.play();
  //remove from snake: head style and head rotate after dead
  removeDisplayRotateAndHead();
  //remove the snake
  currentSnake.forEach(index => squares[index].classList.remove('snake'));
  generateApple();
  //reset start values
  currentSnake = [2, 1, 0];
  direction = 1;
  score = 0;
  //re add the class of snake to our new currentSnake
  displaySnakeAndScore();
  //reset intervalTime
  clearInterval(timerId);
  intervalTime = 1000;
  timerId = setInterval(snakeAlive, intervalTime);
}

startButton.addEventListener('click', startGame);

function snakeAlive() {
  //remove previous rotate and head style
  removeDisplayRotateAndHead();

  if (
    (currentSnake[0] + width >= width * width && direction === width) || //if snake has hit bottom
    (currentSnake[0] % width === width - 1 && direction === 1) || //if snake has hit right wall
    (currentSnake[0] % width === 0 && direction === -1) || //if snake has hit left wall
    (currentSnake[0] - width < 0 && direction === -width) || //if snake has hit top
    squares[currentSnake[0] + direction].classList.contains('snake') //if snake has hit snake
  )
    //stop the game when snake hit wall or himself
    return snakeDead();
  //move snake to chosen direction
  snakeMove();
  //rotate snake head to direction
  snakeHeadRotation();
  //deal with snake head gets apple
  snakeEatApple();
}

function removeDisplayRotateAndHead() {
  //remove previous snake head rotation value and remove head style
  squares[currentSnake[0]].classList.remove(
    'rotate-up',
    'rotate-down',
    'rotate-right',
    'rotate-left',
    'snake-head-eat',
    'snake-head',
    'snake-head-dead',
    'snake-head-afraid'
  );
}

function snakeMove() {
  //remove last element from our currentSnake array
  tail = currentSnake.pop();
  //remove styling from last element
  squares[tail].classList.remove('snake');
  //add square in direction we are heading
  currentSnake.unshift(currentSnake[0] + direction);
  //add styling so we can see it and add difrent head style to the head
  squares[currentSnake[0]].classList.add('snake', 'snake-head');
  // change snake head to afraid if he is on previous rip square
  if (squares[currentSnake[0]].classList.contains('snake-rip')) {
    squares[currentSnake[0]].classList.add('snake-head-afraid');
  }
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

function snakeEatApple() {
  //if snake head go into apple
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
    //play random eat audio when snake eats the apple
    audioIndex = Math.floor(Math.random() * 10);
    audios[audioIndex].play();
    //add one to the score
    score++;
    //display our score
    scoreDisplay.textContent = score;
    //speed up our snake
    //clear previous interval
    clearInterval(timerId);
    //calculate new interval, if speed > 1.0 it will be smaller, so the game will be faster
    intervalTime = intervalTime * speed;
    //set new Interval
    timerId = setInterval(snakeAlive, intervalTime);
  }
}

function generateApple() {
  //remove the previous apple
  squares[appleIndex].classList.remove('apple');
  //create random index for apple
  appleIndex = Math.floor(Math.random() * squares.length);
  //preventing from apples appears inside snake
  currentSnake.forEach(function(index) {
    //restart generateApple if apple apears inside snake
    if (index === appleIndex) return generateApple();
  });
  //display the apple
  squares[appleIndex].classList.add('apple');
}

function snakeDead() {
  //set correct head rotation
  snakeHeadRotation();
  //add dead style into snake head
  ripIndex = Math.floor(Math.random() * 10) + 1;
  squares[currentSnake[0]].classList.add(
    `snake-rip-${ripIndex}`,
    'snake-rip',
    'snake-head-dead'
  );
  //play audio when snake dead
  audioAngry.play();
  //stop the game
  clearInterval(timerId);
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
// - snake body rotten in time after dead
// - ester eggs (make full clokwise loop to lower the speed )
// - apple disaper and regenerate after time (faster blinking efect)
// - rotten apples or shit lower the score
// - rwd
