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
  type = '';
  workoutEmoticon = '';
  description = '';

  constructor(coords, distance, duration) {
    this.cords = coords;
    this.distance = distance;
    this.duration = duration;
  }
  capitalize = (s) => {
    return s[0].toUpperCase() + s.slice(1);
  };

  today = new Date();
  dateString = this.today.toLocaleString('en-US', {
    day: 'numeric',
    month: 'long',
  });

  setDescription() {
    this.description = `${this.workoutEmoticon} ${this.exerciseType} on ${this.dateString}`;
  }
}
class Running extends Workout {
  type = 'running';
  paceUnit = 'm/km';
  additionalUnit = 'spm';
  workoutEmoticon = '🏃‍♂️';
  additionalIcon = '🦶🦶';

  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
    this.setDescription();
  }

  calcPace() {
    this.pace = this.duration / this.distance;
    return this.pace;
  }

  exerciseType = this.capitalize(this.type);
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
    this.setDescription();
  }

  calcSpeed() {
    this.speed = this.distance / this.duration;
    return this.speed;
  }

  exerciseType = this.capitalize(this.type);
}

class App {
  #map;
  #mapEvent;
  #workouts = [];

  constructor() {
    this.#getPosition();
    form.addEventListener('submit', this.#newWorkout.bind(this));
    inputType.addEventListener('change', this.#toggleElevationField.bind(this));
    containerWorkouts.addEventListener('click', this.#moveToPopup.bind(this));
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

  #moveToPopup = (e) => {
    const workoutEl = e.target.closest('.workout');
    if (!workoutEl) return;

    const workout = this.#workouts.find(
      (work) => work.id === workoutEl.dataset.id
    );
    this.#map.setView(workout.cords, 13, {
      animated: true,
      pan: { duration: 1 },
    });
  };

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
      form.style.display = 'none';
      form.classList.add('hidden');
      setTimeout(() => (form.style.display = 'grid'), 1000);
    };

    const addMarkWithPopup = () => {
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
          workout.description
          // `${workout.workoutEmoticon} ${exerciseType} on ${dateString}`
        )
        .openPopup();
    };
    let workout;

    const renderWorkout = (workouts) => {
      for (const workout of workouts) {
        let list = document.createElement('li');
        list.innerHTML = `
<li class="workout workout--${workout.type}" data-id=${workout.id}>
<h2 class="workout__title">${
          workout.exerciseType
        } on ${workout.date.toLocaleString('en-US', {
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

      return;
    } else alert('Inputs have to be positive numbers!');
  }
}

const app = new App();
