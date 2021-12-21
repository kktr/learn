/*jshint esversion: 6*/
/* eslint-env es6 */

// https://apis.scrimba.com/hexcolors/
const photoGaleryEl = document.getElementById('photo-galery');

let photo = { id: 1055 };

async function getColors() {
  let photos = [];
  let howManyPhotos = 10;

  for (let i = 0; i < howManyPhotos; i++) {
    const response = await fetch(`https://picsum.photos/id/${i + 100}/100/100`);
    if (response.status !== 200) {
      howManyPhotos += 1;
      continue;
    }
    const url = response.url;
    photos.push(url);
    console.log(response.status);
  }
  displayphotos(photos);
  // displayColors(colors);
}

function displayphotos(photos) {
  let myphotoHTML = photos
    .map((photo, index) => {
      return `<img class="my-photo my-photo-${index + 1}" src="${photo}">`;
    })
    .join('');
  // for (let color of colors) {
  //   myColorHTML += `<div class="my-color" style="background-color: ${color.value}">${color.value}</div>`;
  // }

  photoGaleryEl.innerHTML = myphotoHTML;
}

getColors();
