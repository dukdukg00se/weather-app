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
let area;
let units = 'imperial';

setTheme();

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
    })
    .catch(() => {
      console.log('No');
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
  // Use this function for now
  // Use data-fns later
  function epochToHRDate(obj) {
    let epochDate = obj.dt;
    let myDate = new Date(epochDate * 1000);
    return myDate.toLocaleString();
  }

  const time = document.getElementById('data-time');
  time.textContent = epochToHRDate(obj);
}

function popWeatherInfo(obj) {
  console.log(obj);

  const temp = document.querySelector('#sum-body h2');
  const tempHigh = document.getElementById('temp-high');
  const tempLow = document.getElementById('temp-low');
  const description = document.getElementById('descr');
  const descrImg = document.getElementById('descr-img');

  temp.textContent = Math.round(obj.main.temp) + '°';
  tempHigh.textContent = Math.round(obj.main.temp_max);
  tempLow.textContent = Math.round(obj.main.temp_min);
  description.textContent = obj.weather[0].description.replace(
    /(\b[a-z](?!\s))/g,
    (firstLetter) => firstLetter.toUpperCase()
  );
  descrImg.src = selectImg(obj);
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



const selectUnits = document.getElementById('select-units');
const farenUnit = document.getElementById('faren');
const celsUnit = document.getElementById('cels');

selectUnits.addEventListener('click', () => {
  farenUnit.classList.toggle('set');
  celsUnit.classList.toggle('set');

  units = farenUnit.classList.contains('set') ? 'imperial' : 'metric';
  console.log(units);
});


// regex to capitalize first letter of each word
var re = /(\b[a-z](?!\s))/g;
var s =
  "fort collins, croton-on-hudson, harper's ferry, coeur d'alene, o'fallon";
s = s.replace(re, function (x) {
  return x.toUpperCase();
});