/*jshint esversion: 6*/
/* eslint-env es6 */
const newDeckBtnEl = document.getElementById('new-deck-btn-el');
const drawBtnEl = document.getElementById('draw-btn-el');
const cardsEl = document.getElementById('cards-el');
const remaningCardsNumEl = document.getElementById('remaning-card-num-el');
const player1PointsEl = document.getElementById('player1-points-el');
const player2PointsEl = document.getElementById('player2-points-el');

let deckId;
let remainingCards;
let player1Score;
let player2Score;

function getNewDeckId() {
  fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then(res => res.json())
    .then(deckData => {
      remainingCards = deckData.remaining;
      deckId = deckData.deck_id;
    })
    .then(remainingCards => updateRemaningCards())
    .then(updateRemaningCards => makeActiveDrawBtnEl());

  removeCards();
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

// function updateScore(deckData) {
//   let player1CardValue = 0;
//   let player2CardValue = 0;
//   if ((decData.cards[0].value = 'ACE')) {
//     player1CardValue += 14;
//   }
// }

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
