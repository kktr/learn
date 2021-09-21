let hands = ["rock", "paper", "scissor"]

// Create a function that returns a random item from the array
function random() {
  console.log(hands[Math.floor(Math.random()*3)]);
};

random();
