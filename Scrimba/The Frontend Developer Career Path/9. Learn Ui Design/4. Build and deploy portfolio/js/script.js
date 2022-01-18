/*jshint esversion: 11*/
/* eslint-env es12 */

'use strict';

const navToggleBtn = document.getElementById('nav-toggle-btn');
const navEl = document.getElementById('nav-el');

console.log(navEl);
navToggleBtn.addEventListener('click', function (e) {
  e.preventDefault();
  navEl.classList.toggle('nav--visible');
  navToggleBtn.classList.toggle('nav-toggle--fixed');
});
