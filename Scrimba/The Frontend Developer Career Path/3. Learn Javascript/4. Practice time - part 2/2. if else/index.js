let agee = 15;

// less than 6 years old -> free
// 6 to 17 years old     -> child discount
// 18 to 26 years old    -> student discount
// 27 to 66 years old    -> full price
// over 66 years old     -> senior citizen discount

// Create a conditional statement (if/else/else if) that logs out the discount
// the passenger will get based upon the value of the age variable
function discount(age) {
  if (age < 6) {
    return "free";
  } else if (age < 18) {
    return "child disount";
  } else if (age < 27) {
    return "student discount";
  } else if (age < 67) {
    return "full price";
  } else {
    return "senior citizen discount";
  }
}
console.log(discount(agee));
