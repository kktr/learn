/*jshint esversion:6*/
/* eslint-env es6 */

let playerOneScore = 0;
let playerTwoScore = 0;
let playerOneTurn = true;

const message = document.querySelector('#message');
const playerOneScoreboard = document.querySelector('#player-one-scoreboard');
const playerTwoScoreboard = document.querySelector('#player-two-scoreboard');
const playerOneDice = document.querySelector('#player-one-dice');
const playerTwoDice = document.querySelector('#player-two-dice');

const rollBtn = document.querySelector('#roll-btn');
const resetBtn = document.querySelector('#reset-btn');

rollBtn.addEventListener('click', function() {
  const randomNumber = Math.floor(Math.random() * 6) + 1;

  if (playerOneTurn) {
    playerOneDice.textContent = randomNumber;
    playerOneScore += randomNumber;
    displayScore('playerOne');
    playerOneDice.classList.add('dice-active');
    playerTwoDice.classList.remove('dice-active');
    message.textContent = 'Player 2 Turn';
  } else {
    playerTwoDice.textContent = randomNumber;
    playerTwoScore += randomNumber;
    displayScore('playerTwo');
    playerTwoDice.classList.add('dice-active');
    playerOneDice.classList.remove('dice-active');
    message.textContent = 'Player 1 Turn';
  }

  if (playerOneScore >= 20) {
    message.textContent = 'Player 1 Won!';
    displayResetBtn();
  } else if (playerTwoScore >= 20) {
    message.textContent = 'Player 2 Won!';
    displayResetBtn();
  }

  playerOneTurn = !playerOneTurn;
});

resetBtn.addEventListener('click', function() {
  playerOneScore = 0;
  playerTwoScore = 0;
  playerOneTurn = true;
  displayScore();
  playerOneDice.textContent = '-';
  playerTwoDice.textContent = '-';
  playerOneDice.classList.add('dice-active');
  playerTwoDice.classList.remove('dice-active');
  message.textContent = 'Player 1 Turn';
  rollBtn.style.display = 'inline';
  resetBtn.style.display = 'none';
});

function displayScore(player) {
  if (player == 'playerOne') {
    playerOneScoreboard.textContent = playerOneScore;
  } else if (player == 'playerTwo') {
    playerTwoScoreboard.textContent = playerTwoScore;
  } else {
    playerOneScoreboard.textContent = playerOneScore;
    playerTwoScoreboard.textContent = playerTwoScore;
  }
}

function displayResetBtn() {
  rollBtn.style.display = 'none';
  resetBtn.style.display = 'inline';
}
