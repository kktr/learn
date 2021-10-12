/*jshint esversion:6*/

let playerOneScore = 0;
let playerTwoScore = 0;
let playerOneTurn = true;

const message = document.querySelector('#message');
const playerOneScoreboard = document.querySelector('#player1Scoreboard');
const playerTwoScoreboard = document.querySelector('#player2Scoreboard');
const playerOneDice = document.querySelector('#player1Dice');
const playerTwoDice = document.querySelector('#player2Dice');

const rollBtn = document.querySelector('#rollBtn');
const resetBtn = document.querySelector('#resetBtn');

function randomized() {
  const randomNumber = Math.floor(Math.random() * 6) + 1;
}

rollBtn.addEventListener('click', function () {
  const randomNumber = Math.floor(Math.random() * 6) + 1;

  if (playerOneTurn) {
    playerOneDice.textContent = randomNumber;
    playerOneScore += randomNumber;
    displayScore('playerOne');
    playerOneDice.classList.add('active');
    playerTwoDice.classList.remove('active');
    message.textContent = 'Player 2 Turn';
  } else {
    playerTwoDice.textContent = randomNumber;
    playerTwoScore += randomNumber;
    displayScore('playerTwo');
    playerTwoDice.classList.add('active');
    playerOneDice.classList.remove('active');
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

resetBtn.addEventListener('click', function () {
  playerOneScore = 0;
  playerTwoScore = 0;
  playerOneTurn = true;
  displayScore();
  playerOneDice.textContent = '-';
  playerTwoDice.textContent = '-';
  playerOneDice.classList.add('active');
  playerTwoDice.classList.remove('active');
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
