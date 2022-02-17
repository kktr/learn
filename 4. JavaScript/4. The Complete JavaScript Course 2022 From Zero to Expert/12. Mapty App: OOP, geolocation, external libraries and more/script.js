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

function displayPosition(position) {
  const { latitude } = position.coords;
  const { longitude } = position.coords;
  const cords = [latitude, longitude];

  const map = L.map('map').setView(cords, 13);

  L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  L.marker(cords)
    .addTo(map)
    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    .openPopup();

  const displayClickedPosition = (mapEvent) => {
    const { lat: latitude, lng: longitude } = mapEvent.latlng;
    const cords = [latitude, longitude];
    const marker = L.marker(cords)
      .addTo(map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 150,
          autoClose: false,
          closeOnClick: false,
          className: 'running-popup',
        })
      )
      .setPopupContent('Workout')
      .openPopup();
  };

  map.on('click', displayClickedPosition);
}

function getPositionError() {
  alert('Could not get yor position');
}

navigator?.geolocation.getCurrentPosition(displayPosition, getPositionError);
