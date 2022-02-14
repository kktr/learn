// Check if the person is eligible for a birthday card from the King! (100)

let age = 100;

// if less than 100    -> "Not eligible"
// else if exactly 100 -> "Here is your birthday card from the King!"
// else                -> "Not eligible, you have already gotten one"

if (age < 100) {
  console.log('Not eligible');
} else if (age === 100) {
  console.log('Here is your birthday card from the King!');
} else {
  console.log('Not eligible, you already gotten one');
}
