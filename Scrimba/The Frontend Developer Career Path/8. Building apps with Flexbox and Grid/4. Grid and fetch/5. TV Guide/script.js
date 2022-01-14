/*jshint esversion: 11*/
/* eslint-env es12 */

'use strict';

/* 
    TV Guide
    
    Write an async function called findShow(query)
        performs a fetch call to:
        https://api.tvmaze.com/singlesearch/shows?q=${query}&embed=seasons
        and returns the resulting show object
        
    Build a layout to display the show
        - Title
        - Summary
        - Seasons listed as individual divs
*/

async function findShow(query) {
  const response = await fetch(
    `https://api.tvmaze.com/singlesearch/shows?q=${query}&embed=seasons`
  );
  const data = await response.json();
  console.log(data);
  return data;
}

function displayShow(data) {
  let seasons = '';

  data._embedded.seasons.forEach((element, index) => {
    seasons += `<div class="season">Season ${index + 1}</div>`;
  });
  const show = `
  <div class="tv-show">
  <h2 class="show-title">${data.name}</h2>
  <div class="show-summary">${data.summary}</div>
    <div class="seasons">
      ${seasons}
    </div>
  </div>
  `;

  document.body.innerHTML = show;
}

findShow('office').then(displayShow);
