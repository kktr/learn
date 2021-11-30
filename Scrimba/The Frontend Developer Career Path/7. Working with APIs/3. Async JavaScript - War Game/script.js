/*jshint esversion: 6*/
/* eslint-env es6 */
const newDeckBtnEl = document.getElementById('new-deck-btn-el');
const drawBtnEl = document.getElementById('draw-btn-el');
const cardsEl = document.getElementById('cards-el');
const remaningCardsNumEl = document.getElementById('remaning-card-num-el');
const player1PointsEl = document.getElementById('player1-points-el');
const player2PointsEl = document.getElementById('player2-points-el');
const battleInfoEl = document.getElementById('battle-info-el');

let deckId;
let remainingCards;
let player1Score = 0;
let player2Score = 0;

function getNewDeckId() {
  fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then(res => res.json())
    .then(deckData => {
      remainingCards = deckData.remaining;
      deckId = deckData.deck_id;
    })
    .then(remainingCards => updateRemaningCards())
    .then(updateRemaningCards => makeActiveDrawBtnEl())
    .then(makeActiveDrawBtnEl => removeCards());

  battleInfoEl.innerHTML = 'War!';
  player1Score = 0;
  player2Score = 0;
}

function updateRemaningCards() {
  remaningCardsNumEl.innerHTML = remainingCards;
}

function makeActiveDrawBtnEl() {
  drawBtnEl.classList.add('btn-active');
  drawBtnEl.innerHTML = 'Draw';
}

function removeCards() {
  cardsEl.children[0].innerHTML = '';
  cardsEl.children[1].innerHTML = '';
}

function drawTwoCards() {
  battleInfoEl.innerHTML = 'War!';
  fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
    .then(res => res.json())
    .then(deckData => {
      updateCards(deckData);
      updateScore(deckData);
      remainingCards = deckData.remaining;
    });
}

function updateCards(deckData) {
  for (let i = 0; i < cardsEl.children.length; i++) {
    cardsEl.children[i].innerHTML = `<image class="card player${i +
      1}-card" src="${deckData.cards[i].image}" />
    `;
  }

  remainingCards -= 2;
  updateRemaningCards();
}

// too long!
function updateScore(deckData) {
  let player1CardValue = deckData.cards[0].value;
  let player2CardValue = deckData.cards[1].value;
  let player1Points = 0;
  let player2Points = 0;

  // prettier-ignore
  const cardsValues =
  ['2','3','4','5','6','7','8','9','10','JACK','QUEEN','KING','ACE'];

  for (let i = 0; i < cardsValues.length; i++) {
    if (player1CardValue == cardsValues[i]) {
      player1Points = i;
    } else if (player2CardValue == cardsValues[i]) {
      player2Points = i;
    }
  }

  if (player1Points > player2Points) {
    player1Score += 1;
    battleInfoEl.innerHTML = 'Computer Wins!';
  } else if (player1Points < player2Points) {
    player2Score += 1;
    battleInfoEl.innerHTML = 'You Win!';
  }

  player1PointsEl.innerHTML = `${player1Score}`;
  player2PointsEl.innerHTML = `${player2Score}`;

  if (deckData.remaining == '0') {
    if (player1Points > player2Points) {
      battleInfoEl.innerHTML = 'The computer Won the Game!';
    } else if (player1Points < player2Points) {
      battleInfoEl.innerHTML = 'You Won the Game!';
    } else if (player1Points == player2Points) {
      battleInfoEl.innerHTML = 'No one won, there is a draw';
    }

    drawBtnEl.classList.remove('btn-active');
    drawBtnEl.innerHTML = 'Draw (first take a new deck)';
  }
}

newDeckBtnEl.addEventListener('click', getNewDeckId);
drawBtnEl.addEventListener('click', drawTwoCards);
/**
 * Challenge
 *
 * Background:
 * The Deck of Cards API expects us to provide the deck id
 * of the deck we're playing with so it can remember which
 * cards we've already drawn, how many are remaining in the
 * deck, etc.
 *
 * Task: save the deck_id from the returned data to a local
 * variable so we can use it later
 */
