'use strict';

const bCD = '../src/modules/bkgrnd/images/broken-clouds-d.svg';
const bCN = '../src/modules/bkgrnd/images/broken-clouds-n.svg';
const clearD = '../src/modules/bkgrnd/images/clear-d.svg';
const clearN = '../src/modules/bkgrnd/images/clear-n.svg';
const cloudyD = '../src/modules/bkgrnd/images/cloudy-d.svg';
const cloudyN = '../src/modules/bkgrnd/images/cloudy-n.svg';
const sand = '../src/modules/bkgrnd/images/sand.png';
const rainyD = '../src/modules/bkgrnd/images/rainy-d.svg';
const rainyN = '../src/modules/bkgrnd/images/rainy-n.svg';
const snowyD = '../src/modules/bkgrnd/images/snowy-d.svg';
const snowyN = '../src/modules/bkgrnd/images/snowy-n.svg';

const searchBox = document.getElementById('search-input');
const search = document.getElementById('search');
let area = 90210;
let units = 'imperial';

const unitInput = document.getElementById('unit-input');


// setTheme();
showCurrent();


unitInput.addEventListener('click', changeUnit);

searchBox.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    area = searchBox.value;
    searchBox.value = '';

    showCurrent();
  }
});

search.addEventListener('click', () => {
  area = searchBox.value;
  searchBox.value = '';
});


function changeUnit() {
  const imperial = document.getElementById('imperial');
  const metric = document.getElementById('metric');

  imperial.classList.toggle('set');
  metric.classList.toggle('set');
  units = imperial.classList.contains('set') ? 'imperial' : 'metric';
}




function showCurrent() {
  let isZip = /\d/g.test(area);
  let query = isZip ? 'zip' : 'q';

  const filterData = ({
    coord,
    dt,
    main,
    name,
    sys,
    timezone,
    weather,
    wind,
  }) => ({ coord, dt, main, name, sys, timezone, weather, wind });

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?${query}=${area}&APPID=0aea211463138f620add488578423899&units=${units}`,
    { mode: 'cors' }
  )
    .then((response) => {
      // console.log(response);

      if (!response.ok) {
        // throw new Error('WRONG');
        // catchError(response);

        return response.ok;
      }

      return response.json();
    })
    .then((response) => {
      if (!response) {
        console.log('nothing');
        return;
      }

      let reqInfo = filterData(response);

      setTheme(reqInfo);
      getGeoCoord(reqInfo);
      displayDataTime(reqInfo);
      popWeatherInfo(reqInfo);
      getLocalTimeZone(reqInfo);


    })
    .catch((response) => {
      console.log('No');
      console.log(response);
    });
}

// Use TimeZoneDB RESTful API to get timezone abbreviation
// Open Weather One Call API requires CC info
function getLocalTimeZone(obj) {
  let latitude = obj.coord.lat;
  let longitude = obj.coord.lon; 

  fetch(
    `https://api.timezonedb.com/v2.1/get-time-zone?key=P0O68OWY0HTK&format=json&by=position&lat=${latitude}&lng=${longitude}`,
    { mode: 'cors' }
  )
    .then((response) => {
      if (!response.ok) {
        return response.ok;
      }

      return response.json();
    })
    .then((response) => {
      if (!response) {
        console.log('Some error');
        return;
      }

      const timeZoneAbbrev = document.getElementById('data-zone');
      timeZoneAbbrev.textContent = ` ${response.abbreviation}`

    })
    .catch(() => {
      console.log('caught something');
    });
}




function getGeoCoord(obj) {
  let lat = obj.coord.lat;
  let lon = obj.coord.lon;

  fetch(
    `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=0aea211463138f620add488578423899`,
    { mode: 'cors' }
  )
    .then((response) => {
      if (!response.ok) {
        return response.ok;
      }

      return response.json();
    })
    .then((response) => {
      if (!response) {
        console.log('nothing');
        return;
      }

      let locationInfo = response[0];
      displayLocation(locationInfo);
    })
    .catch(() => {
      console.log('No');
    });
}
function displayLocation(obj) {
  let city = document.querySelectorAll('.city');
  let stateCountry = document.getElementById('state-country');

  city.forEach((heading) => {
    heading.textContent = obj.name;
  });

  stateCountry.textContent = obj.state
    ? `${obj.state}, ${obj.country}`
    : obj.country;
}

function displayDataTime(obj) {
  // let currentDate = obj.dt;
  const time = document.getElementById('data-time');

  // time.textContent = unixToHRDate(currentDate);
  time.textContent = `${epochToHRTime(obj.dt, obj.timezone)}`;

}

// Use this function for now
// Use data-fns later
function unixToHRDate(ut) {
  let myDate = new Date(ut * 1000);

  // return myDate.toLocaleString([], {timezone: 'UTC'});

  return myDate.toLocaleString([], {
    year: '2-digit',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',

  });
}

function epochToHRTime(time, zone) {
  let myDate = new Date(time * 1000);
  let localTime = myDate.getTime(); // milliseconds since 1/1/70, 00:00:00.000 GMT
  let localOffset = myDate.getTimezoneOffset() * 60000;
  let utc = localTime + localOffset;
  let city = utc + 1000 * zone;
  let destinTime = new Date(city);

  // return hRTime.toLocaleString('en-US', 'hour12: true');
  // return time.toLocaleString('en-GB', {hour12: 'false'});
  return destinTime.toLocaleString([], { hour: 'numeric', minute: 'numeric' });
}

function popWeatherInfo(obj) {
  console.log(obj);

  const regexFL = /(\b[a-z](?!\s))/g;
  const timezone = obj.timezone;
  const sunriseEpoch = obj.sys.sunrise;
  const sunsetEpoch = obj.sys.sunset;

  const temp = document.querySelector('#temp');
  const description = document.getElementById('descr');
  const descrImg = document.getElementById('descr-img');
  const feels = document.getElementById('feels');
  const sunrise = document.getElementById('sunrise');
  const sunset = document.getElementById('sunset');
  const maxMin = document.getElementById('max-min');
  const windDir = document.getElementById('wind-dir');
  const wind = document.getElementById('wind');
  const humidity = document.getElementById('humidity');
  const pressure = document.getElementById('pressure');


  temp.textContent = Math.round(obj.main.temp) + '°';
  description.textContent = obj.weather[0].description.replace(regexFL, (fl) =>
    fl.toUpperCase()
  );
  descrImg.src = selectImg(obj);
  feels.textContent = Math.round(obj.main.feels_like) + '°';
  sunrise.textContent = epochToHRTime(sunriseEpoch, timezone);
  sunset.textContent = epochToHRTime(sunsetEpoch, timezone);
  maxMin.textContent = `${Math.round(obj.main.temp_max)}° / ${Math.round(obj.main.temp_min)}°`;
  windDir.style.transform = `rotate(${obj.wind.deg}deg)`;
  wind.textContent = (units === 'imperial') ? Math.round(obj.wind.speed) + ' mph' : Math.round((obj.wind.speed * 3600) / 1000) + ' km/h';
  humidity.textContent = obj.main.humidity + '%';
  pressure.textContent = obj.main.pressure + ' hPa';

}

function selectImg(obj) {
  let imgCode = obj.weather[0].icon;
  let img;

  switch (imgCode) {
    case '01d':
      img = '../src/modules/detailed/images/sun.svg';
      break;
    case '01n':
      img = '../src/modules/detailed/images/moon.svg';
      break;
    case '02d':
      img = '../src/modules/detailed/images/cloudy-day.svg';
      break;
    case '02n':
      img = '../src/modules/detailed/images/cloudy-night.svg';
      break;
    case '03d':
    case '03n':
    case '04d':
    case '04n':
      img = '../src/modules/detailed/images/cloudy.svg';
      break;
    case '09d':
    case '09n':
    case '10d':
    case '10n':
      img = '../src/modules/detailed/images/rainy.svg';
      break;
    case '11d':
    case '11n':
      img = '../src/modules/detailed/images/lightning.svg';
      break;
    case '13d':
    case '13n':
      img = '../src/modules/detailed/images/snow.svg';
      break;
    case '50d':
    case '50n':
      img = '../src/modules/detailed/images/mist.svg';
      break;
    default:
      console.log('No Such Image');
  }

  return img;
}

function setTheme(obj) {
  let imgCode = obj ? obj.weather[0].icon : {};
  let wallPaper;
  let wallColor;

  switch (imgCode) {
    case '01d':
      wallPaper = clearD;
      wallColor = 'var(--sunny-bkgrnd)';
      break;
    case '02d':
    case '03d':
      wallPaper = cloudyD;
      wallColor = 'var(--sunny-bkgrnd)';
      break;
    case '04d':
      wallPaper = bCD;
      wallColor = 'var(--bc-d-bkgrnd)';
      break;
    case '01n':
      wallPaper = clearN;
      wallColor = 'var(--night-bkgrnd)';
      break;
    case '02n':
    case '03n':
      wallPaper = cloudyN;
      wallColor = 'var(--night-bkgrnd)';
      break;
    case '04n':
      wallPaper = bCN;
      wallColor = 'var(--night-bkgrnd)';
      break;
    case '09d':
    case '10d':
    case '11d':
      wallPaper = rainyD;
      wallColor = 'var(--rainy-d-bkgrnd)';
      break;
    case '09n':
    case '10n':
    case '11n':
      wallPaper = rainyN;
      wallColor = 'var(--rainy-n-bkgrnd)';
      break;
    case '13d':
      wallPaper = snowyD;
      wallColor = 'var(--snowy-d-bkgrnd)';
      break;
    case '13n':
      wallPaper = snowyN;
      wallColor = 'var(--snowy-n-bkgrnd)';
      break;
    case '50d':
    case '50n':
      wallPaper = sand;
      wallColor = 'var(--sand-bkgrnd)';
      break;
    default:
      wallPaper = clearD;
      wallColor = 'var(--sunny-bkgrnd)';
  }

  document.body.style.backgroundImage = `url(${wallPaper})`;
  document.querySelector('main').style.backgroundColor = wallColor;
}







// regex to capitalize first letter of each word
var re = /(\b[a-z](?!\s))/g;
var s =
  "fort collins, croton-on-hudson, harper's ferry, coeur d'alene, o'fallon";
s = s.replace(re, function (x) {
  return x.toUpperCase();
});
