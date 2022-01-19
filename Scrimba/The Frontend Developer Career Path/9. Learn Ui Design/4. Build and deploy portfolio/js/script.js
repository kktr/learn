/*jshint esversion: 11*/
/* eslint-env es12 */

'use strict';

const navToggleBtn = document.getElementById('nav-toggle-btn');
const navEl = document.getElementById('nav-el');
const navLinksEl = document.querySelectorAll('.nav__link');

console.log(navEl);
navToggleBtn.addEventListener('click', function (e) {
  e.preventDefault();
  navEl.classList.toggle('nav--visible');
  navToggleBtn.classList.toggle('nav-toggle--fixed');
});

navLinksEl.forEach((link) => {
  link.addEventListener('click', function (e) {
    navEl.classList.remove('nav--visible');
    navToggleBtn.classList.remove('nav-toggle--fixed');
  });
});
