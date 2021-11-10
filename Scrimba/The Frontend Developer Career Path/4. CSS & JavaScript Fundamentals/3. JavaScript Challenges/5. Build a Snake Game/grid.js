/*jshint esversion:6*/
/* eslint-env es6 */
import { width } from './input.js';

const gridPlayground = document.querySelector('.grid-playground');
const gridBackground = document.querySelector('.grid-background');

export let squaresPlayground = [];
export let squaresBackground = [];

// creating a playground with 100 fields for snake movements and the appearance of apples
export function createGridPlayground() {
  //create 100 of these elements with a for loop
  for (let i = 0; i < width * width; i++) {
    //create element
    const squarePlayground = document.createElement('div');
    //add styling to the element
    squarePlayground.classList.add('square-playground');
    //put the element into our grid
    gridPlayground.appendChild(squarePlayground);
    //push it into a new squares array
    squaresPlayground.push(squarePlayground);
  }
}

//create a playground with 100 fields for the snake tombstones and the background img
export function createGridBackground() {
  //create 100 of these elements with a for loop
  for (let i = 0; i < width * width; i++) {
    //create element
    const squareBackground = document.createElement('div');
    //add styling to the element
    squareBackground.classList.add('square-background');
    //put the element into our grid
    gridBackground.appendChild(squareBackground);
    //push it into a new squares array
    squaresBackground.push(squareBackground);
  }
}
