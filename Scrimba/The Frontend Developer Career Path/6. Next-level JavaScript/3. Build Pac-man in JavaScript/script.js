/*jshint esversion: 6*/
/* eslint-env es6 */
const grid = document.getElementById('grid');
const score = document.getElementById('score');

let points = 0;
let squares = [];
let gameComponents = [];
const width = 28;

const directions = { up: -width, down: width, left: -1, right: 1 };
// const directionsArray = [up, down, left, right];
const com = { pacdots: 0, wall: 1, ghostliar: 2, powerpellet: 3, emptry: 4 };

const gameElements = [
  'pac-dots',
  'wall',
  'ghost-lair',
  'power-pellet',
  'empty'
];

class Component {
  constructor(number, clas) {
    this.number = number;
    this.clas = clas;
  }
  isInLoyaut(i) {
    if (layout[i] == this.number) return true;
  }
  display(i) {
    squares[i].classList.add(this.clas);
  }
  removeDisplay(i) {
    squares[i].classList.remove(this.clas);
  }
  isEatenByPacMan() {
    if (squares[pacMan.currentPosition].classList.contains(this.clas))
      return true;
    return false;
  }
  eatenByPacMan(point) {
    if (this.isEatenByPacMan()) {
      this.removeDisplay(pacMan.currentPosition);
      points += point;
      displayPoints();
    }
  }
}

function displayPoints() {
  score.innerHTML = points;
}

function createComponents(array) {
  for (let i = 0; i < array.length; i++) {
    let componentName = array[i].replace('-', '');
    componentName = new Component(i, array[i]);
    gameComponents.push(componentName);
  }
}

createComponents(gameElements);

class Sprite extends Component {
  constructor(number, clas, startposition, moveDirection) {
    super(number, clas);
    this.startPosition = startposition;
    this.currentPosition = startposition;
    this.moveDirection = moveDirection;
  }
  isOnBorder(direction) {
    if (direction == directions.up) {
      if (this.currentPosition - width >= 0) {
        return false;
      } else return true;
    } else if (direction == directions.down) {
      if (this.currentPosition + width < width * width) {
        return false;
      } else return true;
    } else if (direction == directions.left) {
      if (this.currentPosition % width !== 0) {
        return false;
      } else return true;
    } else if (direction == directions.right) {
      if (this.currentPosition % width < width - 1) {
        return false;
      } else return true;
    }
    return true;
  }
  isHeading(something) {
    if (
      squares[this.currentPosition + this.moveDirection].classList.contains(
        something.clas
      )
    )
      return true;
    else return false;
  }
  isTryingMove(where) {
    if (this.moveDirection == where) return true;
    else return false;
  }
  isHeadingLeftPortal() {
    if ((this.currentPosition == 364) & (this.moveDirection == directions.left))
      return true;
    return false;
  }
  isHeadingRightPortal() {
    if (
      (this.currentPosition == 391) &
      (this.moveDirection == directions.right)
    )
      return true;
    return false;
  }
  moveThroughLeftPortal() {
    this.currentPosition = 391;
  }
  moveThroughRightPortal() {
    this.currentPosition = 364;
  }
  move(where) {
    this.currentPosition += where;
  }
}

pacMan = new Sprite(6, 'pacman', 490, directions.right);

class Ghost extends Sprite {
  constructor(number, clas, startPosition, moveDirection, speed) {
    super(number, clas, startPosition, moveDirection);
    this.currentPosition = startPosition;
    this.speed = speed;
    this.timerId = NaN;
  }
  getRandomDirection() {
    const possibleDirections = [width, -width, 1, -1];
    return possibleDirections[
      Math.floor(Math.random() * possibleDirections.length)
    ];
  }
  // setNewMoveDirection() {
  //   this.moveDirection = this.getRandomDirection();
  //   if (this.isHeading(gameComponents[com.wall])) return setNewMoveDirection();
  // }
  // moving() {
  //   removeDisplay(this.currentPosition);
  // }
}

const ghosts = [
  new Ghost(7, 'blinky', 348, directions.right, 250),
  new Ghost(8, 'pinky', 376, directions.right, 400),
  new Ghost(9, 'inky', 351, directions.right, 300),
  new Ghost(10, 'clyde', 379, directions.right, 500)
];

// prettier-ignore
const layout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
];

function createBoard() {
  for (let i = 0; i < layout.length; i++) {
    const square = document.createElement('div');
    grid.appendChild(square);
    squares.push(square);
    for (let j = 0; j < gameComponents.length; j++) {
      if (gameComponents[j].isInLoyaut(i)) {
        gameComponents[j].display(i, squares);
      }
    }
    for (let j = 0; j < ghosts.length; j++) {
      if (i == ghosts[j].startPosition) {
        ghosts[j].display(i, squares);
      }
    }
  }
}

createBoard();

// ghosts.forEach(ghost => squares[ghost.position].classList.add(ghosts.clas));
//move the ghosts
// ghosts.forEach(ghost => moveGhost(ghost));

// function moveGhost(ghost) {
//   console.log('moved ghost');
//   const directions = [-1, +1, -width, +width];
// }

pacMan.display(pacMan.startPosition);

setInterval(game, 500);

function game() {
  pacMan.removeDisplay(pacMan.currentPosition);
  move();
  pacMan.display(pacMan.currentPosition);
  gameComponents[com.pacdots].eatenByPacMan(1);
}

function move() {
  if (pacMan.isHeadingLeftPortal()) {
    pacMan.moveThroughLeftPortal();
  } else if (pacMan.isHeadingRightPortal()) {
    pacMan.moveThroughRightPortal();
  } else {
    if (
      !pacMan.isHeading(gameComponents[com.wall]) &
      !pacMan.isHeading(gameComponents[com.ghostliar])
    ) {
      for (const direction in directions) {
        if (
          pacMan.isTryingMove(directions[direction]) &
          !pacMan.isOnBorder(directions[direction])
        ) {
          pacMan.move(directions[direction]);
        }
      }
    }
  }
}

function control(e) {
  switch (event.key) {
    case 'Down': // IE/Edge specific value
    case 'ArrowDown':
      console.log('down');
      pacMan.moveDirection = directions.down;
      console.log(pacMan.moveDirection);
      break;
    case 'Up': // IE/Edge specific value
    case 'ArrowUp':
      pacMan.moveDirection = directions.up;
      break;
    case 'Left': // IE/Edge specific value
    case 'ArrowLeft':
      pacMan.moveDirection = directions.left;
      break;
    case 'Right': // IE/Edge specific value
    case 'ArrowRight':
      pacMan.moveDirection = directions.right;
      break;
    default:
      return;
  }
}

document.addEventListener('keydown', control);

//move the ghosts
ghosts.forEach(ghost => moveGhost(ghost));

function moveGhost(ghost) {
  console.log('moved ghost');
  let direction = ghost.getRandomDirection();
  console.log(direction);

  ghost.timerId = setInterval(function() {
    //all our code
    //if the next square does NOT contain a wall and does not contain a ghost
    if (
      !squares[ghost.currentPosition + direction].classList.contains('wall') &&
      !squares[ghost.currentPosition + direction].classList.contains('ghost')
    ) {
      //remove any ghost
      ghost.removeDisplay(ghost.currentPosition);
      squares[ghost.currentPosition].classList.remove('ghost');
      // //add direction to current Index
      ghost.currentPosition += direction;
      console.log(ghost.currentPosition);
      // //add ghost class
      ghost.display(ghost.currentPosition);
      squares[ghost.currentPosition].classList.add('ghost');
    } else direction = ghost.getRandomDirection();
  }, ghost.speed);
}
