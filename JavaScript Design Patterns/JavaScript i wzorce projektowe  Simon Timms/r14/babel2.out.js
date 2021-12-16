function CreateFeast(meat) {
  var drink = arguments[1] !== (void 0) ? arguments[1] : "Wino";
  console.log("Danie to: " + meat);
  console.log("Napój to: " + drink);
}
CreateFeast("Dziczyzna", "Piwo");
CreateFeast("Sarnina");
