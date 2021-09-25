const messageEl = document.getElementById("message-el");
const cardsEl = document.getElementById("cards-el");
const sumEl = document.getElementById("sum-el");
const startBtn = document.getElementById("start-btn");
const newCardBtn = document.getElementById("newcard-btn");
const scoreEl = document.getElementById("score-el");

let isAlive = true;
let hasBlackJack = false;
let message = "";
let player = {};
player.name = prompt("What's your name?", "Jan Kowalski");
player.chips = prompt("How much money you have?", "200");
let score = 0;
let card = 0;
let cards = [];
let cardsInfo = "";

function random() {
  let randomNum = Math.floor( Math.random()*13 ) + 1;
  if (randomNum === 1) {
    return 11;
  }  else if (randomNum > 10) {
    return 10;
  } else {
    return randomNum;
  }
}

scoreEl.textContent = `${player.name} chips: ${player.chips}$`;

startBtn.addEventListener("click", function() {
  if (player.chips >= 10) {
    isAlive = true;
    hasBlackJack = false;
    cards = [];
    cards.push(random());
    cards.push(random());
    player.chips -= 10;
    game();
  } else {
    messageEl.textContent = "You don't have enough money";
    }
});

newCardBtn.addEventListener("click", function() {
  if (isAlive) {
    cards.push(random());
    game();
  }
});

function render() {
  cardsEl.textContent = `Cards: ${cardsInfo}`;
  sumEl.textContent = `Sum: ${score}`;
  messageEl.textContent = message;
  scoreEl.textContent = `${player.name} chips: ${player.chips}$`;
}

function game() {
    cardsInfo = "";
    score = 0;
    cards.forEach((item, i, arr) => cardsInfo += `${arr[i]} `);
    cards.forEach((item, i, arr) => score += arr[i]);
    if (score === 21) {
      hasBlackJack = true;
      isAlive = false;
      message = "You've got Blackjack!";
      player.chips += 100;
  } else if (score > 21) {
      isAlive = false;
      message = "You're out of the game!";
  } else {
      message = "Do you want to draw a new card?";
  }
  render();
}
