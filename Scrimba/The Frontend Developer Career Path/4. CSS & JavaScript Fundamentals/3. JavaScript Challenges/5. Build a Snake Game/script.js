/*jshint esversion:6*/
const grid = document.querySelector('.grid');
const startBtn = document.querySelector('#start');
const scoreDisplay = document.querySelector('#score');
let score = 0;
let squares = [];
let currentSnake = [2, 1, 0];
let direction = 1;
let appleIndex = 0;
let interval = 1000;
let speed = 0.9;

function createGrid() {
  for (let i = 0; i < 100; i++) {
    const square = document.createElement('div');
    square.classList.add('square');
    grid.appendChild(square);
    squares.push(square);
  }
}

createGrid();

currentSnake.forEach((item, i) => {
  squares[i].classList.add('snake');
});

startBtn.addEventListener('click', function () {
  score = 0;
  squares = [];
  currentSnake = [2, 1, 0];
  direction = 1;
  appleIndex = 0;
  interval = 1000;
  speed = 0.9;
  generateApples();
  timerId = setInterval(move, interval);
});

function move() {
  if (
       (currentSnake[0] + 10 >= 100 && direction === 10) || //if snake has hit bottom
       (currentSnake[0] % 10 === 9 && direction === 1) || //if snake has hit right wall
       (currentSnake[0] % 10 === 0 && direction === -1) || //if snake has hit left wall
       (currentSnake[0] - 10 < 0 && direction === -10) || //if snake has hit top
       squares[currentSnake[0] + direction].classList.contains('snake')
   )
    return clearInterval(timerId);
  let head = currentSnake[0];
  let tail = currentSnake.pop();
  squares[tail].classList.remove('snake');
  currentSnake.unshift(currentSnake[0] + direction);

  if (squares[currentSnake[0]].classList.contains('apple')) {
    squares[currentSnake[0]].classList.remove('apple');
    squares[tail].classList.add('snake');
    currentSnake.push(tail);
    generateApples();
    score++;
    scoreDisplay.textContent = score;
    interval = interval * speed;
    clearInterval(timerId);
    timerId = setInterval(move, interval);
  }

  squares[currentSnake[0]].classList.add('snake');
}

let timerId = setInterval(move, interval);

function generateApples() {
  do {
    appleIndex = Math.floor(Math.random() * squares.length);
  } while (squares[appleIndex].classList.contains('snake'));
  squares[appleIndex].classList.add('apple');
}

generateApples();

function controlKey(e) {
  if (e.keyCode === 39) {
    direction = 1;
  } else if (e.keyCode === 37) {
    direction = -1;
  } else if (e.keyCode === 38) {
    direction = -10;
  } else if (e.keyCode === 40) {
    direction = 10;
  }
}

document.addEventListener('keydown', controlKey);

// 39 is right arrow
// 38 is for the up arrow
// 37 is for the left arrow
// 40 is for the down arrow
