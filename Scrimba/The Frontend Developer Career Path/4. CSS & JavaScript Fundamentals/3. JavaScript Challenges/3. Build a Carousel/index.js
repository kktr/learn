/*jshint esversion: 6 */

const carousel = document.querySelector('#carousel');
const carouselBtnPrev = document.querySelector('#carousel-btn-prev');
const carouselBtnNext = document.querySelector('#carousel-btn-next');
const carouselItem = document.querySelectorAll('.carousel-item');
let count = 0;
carouselBtnNext.addEventListener('click', function () {
  console.log('P');
  count += 1;
  if (count == 3) {
    count = 0;
  }

  if (count == 1) {
    carouselItem[1].classList.add('carousel-item-visible');
    carouselItem[0].classList.remove('carousel-item-visible');
  } else if (count == 2) {
    carouselItem[2].classList.add('carousel-item-visible');
    carouselItem[1].classList.remove('carousel-item-visible');
  } else if (count == 0) {
    carouselItem[0].classList.add('carousel-item-visible');
    carouselItem[2].classList.remove('carousel-item-visible');
  }
});
carouselBtnPrev.addEventListener('click', function () {
  console.log('P');
  count -= 1;
  if (count == -1) {
    count = 2;
  }

  if (count == 1) {
    carouselItem[1].classList.add('carousel-item-visible');
    carouselItem[2].classList.remove('carousel-item-visible');
  } else if (count == 2) {
    carouselItem[2].classList.add('carousel-item-visible');
    carouselItem[0].classList.remove('carousel-item-visible');
  } else if (count == 0) {
    carouselItem[0].classList.add('carousel-item-visible');
    carouselItem[1].classList.remove('carousel-item-visible');
  }
});
