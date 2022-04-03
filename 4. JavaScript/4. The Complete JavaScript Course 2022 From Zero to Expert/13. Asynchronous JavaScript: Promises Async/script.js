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

// 16/249 How the Web Works: Requests and Responses

// 16/250 Welcome to Callback Hell
const renderCountry = (data, className = '') => {
  const html = document.createElement('article');
  html.className = `country ${className}`;

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
};

const getCountryByNameAndNeighbor = (name) => {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${name}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    renderCountry(data);

    const [neighbor] = data.borders;

    if (!neighbor) return;

    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbor}`);
    request2.send();

    request2.addEventListener('load', function () {
      const [data2] = JSON.parse(this.responseText);
      renderCountry(data2, 'neighbor');

      const [neighbor2] = data2.borders;

      if (!neighbor2) return;

      const request3 = new XMLHttpRequest();
      request3.open('GET', `https://restcountries.com/v3.1/alpha/${neighbor2}`);
      request3.send();

      request3.addEventListener('load', function () {
        const [data3] = JSON.parse(this.responseText);
        renderCountry(data3, 'neighbor');
      });
    });
  });
};

// getCountryByNameAndNeighbor('portugal');
// getCountryByNameAndNeighbor('poland');

// 16/251 Promises and the Fetch API

// 16/252 Consuming Promises

// 16/253 Chaining Promises
const renderError = async (msg) => {
  countriesContainer.insertAdjacentText('beforeend', msg);
};

const getJSON = (url, errorMessage = 'Something went wrong') => {
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(`${errorMessage} (${response.status})`);
    }
    return response.json();
  });
};

const getCountryData = function (country) {
  getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
    .then(([data]) => {
      renderCountry(data);

      const [neighbor] = data.borders;
      console.log(!neighbor);
      if (!neighbor) throw new Error("Country doesn't have neighbor");

      getCountryByNameAndNeighbor2(neighbor);
    })
    .catch((err) => renderError(err))
    .finally(() => (countriesContainer.style.opacity = 1));
};

const getCountryByNameAndNeighbor2 = (neighbor) => {
  return fetch(`https://restcountries.com/v3.1/alpha/${neighbor}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Country not found (${response.status})`);
      }

      return response.json();
    })
    .then(([data]) => renderCountry(data, 'neighbor'))
    .catch((err) => renderError(err))
    .finally(() => (countriesContainer.style.opacity = 1));
};

// getCountryData('poland');

// 16/254 Handling Rejected Promises

btn.addEventListener('click', () => {
  getCountryData('australia');
  // getCountryData('adsad');
});

// 16/255 Throwing Errors Manually
