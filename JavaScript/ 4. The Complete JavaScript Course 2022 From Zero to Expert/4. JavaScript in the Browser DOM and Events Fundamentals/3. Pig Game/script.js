/*jshint esversion: 6*/
/* eslint-env es6 */
'use strict';

const player1El = document.getElementById('player-0-el');
const player2El = document.getElementById('player-1-el');

const player1NameEl = document.getElementById('name-0');
const player2NameEl = document.getElementById('name-1');

const player1ScoreEl = document.getElementById('score-0');
const player2ScoreEl = document.getElementById('score-1');

const player1CurrentScoreEl = document.getElementById('current-0');
const player2CurrentScoreEl = document.getElementById('current-1');

const diceImgEl = document.getElementById('dice-img-el');

const btnNewEl = document.getElementById('btn-new-el');
const btnRollEl = document.getElementById('btn-roll-el');
const btnHoldEl = document.getElementById('btn-hold-el');

let diceRoll,
  player1CurrentScore,
  player2CurrentScore,
  player1Score,
  player2Score,
  currentPlayer;

function setInitialValues() {
  diceRoll = 0;

  player1CurrentScore = 0;
  player2CurrentScore = 0;

  player1Score = 90;
  player2Score = 90;

  changeToPlayer1();
  displayPlayersCurrentScore();
  displayPlayersScore();
  removeWinner();

  btnRollEl.addEventListener('click', game);
  btnHoldEl.addEventListener('click', hold);

  diceImgEl.classList.remove('hidden');
}

function game() {
  rollDice();
  displayDiceRoll();
  if (isDiceEqual1()) {
    changePlayer();
    clearScore();
  } else {
    addScore();
  }
  displayPlayersCurrentScore();
}

function hold() {
  isPlayer1Turn() ? holdPlayer1() : holdPlayer2();
  changePlayer();
  clearScore();
  displayPlayersCurrentScore();
  win();
}

function holdPlayer1() {
  player1Score += player1CurrentScore;
  player1ScoreEl.textContent = `${player1Score}`;
}

function holdPlayer2() {
  player2Score += player2CurrentScore;
  player2ScoreEl.textContent = `${player2Score}`;
}

function displayPlayersScore() {
  player1ScoreEl.textContent = `${player1Score}`;
  player2ScoreEl.textContent = `${player2Score}`;
}

function rollDice() {
  diceRoll = getRandomIntInclusive(1, 6);
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function displayDiceRoll() {
  diceImgEl.src = `dice-${diceRoll}.png`;
}

function isDiceEqual1() {
  return diceRoll === 1;
}

function changePlayer() {
  currentPlayer === 1 ? changeToPlayer2() : changeToPlayer1();
}

function changeToPlayer2() {
  currentPlayer = 2;
  player2El.classList.add('player-active');
  player1El.classList.remove('player-active');
}

function changeToPlayer1() {
  currentPlayer = 1;
  player1El.classList.add('player-active');
  player2El.classList.remove('player-active');
}

function clearScore() {
  player1CurrentScore = 0;
  player2CurrentScore = 0;
}

function addScore() {
  isPlayer1Turn() ? addScorePlayer1() : addScorePlayer2();
}

function addScorePlayer1() {
  player1CurrentScore += diceRoll;
}

function addScorePlayer2() {
  player2CurrentScore += diceRoll;
}

function isPlayer1Turn() {
  return currentPlayer === 1;
}

function displayPlayersCurrentScore() {
  displayPlayer1CurrentScore();
  displayPlayer2CurrentScore();
}

function displayPlayer1CurrentScore() {
  player1CurrentScoreEl.textContent = `${player1CurrentScore}`;
}

function displayPlayer2CurrentScore() {
  player2CurrentScoreEl.textContent = `${player2CurrentScore}`;
}

function win() {
  if (player1Score >= 100 || player2Score >= 100) {
    btnRollEl.removeEventListener('click', game);
    btnHoldEl.removeEventListener('click', hold);
    diceImgEl.classList.add('hidden');
  }

  if (player1Score >= 100) {
    player1El.classList.add('player-winner');
  } else if (player2Score >= 100) {
    player2El.classList.add('player-winner');
  }
}

function removeWinner() {
  player1El.classList.remove('player-winner');
  player2El.classList.remove('player-winner');
}

setInitialValues();

btnNewEl.addEventListener('click', setInitialValues);
