/*jshint esversion:6*/
/* eslint-env es6 */

export let movesWithoutApple = 0;

export function update3000() {
  if (isSnakeEatApple) {
    //play random eat audio when snake eats the apple
    playEatAudio();
    //add 100 to the score
    changeScore(100);
    //speed up our snake percentage value
    changeGameSpeed(5);
    //zero movesWithoutApple
    movesWithoutApple = 0;
  }

  if (isPowerUpFullLoop) {
  }

  if (isSnakeAfraid) {
  }

  if (isSnakeHuangry) {
  }

  if (isAppleOld) {
  }

  if (isAppleMaxOld) {
  }
}

//  w snake.js zdefiniować kiedy zjadł jabłko
// w update js ma być co ?
