/*jshint esversion: 6*/
/* eslint-env es6 */
const newDeckBtnEl = document.getElementById('new-deck-btn-el');
const drawBtnEl = document.getElementById('draw-btn-el');
const cardsEl = document.getElementById('cards-el');

let deckId;
let remainingCards;

function getNewDeckId() {
  cardsEl.innerHTML = '';
  fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then(res => res.json())
    .then(deckData => (deckId = deckData.deck_id))
    .then(function drawBtnElActive() {
      drawBtnEl.classList.add('btn-active');
    });
}

function drawTwoCards() {
  fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
    .then(res => res.json())
    .then(deckData => {
      updateCards(deckData);
      remainingCards = deckData.remaining;
    });
}

function updateCards(deckData) {
  console.log(cardsEl.childNodes[0]);
  // cardsEl.innerHTML = `
  //   <image class="card player-one-card" src="${deckData.cards[0].image}" />
  //   <image class="card player-two-card" src="${deckData.cards[1].image}" />
  //   `;
  for (let i = 0; i < cardsEl.childNodeschildNodes.length; i++) {
    console.log(cardsEl.childNodes[i]);
    //   cardsEl.children[i].innerHTML = `
    // <div class="card-slot">
    //   <image class="card player-one-card" src="${deckData.cards[i].image}" />
    // </div>
    // `;
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
