/*jshint esversion: 6 */
/* eslint-env es6 */
const modalBg = document.querySelector('#modal-bg');
const openModalBtn = document.querySelector('#open-modal-btn');
const closeModalBtn = document.querySelector('#close-modal-btn');

openModalBtn.addEventListener('click', function() {
  modalBg.classList.add('visible');
});

closeModalBtn.addEventListener('click', function() {
  modalBg.classList.remove('visible');
});

//we need an event listener just attaches to an element (like a light switch)
//- in this case a DOM element, our button(s)!
// DOM elements = anything you see on the page on the document (divs, buttons,
// tables, links--any HTML element!divs, buttons, tables, links--any HTML element!)
// you can switch out "click" or be other types of DOM events (keydown, mouseover),
// any sort of event that a user can do, you can capture user actions using event listeners!

// alt solution
// document.getElementById("modal-bg").style.visibility = "visible";
// document.getElementById("modal-bg").style.opacity = "1"
// or
// modalBg.style.visibility = "visible";
// modalBg.style.opacity = "1";
