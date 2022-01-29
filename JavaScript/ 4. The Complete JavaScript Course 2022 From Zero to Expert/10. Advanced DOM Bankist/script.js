/*jshint esversion: 11*/
/* eslint-env es12 */

'use strict';
///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnsOpenModal.forEach((btn) => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// 13/186 Selecting, Creating, and Deleting Elements

console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
console.log('🚀 ~ allSections', allSections);

console.log(document.getElementById('section--1'));

const allButtons = document.getElementsByTagName('button');
console.log('🚀 ~ allButtons', allButtons);

console.log(document.getElementsByClassName('btn'));

// Creating and inserting elements
const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = 'We use cookie for improve functionality and analytics'
message.innerHTML = `We use cookie for improve functionality and analytics. <button class="btn btn-close-cookie">Got it!</button>`;

// header.prepend(message);

// header.append(message.cloneNode(true));

header.append(message);

// header.before(message);
// header.after(message);

console.log(document.querySelector('.btn-close-cookie'));
document
  .querySelector('.btn-close-cookie')
  .addEventListener('click', function (e) {
    e.preventDefault;
    message.remove();
  });

// 13/187 Styles, Attributes and Classes

// styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

console.log('only for inline style', message.style.backgroundColor);
console.log('empty', message.style.height);

console.log('for real style, css, browser', getComputedStyle(message).height);

const height = getComputedStyle(message).height;
console.log('🚀 ~ height', height);
console.log(parseInt(height));

message.style.height = `${parseInt(height) + 100}px`;

console.log('🚀 ~ height', height);
console.log('after change', message.style.height);

document.documentElement.style.setProperty('--color-primary', 'orangered');

// Attributes
const logo = document.querySelector('.nav__logo');
console.log('alt', logo.alt);
console.log('absolute src', logo.src);
console.log('relative src', logo.getAttribute('src'));
console.log('src', logo.className);

// Non-standard, don't work
console.log(logo.designer);
console.log(logo.getAttribute('designer'));

logo.setAttribute('company', 'Bankist');

logo.alt = 'beautiful minimalist logo';
console.log(logo.alt);

// data attributes
console.log(logo.dataset.versionNumber);

// Classes
logo.classList.add('c');
logo.classList.remove('c');
logo.classList.toggle('c');
logo.classList.contains('c');

// don't use
// logo.className = 'jonas'
