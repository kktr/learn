/*jshint esversion:6*/
/* eslint-env es6 */
const grid = document.querySelector('.grid');
const gridBg = document.querySelector('.grid-bg');
const startButton = document.getElementById('start');
const scoreDisplay = document.getElementById('score');
const gameMessage = document.querySelector('.game-message');
let direction = 1;
let squares = [];
let squaresBg = [];
let currentSnake = [2, 1, 0];
let snakeRoute = [];
let appleIndex = 0;
let movesWithoutApple = 0;
let hungry = false;
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

//create array with Auidos
function addAudio() {
  for (let i = 0; i < 10; i++) {
    audios[i] = new Audio(`audio/eat${i + 1}.mp3`);
  }
}

addAudio();
//

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

createGridBg();

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
  //display new apple
  generateApple();
  //remove snake-dead style
  currentSnake.forEach(index => squares[index].classList.remove('snake-dead'));
  //reset start values
  currentSnake = [2, 1, 0];
  direction = 1;
  score = 0;
  speed = 1;
  movesWithoutApple = 0;
  hungry = false;
  appleAge = 0;
  gameMessage.textContent = '';
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
  //deal with too many moves without an apple
  snakeHungry();
  //apple disaper after too many moves
  appleDisappear();
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
    'snake-head-afraid',
    'snake-head-full-loop',
    'snake-fade',
    'snake-head-hungry'
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
  if (hungry) {
    squares[currentSnake[0]].classList.add('snake-head-hungry');
  }
  //add 1 to the score
  changeScore();
  //check if snake make fullLoop to change speed and points
  powerUpFullLoop();
  //add 1 to movesWithoutApple
  movesWithoutApple += 1;
  //add 1 to appleAge;
  appleAge += 1;
  // change snake head to afraid if he is on previous dead square
  if (squaresBg[currentSnake[0]].classList.contains('snake-rip')) {
    squares[currentSnake[0]].classList.add('snake-head-afraid');
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
  timerId = setInterval(snakeAlive, intervalTime);
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

// if snake made full clockwise loop, from square 0 to squar 10, change score and speed
function powerUpFullLoop(speed = -20, points = -500) {
  //track snake route
  snakeRoute.push(currentSnake[0]);
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
      squares[currentSnake[0]].classList.add('snake-head-full-loop');
    }
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
  if (squaresBg[currentSnake[0]].classList.contains('apple', 'blink-fast')) {
    //remove the class of apple
    squaresBg[currentSnake[0]].classList.remove('apple');
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
    //add 100 to the score
    changeScore(100);
    //speed up 5% our snake
    changeSpeed(5);
    //zero movesWithoutApple
    movesWithoutApple = 0;
    hungry = false;
  }
}

function generateApple() {
  //reset apple age
  appleAge = 0;
  //remove the previous apple
  squaresBg[appleIndex].classList.remove(
    'apple',
    'blink-fast',
    'apple-after-dead'
  );
  //create random index for apple
  appleIndex = Math.floor(Math.random() * squaresBg.length);
  //preventing from apples appears inside snake
  currentSnake.forEach(function(index) {
    //restart generateApple if apple apears inside snake
    if (index === appleIndex) {
      return generateApple();
    }
    //display the apple
    else {
      squaresBg[appleIndex].classList.add('apple');
    }
  });
}

function snakeHungry(moves = 50, points = -150, speed = 0) {
  if (movesWithoutApple == moves) {
    hungry = true;
    audioHungry.play();
    //add or remove poits to the score
    changeScore(points);
    //speed up our snake
    changeSpeed(speed);
    //add hungry style to snake head
    squares[currentSnake[0]].classList.add('snake-head-hungry');
  } else if (movesWithoutApple > moves) {
    //add or remove poits to the score
    changeScore(-11);
    //speed up our snake
    changeSpeed(1);
    //zero movesWithoutApple
  }
}
//old apple disaper
function appleDisappear(age = 20, score = -10) {
  if (appleAge == age - 10) {
    squaresBg[appleIndex].classList.add('blink-fast');
  }

  if (appleAge == age) {
    squaresBg[appleIndex].classList.remove('blink-fast');
    generateApple();
    changeScore(score);
  }
}

function snakeDead() {
  //set correct head rotation
  snakeHeadRotation();
  //add dead style into snake head
  ripIndex = Math.floor(Math.random() * 10) + 1;
  if (!squaresBg[currentSnake[0]].classList.contains('snake-rip')) {
    squaresBg[currentSnake[0]].classList.add(
      'snake-rip',
      `snake-rip-${ripIndex}`
    );
    squares[currentSnake[0]].classList.add('snake-head-dead');
  } else squares[currentSnake[0]].classList.add('snake-head-dead');
  //play audio when snake dead
  audioAngry.play();
  //stop the game
  clearInterval(timerId);
  //add snake-dead for fade out effect
  currentSnake.forEach(index => squares[index].classList.remove('snake'));
  currentSnake.forEach(index => squares[index].classList.add('snake-dead'));
  //fade out apple after snake dead
  squaresBg[appleIndex].classList.add('apple-after-dead');
  gameMessage.textContent = 'Game Over!';
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
