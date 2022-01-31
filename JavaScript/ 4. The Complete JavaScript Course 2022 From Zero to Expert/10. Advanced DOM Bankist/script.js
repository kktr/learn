/*jshint esversion: 11*/
/* eslint-env es12 */

'use strict';
///////////////////////////////////////

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const navLink = document.querySelectorAll('.nav__link');
const navLinks = document.querySelector('.nav__links');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// Modal window
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

// button smooth scrolling

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log('s1coords', s1coords);

  console.log(e.target.getBoundingClientRect());

  console.log('Current scroll (X/Y', window.pageXOffset, window.pageYOffset);

  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // Scrolling
  //   window.scrollTo(
  //     s1coords.left + window.pageXOffset,
  //     s1coords.top + window.pageYOffset
  //   );
  // });
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });
  section1.scrollIntoView({ behavior: 'smooth' });
});

// Page navigation

// navLink.forEach(function (link) {
//   link.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     const section = document.querySelector(id);

//     section.scrollIntoView({ behavior: 'smooth' });
//   });
// });

// 1. Add even listener to common parent element
navLinks.addEventListener('click', function (e) {
  e.preventDefault();

  // matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    const section = document.querySelector(id);

    section.scrollIntoView({ behavior: 'smooth' });
  }
});

//! Lessons

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

// 13/188 Implementing smooth scrolling

// 13/189 Types of events and events handlers

const h1 = document.querySelector('h1');

const alertH1 = function (e) {
  alert('addEventListener: Great! You are reading the heading');

  h1.removeEventListener('mouseenter', alertH1);
};

// h1.addEventListener('mouseenter', alertH1);

// 13/190 Event propagation: bubbling and capturing

// 13/191 Event propagation in practice

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () =>
  `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

document.querySelector('.nav__link').addEventListener('click', function (e) {
  console.log('nav__link', e.target, e.currentTarget);
  this.style.backgroundColor = randomColor();
  e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  console.log('.nav__links', e.target, e.currentTarget);
  this.style.backgroundColor = randomColor();
});

document.querySelector('.nav').addEventListener('click', function (e) {
  console.log('.nav', e.target, e.currentTarget);
  this.style.backgroundColor = randomColor();
});
