/* eslint-env es12 */

'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class Workout {
  date = new Date();
  id = (Date.now() + '').slice(-10);

  constructor(coords, distance, duration) {
    this.cords = coords;
    this.distance = distance;
    this.duration = duration;
  }
}
class Running extends Workout {
  type = 'running';
  paceUnit = 'm/km';
  additionalUnit = 'spm';
  workoutEmoticon = '🏃‍♂️';
  additionalIcon = '🦶🏼';

  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
  }

  calcPace() {
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  type = 'cycling';
  paceUnit = 'km/k';
  additionalUnit = 'm';
  workoutEmoticon = '🚴‍♀️';
  additionalIcon = '⛰';

  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.calcSpeed();
  }

  calcSpeed() {
    this.speed = this.distance / this.duration;
    return this.speed;
  }
}

class App {
  #map;
  #mapEvent;
  #workouts = [];

  constructor() {
    this.#getPosition();
    form.addEventListener('submit', this.#newWorkout.bind(this));
    inputType.addEventListener('change', this.#toggleElevationField.bind(this));
  }

  #getPosition() {
    const getPositionError = () => {
      alert('Could not get yor position');
    };

    navigator?.geolocation.getCurrentPosition(
      this.#loadMap.bind(this),
      getPositionError
    );
  }

  #loadMap(position) {
    const { latitude, longitude } = position.coords;
    const cords = [latitude, longitude];

    this.#map = L.map('map').setView(cords, 13);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    L.marker(cords)
      .addTo(this.#map)
      .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
      .openPopup();

    this.#map.on('click', this.#showForm.bind(this));
  }

  #showForm(mapE) {
    this.#mapEvent = mapE;

    form.classList.remove('hidden');
    inputDistance.focus();
  }

  #toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  #newWorkout(e) {
    e.preventDefault();

    const mapCords = this.#mapEvent.latlng;
    const { lat: latitude, lng: longitude } = mapCords;
    const cords = [latitude, longitude];

    const exerciseClass = inputType.value;
    const distance = +inputDuration.value;
    const duration = +inputDuration.value;
    let cadence, elevation;

    const isWorkoutRunning = () => {
      return exerciseClass === 'running';
    };

    if (!isWorkoutRunning()) {
      elevation = +inputElevation.value;
    }
    if (isWorkoutRunning()) {
      cadence = +inputCadence.value;
    }

    const isInputValid = () => {
      const isPositive = (...values) => {
        return values.every((val) => val > 0);
      };

      return isPositive(distance, duration) && isWorkoutRunning()
        ? isPositive(cadence)
        : isFinite(elevation);
    };

    const clearInputs = () => {
      inputDistance.value = '';
      inputDuration.value = '';
      inputCadence.value = '';
      inputElevation.value = '';
    };

    const hideForm = () => {
      form.classList.add('hidden');
    };

    const addMarkWithPopup = () => {
      const capitalize = (s) => {
        return s[0].toUpperCase() + s.slice(1);
      };

      const exerciseType = capitalize(exerciseClass);
      const today = new Date();
      const dateString = today.toLocaleString('en-US', {
        day: 'numeric',
        month: 'long',
      });

      const marker = L.marker(cords)
        .addTo(this.#map)
        .bindPopup(
          L.popup({
            maxWidth: 250,
            minWidth: 150,
            autoClose: false,
            closeOnClick: false,
            className: `${exerciseClass}-popup`,
          })
        )
        .setPopupContent(
          `${workout.workoutEmoticon} ${exerciseType} on ${dateString}`
        )
        .openPopup();
    };
    let workout;

    const renderWorkout = (workouts) => {
      const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
      };
      for (const workout of workouts) {
        let list = document.createElement('li');
        list.innerHTML = `
<li class="workout workout--${workout.type}" data-id=${workout.id}>
<h2 class="workout__title">${capitalizeFirstLetter(
          workout.type
        )} on ${workout.date.toLocaleString('en-US', {
          month: 'long',
          day: 'numeric',
        })}</h2>
<div class="workout__details">
  <span class="workout__icon">${workout.workoutEmoticon}</span>
  <span class="workout__value">${workout.distance}</span>
  <span class="workout__unit">km</span>
</div>
<div class="workout__details">
  <span class="workout__icon">⏱</span>
  <span class="workout__value">${workout.duration}</span>
  <span class="workout__unit">min</span>
</div>
<div class="workout__details">
  <span class="workout__icon">⚡️</span>
  <span class="workout__value">${
    isWorkoutRunning() ? workout.pace : workout.speed
  }</span>
  <span class="workout__unit">${workout.paceUnit}</span>
</div>
<div class="workout__details">
  <span class="workout__icon">${workout.additionalIcon}</span></span>
  <span class="workout__value">${
    isWorkoutRunning() ? workout.cadence : workout.elevationGain
  }</span>
  <span class="workout__unit">${workout.additionalUnit}</span>
</div>
</li>`;

        containerWorkouts.prepend(list);
      }
    };

    //     Running
    // cadence: 5
    // cords: (2) [50.098560072241156, 14.33046340942383]
    // date: Wed Mar 16 2022 22:21:29 GMT+0100 (Central European Standard Time) {}
    // distance: 10
    // duration: 10
    // id: "7465689946"
    // pace: 1
    // [[Prototype]]: Workout

    if (isInputValid()) {
      if (isWorkoutRunning()) {
        workout = new Running(cords, distance, duration, cadence);
      }

      if (!isWorkoutRunning()) {
        workout = new Cycling(cords, distance, duration, elevation);
      }
      this.#workouts.push(workout);
      addMarkWithPopup();
      renderWorkout([this.#workouts[this.#workouts.length - 1]]);
      clearInputs();
      hideForm();
      console.log(workout);

      return;
    } else alert('Inputs have to be positive numbers!');
  }
}

const app = new App();
