/*jshint esversion: 6*/
/* eslint-env es6 */
const buttonNewIdea = document.getElementById('button-new-idea');
const textNewIdea = document.getElementById('text-new-idea');
const main = document.getElementById('main');
const siteTitle = document.getElementById('site-tite');
const siteInfo = document.getElementById('site-info');

let newIdea = '';

function getNewIdea() {
  fetch('https://apis.scrimba.com/bored/api/activity')
    .then(response => response.json())
    .then(data => (newIdea = data.activity));
}

getNewIdea();

function displayNewIdea() {
  getNewIdea();
  textNewIdea.textContent = newIdea;
  console.log(newIdea);
  main.classList.add('color-bg');
  siteTitle.classList.add('h1-colored');
  siteInfo.classList.add('h4-colored');
  buttonNewIdea.classList.add('btn-colored');
  // siteTitle.classList.remove('black-text');
  // siteInfo.classList.remove('black-text');
}

buttonNewIdea.addEventListener('click', displayNewIdea);
