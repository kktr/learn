/*jshint esversion: 6*/
/* eslint-env es6 */
const newDeckBtn = document.getElementById('new-deck');
const drawTwoCardsBtn = document.getElementById('draw-two-cards');
const cardsEl = document.getElementById('cards-el');

let deckId;

function getNewDeckId() {
  fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then(res => res.json())
    .then(deckData => (deckId = deckData.deck_id));
}

function drawTwoCards() {
  fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
    .then(res => res.json())
    .then(deckData => updateCards(deckData));
}

function updateCards(deckData) {
  cardsEl.innerHTML = `
    <image class="player-one-card" src="${deckData.cards[0].image}" />
    <image class="player-two-card" src="${deckData.cards[1].image}" />
    `;
}

newDeckBtn.addEventListener('click', getNewDeckId);
drawTwoCardsBtn.addEventListener('click', drawTwoCards);
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
