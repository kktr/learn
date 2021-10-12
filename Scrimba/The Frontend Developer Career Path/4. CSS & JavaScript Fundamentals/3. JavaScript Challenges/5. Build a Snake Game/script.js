/*jshint esversion:6*/
const grid = document.querySelector('.grid');
const startBtn = document.querySelector('#start');
const score = document.querySelector('#score');
let squares = [];

function createGrid() {
  for (let i = 0; i < 100; i++) {
    const square = document.createElement('div');
    square.classList.add('square');
    grid.appendChild(square);
    squares.push(square);
  }
}

createGrid();
