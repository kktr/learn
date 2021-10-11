/*jshint esversion: 6 */

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
  console.log(Math.floor(Math.random() * 6) + 1);
}

rollBtn.addEventListener('click', randomized);

randomized();
