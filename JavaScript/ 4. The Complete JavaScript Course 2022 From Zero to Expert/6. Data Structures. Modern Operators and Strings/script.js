/*jshint esversion: 11*/
/* eslint-env es12 */

'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';
console.log(flights);

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 0,
    time = '20:00',
    address,
  }) {
    console.log(
      `Order received!
      ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]}
      will be delivered to ${address}
      at ${time}`
    );
  },

  orderPasta: function (ingredient1, ingredient2, ingredient3) {
    console.log(
      `Here is your delicious pasta with ${ingredient1}, ${ingredient2}, ${ingredient3}`
    );
  },

  orderPizza: function (ingredientMain, ...ingredientOthers) {
    console.log(ingredientMain);
    console.log(ingredientOthers);
    return [ingredientMain, ingredientOthers];
  },
};

restaurant.orderDelivery({
  time: '23:30',
  address: 'Via del Sole, 21',
  mainIndex: 2,
  starterIndex: 2,
});

restaurant.orderDelivery({ address: 'Via del Sole, 999' });

// Destructing Arrays

const arr = [2, 3, 4];
const a = arr[0];
const b = arr[1];
const c = arr[2];

console.log(a, b, c);

const [x, y, z] = arr;
console.log(x, y, z);
console.log(arr);

let [first, , third] = restaurant.categories;
console.log(first, third);

// Switching variables
[first, third] = [third, first];

console.log(first, third);

// return 2 values from the function by destructuring
const [starter, main] = restaurant.order(2, 0);
console.log('main: ' + main, 'starter: ' + starter);

// Destructuring nested arrays
const nested = [2, 4, [5, 6]];
const [i, , [j, k]] = nested;
console.log(i, j, k);

// Default values for array
const [p = 1, q = 1, r = 1] = [8, 9];
console.log(p, q, r);

// Destructuring objects

const { thu, fri, saturday } = restaurant.openingHours;
console.log(thu, fri, saturday);

const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;

console.log(restaurantName, hours, tags);

// Default values for object
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);

//Mutating variables
let a2 = 111;
let b2 = 999;
const obj2 = { a: 23, b: 7, c: 14 };
console.log(a2, b2);

({ a2, b2 } = obj2);
console.log(a2, b2);

// Nested objects
const {
  fri: { open: o2, close: c2 },
} = restaurant.openingHours;
console.log(o2, c2);

// 9/105 The spread operator

const arr2 = [7, 8, 9];
const arr3 = [5, 6, ...arr2, 10];
console.log(...arr3);
console.log(5, 6, 7, 8, 9, 10);

const newMenu = [...restaurant.mainMenu, 'Gnocci'];
console.log(newMenu);

// Copy array
const mainMenuCopy = [...restaurant.mainMenu];
console.log(mainMenuCopy);

// Join 2 arrays
const menu2 = [...restaurant.mainMenu, ...restaurant.starterMenu];
console.log(menu2);

// Iterables: arrays, strings, maps, sets, NOT objects
const str = 'Jonas';
const letters = [...str, '', 'J.'];
console.log(...letters);

// Real word example
const ingredients = [
  prompt("Let's make pasta! Ingredient 1?"),
  prompt('Ingredient 2?'),
  prompt('Ingredient 3'),
];

console.log(restaurant.orderPasta(...ingredients));

// Objects
const newRestaurant = { foundedIn: 1998, ...restaurant, founder: 'Thomas' };
console.log(newRestaurant);

const restaurantCopy = { ...restaurant };
restaurantCopy.name = 'Restaurante Roma';
console.log(restaurantCopy);

// 9/106 Rest pattern and parameters

// 1) Destructuring

// SPREAD, because on RIGHT side of =
const arr4 = [1, 2, ...[3, 4]];
console.log(arr4);

// REST because on the LEFT side of =
const [a3, b3, ...others] = [1, 2, 3, 4, 5];
console.log(a3, b3, others);

const [pizza, , risotto, focaccia, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza, risotto, focaccia, otherFood);

// Objects
const { sat, ...weekdays } = restaurant.openingHours;
console.log(weekdays);
console.log(sat);

const {
  mon: mon2 = 'closed',
  sat: sat2,
  ...weekdays2
} = restaurant.openingHours;
console.log(weekdays2);
console.log(sat2);
console.log(mon2);

// 2) Functions
const add = function (...numbers) {
  console.log(numbers);
  return numbers.reduce((a, b) => a + b, 0);
};

console.log(add(2, 3));
console.log(add(5, 7, 2, 6));
console.log(add(3, 4, 5, 6, 2, 5, 6, 3));

console.log(restaurant.orderPizza('mozzarella', 'basil', 'olives'));

// 9/107 Short Circuiting (&& and ||)

// Use ANY data type, return ANY data type, short-circuiting

// || return first truthy value or if there isn't a truthy value return last value
console.log(3 || 'Jonas');
console.log('' || 'Jonas');
console.log(true || 0);
console.log(undefined || null);
console.log(null || 0);

const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1);

restaurant.numGuests = 23;
const guests2 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests2);

const guestsVip3 = restaurant.numGuestsVip || 30;
console.log(guestsVip3);

// && return first falsy value or if there isn't a falsy value return last value

console.log(0 && 'Jonas');
console.log(5 && 'Jonas' && null && 0);

// Practical example
if (restaurant.orderPizza) {
  restaurant.orderPizza('mushrooms', 'spinach');
}

console.log(
  restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach')
);

// 9/108 The Nullish Coalescing Operator ??

// return at left side when value is not a nullish: null and undefined (not 0 or "") or at last value
restaurant.numGuests = 0;
const guest4 = restaurant.numGuests ?? 40;
console.log(guest4);

restaurant.numGuests = undefined;
const guest5 = restaurant.numGuests ?? 40;
console.log(guest5);

// 9/109 Logical Assignment Operator

const restaurant1 = {
  name: 'Capri',
  numberGuests: 200,
};

const restaurant2 = {
  name: 'La Piazza',
  owner: 'Giovanni Rossi',
};

// OR assignment operator
restaurant1.numberGuests = restaurant1.numberGuests || 300;
console.log(restaurant1.numberGuests);

restaurant2.numberGuests = restaurant2.numberGuests || 100;
console.log(restaurant2.numberGuests);

/* jshint ignore:start */
restaurant1.numberGuests ||= 300;
console.log(restaurant1.numberGuests);

restaurant2.numberGuests = 0;
restaurant2.numberGuests ||= 400;
console.log(restaurant2.numberGuests);

// nullish assignment operator
restaurant2.numberGuests = 0;
restaurant2.numberGuests ??= 400;
console.log(restaurant2.numberGuests);

// AND assignment operator
restaurant2.owner &&= 'anonymous';
console.log(restaurant2.owner);
/* jshint ignore:end */

// 9/110 Coding Challenge #1

/* 
We're building a football betting app (soccer for my American friends 😅)!

Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work with the data. So here are your tasks:

1. Create one player array for each team (variables 'players1' and 'players2')
2. The first player in any player array is the goalkeeper and the others are field 
players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's 
name, and one array ('fieldPlayers') with all the remaining 10 field players
3. Create an array 'allPlayers' containing all players of both teams (22 players)
4. During the game, Bayern Munich (team 1) used 3 substitute players. So create 
a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd (called 
'team1', 'draw' and 'team2')
6. Write a function ('printGoals') that receives an arbitrary number of player 
names (NOT an array) and prints each of them to the console, along with the 
number of goals that were scored in total (number of player names passed in)
7. The team with the lower odd is more likely to win. Print to the console which 
team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. 
Then, call the function again with players from game.scored

GOOD LUCK 😀
*/

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// 1
const [players1, players2] = [...game.players];
console.log(players1);
console.log(players2);

// 2
const [goalkeeper, ...fieldPlayers] = players1;
console.log(goalkeeper);
console.log(fieldPlayers);

// 3
const allPlayers = [...players1, ...players2];
console.log(allPlayers);

// 4
const players1Final = [...players1, 'Thiago', 'Coutinhi', 'Perisic'];
console.log(players1Final);

// 5
let { team1, x: draw, team2 } = game.odds;
console.log(team1, draw, team2);

// 6
function printGoals(...players) {
  console.log(players.length, ...players);
}

printGoals(...game.scored);
printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');

// 7
console.log(team1 > team2);
team1 > team2 && console.log('team 1 is more likely to win');
team1 > team2 || console.log('team 2 is more likely to win');

team1 = 10;
team2 = 1;
console.log(team1 > team2);
console.log(team1 > team2 && 'team 1 is more likely to win');
console.log(team1 > team2 || 'team 2 is more likely to win');

// 9/111 Looping Arrays: The for-of Loop

const menu3 = [...restaurant.mainMenu, ...restaurant.starterMenu];

for (const item of menu3) {
  console.log(item);
}

for (const [i, el] of menu3.entries()) {
  console.log(`${i + 1}: ${el}`);
}

// 9/112 Enhanced Object Literals

const weekdays3 = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

const openingHours3 = {
  [weekdays3[3]]: {
    open: 12,
    close: 22,
  },
  [weekdays3[4]]: {
    open: 11,
    close: 23,
  },
  [`day-${4 + 2}]`]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

const restaurant3 = {
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  // ES6 enhanced object literals
  openingHours3,
  // skip writing "function"
  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
};

console.log(restaurant3);

// 9/113 Optional Chaining (?.)

// error Cannot read property 'open' of undefined
// console.log(restaurant.openingHours.mon.open);

if (restaurant.openingHours.mon && restaurant.openingHours.mon.open) {
  console.log(restaurant.openingHours.mon);
}

console.log(restaurant.openingHours.mon?.open);
console.log(restaurant.openingHours.thu?.open);

console.log(restaurant.openingHours?.mon?.open);

const weekdays4 = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

for (const day of weekdays4) {
  const open = restaurant.openingHours[day]?.open ?? 'closed';
  console.log(`In ${day}, we open at ${open}`);
}

// Methods

console.log(restaurant.order?.(0, 1) ?? 'Method does not exist');
console.log(restaurant.car?.(0, 1) ?? 'Method does not exist');

// Arrays

let user = [];
console.log(user[0]?.name ?? 'User array empty');

user = [{ name: 'Jonas', email: 'hello@jonas.io' }];
console.log(user[0]?.name ?? 'User array empty');

// 9/114 Looping Objects: Object Keys, Values, and Entries

// Property keys - NAMES
console.log(restaurant.openingHours);
console.log(Object.keys(restaurant.openingHours));
const properties = Object.keys(restaurant.openingHours);

let openString = `We are open on ${properties.length} days: `;
console.log(openString);

for (const day of Object.keys(restaurant.openingHours)) {
  openString += `${day}, `;
}

console.log(openString);

// Property VALUES
const values = Object.values(restaurant.openingHours);
console.log(values);

// Entries
const entries = Object.entries(restaurant.openingHours);
console.log(entries);

for (const [day, { open, close }] of entries) {
  console.log(day, open, close);
  console.log(`On ${day} we open at ${open} and close at ${close}`);
}

// 9/115 Coding Challenge 2

/* 
Let's continue with our football betting app!

1. Loop over the game.scored array and print each player name to the console, 
along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already
  studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exactly like this:
      Odd of victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them 
(except for "draw"). HINT: Note how the odds and the game objects have the same 
property names 😉

BONUS: Create an object called 'scorers' which contains the names of the players
who scored as properties, and the number of goals as the value. In this game, 
it will look like this:

      {
        Gnarby: 1,
        Hummels: 1,
        Lewandowski: 2
      }

GOOD LUCK 😀
*/

const game2 = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// 1.
const scoredPlayers = [...game2.scored];
console.log(scoredPlayers);

for (const [index, scoredPlayer] of scoredPlayers.entries()) {
  console.log(`Goal ${index + 1}: ${scoredPlayer}`);
}

// 2.
const odds = Object.values(game2.odds);
console.log(odds);

let oddsSum = 0;

for (const odd of odds) {
  oddsSum += odd;
  console.log(odd);
}

console.log(oddsSum / odds.length);

const avgOdds = Object.values(odds).reduce((a, b) => a + b, 0) / odds.length;
console.log(avgOdds);

// 3
const entries2 = Object.entries(game2.odds);
console.log(entries2);

for (const [winner, oddValue] of entries2) {
  // const winnerOrDraw = () => {
  //   if (game2[winner]) {
  //     return 'victory';
  //   } else {
  //     return `draw`;
  //   }
  // };
  const victoryOrWinner = winner === 'x' ? 'draw' : 'victory';
  const victoryOrWinner2 =
    winner === 'x' ? 'draw:' : `victory ${game2?.[winner]}:`;

  console.log(victoryOrWinner);

  console.log(
    `Odd of ${victoryOrWinner} ${game2?.[winner] ?? ''}: ${oddValue}`
  );
  console.log(`Odd of ${victoryOrWinner2} ${oddValue}`);
}

// So the solution is to loop over the array, and add the array elements as
// object properties, and then increase the count as we encounter a new occurrence
// of a certain element

function goals() {
  const scorers = {};

  for (const player of game.scored) {
    console.log(scorers[player]);
    scorers[player] ? scorers[player]++ : (scorers[player] = 1);
    console.log(scorers[player]);
  }

  return scorers;
}

console.log(goals());

//  9/116 Sets

const ordersSet = new Set([
  'Pasta',
  'Pizza',
  'Pizza',
  'Risotto',
  'Pasta',
  'Pizza',
]);

console.log(ordersSet);

console.log(new Set('Jonas'));

console.log(ordersSet.size);
console.log(ordersSet.has('Pizza'));
console.log(ordersSet.has('Potatoes'));

console.log(ordersSet.add('Garlic Bread'));

ordersSet.delete('Risotto');
console.log(ordersSet);

for (const orderSet of ordersSet) {
  console.log(orderSet);
}

// Example
const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
const staffUniqueSet = new Set(staff);
console.log(staffUniqueSet);

const staffUniqueArray = [...staffUniqueSet];
console.log(staffUniqueArray);

const staffUniqueArray2 = [...new Set(staff)];
console.log(staffUniqueArray2);

console.log(new Set(staff).size);

// 9/117 Maps Fundamentals

const restaurants = new Map();
restaurants.set('name', 'Classico Italiano');
console.log(restaurants);

restaurants
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set(1, 'Frieze, Italy')
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open')
  .set(false, 'We are closed');

console.log(restaurants);

console.log(restaurants.get('name'));
console.log(restaurants.get(true));
console.log(restaurants.get(1));

const time = 15;
console.log(
  restaurants.get(
    time >= restaurants.get('open') && time <= restaurants.get('close')
  )
);

console.log(restaurants.has('categories'));
console.log(restaurants.has('car'));
console.log(restaurants.delete(1));
console.log(restaurants.size);

restaurants.set(document.querySelector('h1'), 'Heading');
console.log(restaurants);

const arr5 = [1, 2];

restaurants.set(arr5, 'test');
console.log(restaurants.get(arr5));
