/*jshint esversion: 6*/
/* eslint-env es6 */

'use strict';

const btnAgainEl = document.getElementById('again');
const btnCheckEl = document.getElementById('check');
const inputGuessEl = document.getElementById('guessNumber');
const numberEl = document.getElementById('number');
const messageEl = document.getElementById('message');
const scoreInfoEl = document.getElementById('score');
const highScoreInfoEl = document.getElementById('highscore');
const body = document.body;

let secretNumber = getRandomNumber(1, 20);
let guessNumber = 0;
let score = 20;
let highscore = 0;

btnCheckEl.addEventListener('click', game);
btnAgainEl.addEventListener('click', reset);

function game() {
  if (!isGuessCorect() && !isLost()) {
    getGuessNumber();
    displayScore();
  }

  if (isGuessCorect()) {
    displayWin();
    displayHighScore();
  }

  if (isLost()) {
    displayLose();
  }

  displayMessages();
  clearInput();
}

function reset() {
  secretNumber = getRandomNumber(1, 20);
  score = 20;
  guessNumber = '';
  setMessage('start guessing...');
  body.classList.remove('win');
  body.classList.remove('lose');
  numberEl.textContent = '?';
  clearInput();
}

function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  let num = Math.floor(Math.random() * (max - min + 1) + min);
  return num;
}

function displayScore() {
  score -= 1;
  scoreInfoEl.textContent = score;
}

function displayHighScore() {
  if (score > highscore) {
    highscore = score;
    highScoreInfoEl.textContent = score;
  }
}

function getGuessNumber() {
  guessNumber = inputGuessEl.value;
  return Number(guessNumber);
}

function isGuessInRange() {
  return guessNumber > 0 && guessNumber <= 20;
}

function isGuessCorect() {
  return secretNumber == guessNumber;
}

function isGuessToHigh() {
  return secretNumber < guessNumber;
}

function isGuessToLow() {
  return secretNumber > guessNumber;
}

function displayMessages() {
  if (!isGuessInRange()) {
    setMessage('enter a number in the range!');
  } else if (isGuessCorect()) {
    setMessage('Correct Number!');
  } else if (isGuessToHigh()) {
    setMessage(`${guessNumber} is too high!`);
  } else if (isGuessToLow()) {
    setMessage(`${guessNumber} is too low!`);
  }
  if (isLost()) {
    setMessage('You lose!');
  }
}

function setMessage(message) {
  messageEl.textContent = message;
}

function displayWin() {
  numberEl.textContent = secretNumber;
  body.classList.add('win');
}

function displayLose() {
  body.classList.add('lose');
}

function isLost() {
  return score == 0;
}

function clearInput() {
  inputGuessEl.value = '';
}
