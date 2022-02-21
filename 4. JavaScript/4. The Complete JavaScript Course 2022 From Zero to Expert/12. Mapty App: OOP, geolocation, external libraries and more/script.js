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

    const isInputValid = () => {
      return (
        inputDistance.value > 0 &&
        inputDuration.value > 0 &&
        (inputCadence.value > 0 || inputElevation.value > 0)
      );
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
      const { lat: latitude, lng: longitude } = mapCords;
      const cords = [latitude, longitude];

      const capitalize = (s) => {
        return s[0].toUpperCase() + s.slice(1);
      };

      const exerciseClass = inputType.value;
      const exerciseType = capitalize(exerciseClass);
      const workoutEmoticon = exerciseClass == 'running' ? '🏃‍♂️' : '🚴‍♀️';
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
      addMarkWithPopup();
      clearInputs();
      hideForm();

      return;
    } else alert('Inputs have to be positive numbers!');
  }
}

const app = new App();
