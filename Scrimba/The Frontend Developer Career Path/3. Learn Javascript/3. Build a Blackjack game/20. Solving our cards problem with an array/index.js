let firstCard = 10
let secondCard = 4
let sum = firstCard + secondCard
let card
let cards = [firstCard, secondCard]
let hasBlackJack = false
let isAlive = true
let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")

function startGame() {
    sum = firstCard + secondCard
    cards = [firstCard, secondCard];
    renderGame()
}

function renderGame() {
    // render out firstCard and secondCard
    cardsEl.textContent = "Cards: " + cards[0] + " " + cards[1];
    if (cards.length >= 3 ) {
        cardsEl.textContent = "Cards: " + cards[0] + " " + cards[1] + " " + card;
        console.log(cards[3])
        console.log(cards);;
    };
    // render out ALL the cards we have
    sumEl.textContent = "Sum: " + sum
    if (sum <= 20) {
        message = "Do you want to draw a new card?"
    } else if (sum === 21) {
        message = "You've got Blackjack!"
        hasBlackJack = true
    } else {
        message = "You're out of the game!"
        isAlive = false
    }
    messageEl.textContent = message
}


function newCard() {
    card = 6
    cards.push(card)
    cardsEl.textContent = "Cards: " + cards[0] + " " + cards[1] + " " + cards[3];
    sum += card
    renderGame()
}
