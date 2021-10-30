/*jshint esversion: 6*/
/* eslint-env es6 */
const carouselBtnPrev = document.querySelector('#carousel-btn-prev');
const carouselBtnNext = document.querySelector('#carousel-btn-next');
const carouselItem = document.querySelectorAll('.carousel-item');
let count = 0;

carouselBtnNext.addEventListener('click', function() {
  if (count == carouselItem.length - 1) {
    count = 0;
  } else count += 1;

  hideAllSlides();
  carouselItem[count].classList.add('carousel-item-visible');
});

carouselBtnPrev.addEventListener('click', function() {
  if (count > 0) {
    count -= 1;
  } else count = carouselItem.length - 1;

  hideAllSlides();

  carouselItem[count].classList.add('carousel-item-visible');
});

function hideAllSlides() {
  for (var i = 0; i < carouselItem.length; i++) {
    carouselItem[i].classList.remove('carousel-item-visible');
  }
}
