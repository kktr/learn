/*jshint esversion: 6*/
/* eslint-env es6 */

// https://apis.scrimba.com/hexcolors/
let howManyColors = 100;

async function getColors() {
  const response = await fetch(
    `https://apis.scrimba.com/hexcolors?count=${howManyColors}`
  );
  const data = await response.json();
  const colors = data.colors;
  console.log(data.colors[0].value);

  displayColors(colors);
}

function displayColors(colors) {
  let myColorHTML = colors
    .map((color, index) => {
      return `<div class="my-color my-color-${index +
        1}" style="background-color: ${color.value}"></div>`;
    })
    .join('');
  // for (let color of colors) {
  //   myColorHTML += `<div class="my-color" style="background-color: ${color.value}">${color.value}</div>`;
  // }

  document.body.innerHTML = `
  <div class="my-colors">
    ${myColorHTML}
  </div>
  `;
}

getColors();
