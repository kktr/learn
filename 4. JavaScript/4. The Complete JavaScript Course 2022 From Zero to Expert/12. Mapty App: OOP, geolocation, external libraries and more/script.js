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
      const workoutEmoticon = isWorkoutRunning() ? '🏃‍♂️' : '🚴‍♀️';
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
        .setPopupContent(`${workoutEmoticon} ${exerciseType} on ${dateString}`)
        .openPopup();
    };

    if (isInputValid()) {
      if (isWorkoutRunning()) {
        const workout = new Running(cords, distance, duration, cadence);
        console.log(workout);
      }

      if (!isWorkoutRunning()) {
        const workout = new Cycling(cords, distance, duration, elevation);
        console.log(workout);
      }
    }
    if (isInputValid()) {
      addMarkWithPopup();
      clearInputs();
      hideForm();

      return;
    } else alert('Inputs have to be positive numbers!');
  }
}

const app = new App();
