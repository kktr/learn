/*jshint esversion: 8*/
/* eslint-env es8 */

async function fetchDeckJSON() {
  const response = await fetch(
    'https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/'
  );
  const deck = await response.json();
  return deck;
}
fetchDeckJSON().then(deck => {
  console.log(deck); // fetched movies
});

// const people = [
//   { name: 'Jack', hasPet: true, age: 12 },
//   { name: 'Jill', hasPet: false, age: 18 },
//   { name: 'Alice', hasPet: true, age: 22 },
//   { name: 'Bob', hasPet: false, age: 32 }
// ];
//
// function gimmeThePets(person) {
//   return person.hasPet;
// }
//
// const peopleWithPets = people.filter(gimmeThePets);
// console.log(peopleWithPets);

// https://www.javascripttutorial.net/javascript-array-filter

/**
 * Extra challenge to practice array.filter:
 *
 * Using .filter, create a new array of people who are 18 and older
 * (should be Jill, Alice, and Bob)
 */
// let isOlderThan18 = person => person.age > 18;
//
// const peoplePast18 = people.filter(isOlderThan18);
//
// console.log(peoplePast18);

// let hasPet = person => {
//   return person.hasPet;
// };

function filterArray(people, callback) {
  const resultingArray = [];
  for (let person of people) {
    const shouldBeIncluded = callback(person);
    if (shouldBeIncluded) {
      resultingArray.push(person.email);
    }
  }
  return resultingArray;
  // Write your filtering logic here
}

// We'll do this later
// const peopleWithPets = filterArray(people, hasPet);

// console.log(peopleWithPets);

/**
 * Challenge: method chaining!
 *
 * 1. Select the button in the DOM and add an event listener to it without saving the DOM element as a separate variable. I.e. "chain" the `addEventListener` on after your `getElementById()`(When clicked, log "Clicked" to the console)
 *    - I realize this might feel like busywork, but my intent will make sense soon
 *
 * 2. Given the array below, chain the `.filter` and `.map` array methods together to turn the array into an array of string email addresses of only the people in the array who voted. Log the array of email addresses to the console
 */

// document.getElementById("new-deck").addEventListener("click", function() {
//     console.log("Clicked!")
// })

const voters = [
  { name: 'Joe', email: 'joe@joe.com', voted: true },
  { name: 'Jane', email: 'jane@jane.com', voted: true },
  { name: 'Bo', email: 'bo@bo.com', voted: false },
  { name: 'Bane', email: 'bane@bane.com', voted: false }
];

let hasVoted = person => {
  if (person.voted) return person.email;
};

// Write your code below
const votersMails = filterArray(voters, hasVoted);

console.log(votersMails);
// Final result: ["joe@joe.com", "jane@jane.com"]

// Write your code below
const finalResult = voters
  .filter(voter => voter.voted)
  .map(voter => voter.email);
console.log(finalResult);

// Final result: ["joe@joe.com", "jane@jane.com"]

fetch('https://apis.scrimba.com/bored/api/activity')
  .then(function(res) {
    return 'Hello';
  })
  .then(function(whatever) {
    console.log(whatever);
    return 'World';
  })
  .then(function(another) {
    console.log(another);
  });
