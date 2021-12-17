/*jshint esversion: 6*/
/* eslint-env es6 */
const author = document.getElementById('author-name');
const cryptoHeader = document.getElementById('crypto-header');
const cryptoInfo = document.getElementById('crypto-info');
const time = document.getElementById('time');
const weather = document.getElementById('weather');
const weatherHeader = document.getElementById('weather-header');

fetch(
  'https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature'
)
  .then(res => res.json())
  .then(data => {
    document.body.style.backgroundImage = `url(${data.urls.full})`;
    author.textContent = `By: ${data.user.name}`;
  })
  .catch(err => {
    document.body.style.backgroundImage = `url("https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Mzk2NjY3NTg&ixlib=rb-1.2.1&q=85")`;
    author.textContent = `By: ${data.user.name}`;
  });

fetch('https://api.coingecko.com/api/v3/coins/bitcoin')
  .then(res => {
    if (!res.ok) {
      throw Error("Crypto api doesn't works");
    }
    return res.json();
  })
  .then(data => {
    const coinImg = document.createElement('img');
    coinImg.src = `${data.image.small}`;

    const coinName = document.createElement('span');
    coinName.textContent = `  ${data.name}`;

    const coinCurrent = document.createElement('span');
    coinCurrent.textContent = `🎯     ${data.market_data.current_price.usd} $`;

    const coinHigh = document.createElement('span');
    coinHigh.textContent = `👆     ${data.market_data.high_24h.usd} $`;

    const coinLow = document.createElement('span');
    coinLow.textContent = `👇     ${data.market_data.low_24h.usd} $`;

    cryptoHeader.prepend(coinImg, coinName);
    cryptoInfo.append(coinCurrent, coinHigh, coinLow);
  })
  .catch(err => {
    console.log(err);
  });

function showTime() {
  let date = new Date();
  time.textContent = date.toLocaleTimeString('en-us', { timeStyle: 'short' });

  setTimeout(showTime, 1000);
}

var options = {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 0
};

function success(pos) {
  const crd = pos.coords;

  fetch(
    `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&units=metric`
  )
    .then(res => {
      if (!res.ok) {
        throw Error("Weather api doesn't works");
      }
      return res.json();
    })
    .then(data => {
      const icon = document.createElement('img');
      icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

      const temp = document.createElement('span');
      temp.textContent = `${data.main.temp} °C`;

      const pressure = document.createElement('span');
      pressure.textContent = `${data.main.pressure} hPa`;

      const humidity = document.createElement('span');
      humidity.textContent = `${data.main.humidity} %`;

      weatherHeader.prepend(icon, temp);
      weather.append(pressure, humidity);

      setTimeout(displayWeather, 600000);
    })
    .catch(err => {
      console.log(err);
    });
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

function displayWeather() {
  navigator.geolocation.getCurrentPosition(success, error, options);
}

showTime();

displayWeather();
// async function fetchImageData() {
//   const response = await fetch(
//     'https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature'
//   );
//   return (data = await response.json());
// }
//
// async function setBackgroundImage() {
//   data = await fetchImageData();
//   const url = await data.urls.full;
//   document.body.style.backgroundImage = `url(${url})`;
//   return data;
// }
//
// async function setBgWithAuthor() {
//   data = await setBackgroundImage();
//   author.textContent = await data.user.name;
// }
//
// setBgWithAuthor();
//
// https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=52.2394%lon=21.0362&units=metric
