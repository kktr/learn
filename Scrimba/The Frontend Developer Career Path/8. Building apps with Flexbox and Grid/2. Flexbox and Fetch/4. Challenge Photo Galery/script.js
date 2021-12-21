/*jshint esversion: 6*/
/* eslint-env es6 */

/*
    Challenge:

        Reverse the Column's direction in my-gallery
            Such that my-photos appear over #my-selected-photo

        Change the size of #my-selected-photo to 300x300
            And set its default src to be the 3rd item in the Photos array

        Align the photos in my-photos to the right, using Flexbox
            Align #my-selected-photo to the left, using Flexbox
*/

// selectedPhoto.src =
//   myPhotoImgs[2].src.substr(0, photoImg.src.length - 7) + `300/300`;

async function getPhotos() {
  let response = await fetch('photos.json');
  let photos = await response.json();
  return photos;
}

function getMyPhotosHtml(photos) {
  let myPhotosHtml = photos
    .map(photo => {
      return `<img class="my-photo" src="https://picsum.photos/id/${photo.id}/100/100" alt="${photo.title}"/>`;
    })
    .join('');
  return `<div class="my-photos">${myPhotosHtml}</div>`;
}

getPhotos().then(photos => {
  let myPhotosHtml = getMyPhotosHtml(photos);
  document.body.innerHTML = `<div class="my-gallery">
        <img id="my-selected-photo" class="my-photo"
        src="https://picsum.photos/id/3/300/300" />
        ${myPhotosHtml}
    </div>`;

  let myPhotoImgs = Array.from(document.getElementsByClassName('my-photo'));

  myPhotoImgs.forEach(photoImg => {
    photoImg.addEventListener('click', e => {
      let selectedPhotoSrc =
        photoImg.src.substr(0, photoImg.src.length - 7) + `300/300`;

      let selectedPhoto = document.getElementById('my-selected-photo');
      selectedPhoto.src = selectedPhotoSrc;
      selectedPhoto.style.display = 'inline';
    });
  });
});
