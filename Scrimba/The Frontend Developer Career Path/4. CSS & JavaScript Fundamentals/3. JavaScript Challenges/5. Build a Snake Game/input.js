/*jshint esversion:6*/
/* eslint-env es6 */
const keyCodes = {
  up: 38,
  left: 37,
  right: 39,
  down: 40
};

export const width = 10;

export const directions = {
  up: -width,
  left: -1,
  right: 1,
  down: width
};
export let directionOfMovement = directions.right;

export function setDirectionOfMovement() {
  directionOfMovement = directions.right;
}

export function control(e) {
  if (e.keyCode === keyCodes.right) {
    directionOfMovement = directions.right;
  } else if (e.keyCode === keyCodes.up) {
    directionOfMovement = directions.up;
  } else if (e.keyCode === keyCodes.left) {
    directionOfMovement = directions.left;
  } else if (e.keyCode === keyCodes.down) {
    directionOfMovement = directions.down;
  }
}

document.addEventListener('keydown', control);
