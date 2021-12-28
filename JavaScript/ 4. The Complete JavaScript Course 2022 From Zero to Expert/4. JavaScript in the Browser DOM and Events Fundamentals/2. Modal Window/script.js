/*jshint esversion: 6*/
/* eslint-env es6 */
'use strict';

const showModalButtons = document.querySelectorAll('.show-modal');
const modalEl = document.querySelector('.modal');
const closeModalEl = document.querySelector('.close-modal');
const overlayEl = document.querySelector('.overlay');

function displayModal() {
  modalEl.classList.remove('hidden');
  overlayEl.classList.remove('hidden');
}

function hideModal() {
  modalEl.classList.add('hidden');
  overlayEl.classList.add('hidden');
}

showModalButtons.forEach((btn) => btn.addEventListener('click', displayModal));

closeModalEl.addEventListener('click', hideModal);

overlayEl.addEventListener('click', hideModal);

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !modalEl.classList.contains('hidden')) {
    hideModal();
  }
});
