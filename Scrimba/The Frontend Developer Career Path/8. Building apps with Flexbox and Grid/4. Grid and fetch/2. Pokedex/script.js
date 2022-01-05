/*jshint esversion: 11*/
/* eslint-env es12 */

'use strict';

/*
    Pokedex
    
    Write an async function 
        that uses fetch() to fetch all 
        Pokemon from pokemon.json
    
    Display all the Pokemon
        ID, English Name, 
        Type(s), 
        Stats: HP/Attack/Defense/Speed
*/

async function getPokedex() {
  let response = await fetch('pokemon.json');
  let data = await response.json();
  console.log(data[0]);
  return data;
}

getPokedex();

getPokedex().then((data) => {
  console.log(...data[0].type);
  document.body.innerHTML = getPokemons(data);
});

function getPokemons(data) {
  let pokemons = [];
  for (let i = 0; i < data.length; i++) {
    let type = [...data[i].type];
    let typeStr = type.toString().replace(',', ' / ');
    pokemons.push(
      `<div class="pokemon">
        <div class="info">
          <p class="number">${i + 1}</p>
          <p class="name">${data[i].name.english}</p>
          <p class="type">${typeStr}</p>
        </div>

        <div class="stats">
          <p>HP: ${data[i].base.HP}</p>
          <p>Attack: ${data[i].base.Attack}</p>
          <p>Defense: ${data[i].base.Defense}</p>
          <p>Speed: ${data[i].base.Speed}</p>
        </div>
      </div>`
    );
  }

  console.log(pokemons[0]);
  return pokemons[0];
  console.log(pokemons[0]);
}

// name2: data[i].name.english,
//       type: data[i].type,
//       base: [
//         data[i].base['HP'],
//         data[i].base['Attack'],
//         data[i].base['Defense'],
//         data[i].base['Speed'],
//       ],
