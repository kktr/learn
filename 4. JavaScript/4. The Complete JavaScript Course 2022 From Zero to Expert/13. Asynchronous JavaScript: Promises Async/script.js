'use strict';

// const { createElement } = require('parse5/lib/tree-adapters/default');

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

// 16/248 Our First AJAX Call: HMLHttpRequest
const getCountryByName = (name) => {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${name}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    const html = document.createElement('article');
    html.className = 'country';

    const getLanguageEntry = () => {
      return Object.entries(data.languages)[0][0];
    };

    const getCurrenciesEntry = () => {
      return Object.entries(data.currencies)[0][0];
    };

    const language = data.languages[`${getLanguageEntry()}`];
    const currency = data.currencies[`${getCurrenciesEntry()}`].name;

    html.innerHTML = `
    <img class="country__img" src="${data.flags.png}" />
    <div class="country__data">
      <h3 class="country__name">${data.name.common}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${data.population}</p>
      <p class="country__row"><span>🗣️</span>${language}</p>
      <p class="country__row"><span>💰</span>${currency}</p>
    </div>`;

    countriesContainer.insertAdjacentElement('beforeend', html);

    countriesContainer.style.opacity = 1;
  });
};

// getCountryByName('portugal');
// getCountryByName('usa');
