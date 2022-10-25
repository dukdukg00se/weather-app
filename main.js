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

initPage();

async function initPage() {

  let data = await getWeatherData();
  setTheme(data);
  displayWeather(data);


  listenForUserInput();

}



// Nested in initPage()
function listenForUserInput() {
  const searchBox = document.getElementById('search-input');
  const searchIcon = document.getElementById('search');
  const unitInput = document.getElementById('unit-input');

  async function displayAreaWeather(e) {
    let data;

    if ((e.type === 'keypress' && e.key === 'Enter') || e.type === 'click') {
      if (this.value === '') {
        return;
      }

      data = await getWeatherData(this.value);
      setTheme(data);
      displayWeather(data);

    }



  }

  searchBox.addEventListener('keypress', displayAreaWeather);
  searchIcon.addEventListener('click', displayAreaWeather.bind(searchBox)); 
  unitInput.addEventListener('click', () => {
    console.log('ick')
  })


  



}



// Nested in initPage(), displayAreWeather() -> in initPage()
function setTheme(obj) {
  let imgCode = obj ? obj.weather[0].icon : {};
  let wallPaper;
  let wallColor;

  switch (imgCode) {
    case '01d':
      wallPaper = clearD;
      wallColor = 'var(--sunny)';
      break;
    case '02d':
    case '03d':
      wallPaper = cloudyD;
      wallColor = 'var(--sunny)';
      break;
    case '04d':
      wallPaper = bCD;
      wallColor = 'var(--broken-clouds)';
      break;
    case '01n':
      wallPaper = clearN;
      wallColor = 'var(--night)';
      break;
    case '02n':
    case '03n':
      wallPaper = cloudyN;
      wallColor = 'var(--night)';
      break;
    case '04n':
      wallPaper = bCN;
      wallColor = 'var(--night)';
      break;
    case '09d':
    case '10d':
    case '11d':
      wallPaper = rainyD;
      wallColor = 'var(--rainy-day)';
      break;
    case '09n':
    case '10n':
    case '11n':
      wallPaper = rainyN;
      wallColor = 'var(--rainy-night)';
      break;
    case '13d':
      wallPaper = snowyD;
      wallColor = 'var(--snowy-day)';
      break;
    case '13n':
      wallPaper = snowyN;
      wallColor = 'var(--snowy-night)';
      break;
    case '50d':
    case '50n':
      wallPaper = sand;
      wallColor = 'var(--sand-mist)';
      break;
    default:
      wallPaper = clearD;
      wallColor = 'var(--sunny)';
  }

  document.body.style.backgroundImage = `url(${wallPaper})`;
  document.querySelector('main').style.backgroundColor = wallColor;
}


// Nested in initPage(), listenForUserInput()
async function getWeatherData(area = 90210, dispUnits = 'imperial') {
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

  try {
    // Instead of passing URL string, mode option to fetch request
    // Use Request constructor to create new Request obj
    // Pass Request obj to fetch w/ default options (e.g. mode: 'cors')
    // Get weather info - doesn't include state, time zone abbr
    let weatherRequest = new Request(`https://api.openweathermap.org/data/2.5/weather?${query}=${area}&APPID=0aea211463138f620add488578423899&units=${dispUnits}`);

    const weatherResponse = await fetch(weatherRequest);
    const weatherInfo = filterData(await weatherResponse.json());

    // Get state name using second api call, limit responses to 1
    // Need to call openweather reverse geocoding api for state name
    // Current weather api only contains city name, country
    let nameRequest = new Request(`https://api.openweathermap.org/geo/1.0/reverse?lat=${weatherInfo.coord.lat}&lon=${weatherInfo.coord.lon}&limit=1&appid=0aea211463138f620add488578423899`);

    // Use TimeZoneDB RESTful API to get timezone abbreviation
    // Open Weather OneCall API requires CC info
    let tmZoneRequest = new Request(`https://api.timezonedb.com/v2.1/get-time-zone?key=P0O68OWY0HTK&format=json&by=position&lat=${weatherInfo.coord.lat}&lng=${weatherInfo.coord.lon}`);

    weatherInfo.units = dispUnits;
    weatherInfo.extran = await Promise.all([fetch(nameRequest), fetch(tmZoneRequest)]).then((responses) => {
      return Promise.all(responses.map((response => response.json())))
    }).then(responses => {

      // return { 
      //   state: responses[0][0].state, 
      //   timeZone: responses[1].abbreviation,
      // };

      let state = responses[0][0].state;
      let timeZone = responses[1].abbreviation;

      // Same as above
      return { state, timeZone };    
    })

    return weatherInfo;

  } catch {
    console.log('oopas');

  }
}


// Nested in initPage(), displayAreWeather() -> in initPage()
function displayWeather(obj) {
  const city = document.querySelectorAll('.city');
  const stateCountry = document.getElementById('state-country');
  const time = document.getElementById('data-time');
  const temp = document.querySelector('#temp');
  const descrImg = document.getElementById('descr-img');
  const descrText = document.getElementById('descr');
  const feels = document.getElementById('feels');
  const sunrise = document.getElementById('sunrise');
  const sunset = document.getElementById('sunset');
  const maxMin = document.getElementById('max-min');
  const windDir = document.getElementById('wind-dir');
  const wind = document.getElementById('wind');
  const humidity = document.getElementById('humidity');
  const pressure = document.getElementById('pressure');

  const regexFL = /(\b[a-z](?!\s))/g; // First letter of each word
  const timezone = obj.timezone;
  const sunriseEpoch = obj.sys.sunrise;
  const sunsetEpoch = obj.sys.sunset;
  const current = obj.weather[0].description;
  const maxTemp = Math.round(obj.main.temp_max);
  const minTemp = Math.round(obj.main.temp_min);

  // Find icon for current weather and set alt text, title
  let descrImgCode = obj.weather[0].icon;
  let img;
  let altText;
  let titleText;
  switch (descrImgCode) {
    case '01d':
      img = '../src/modules/detailed/images/sun.svg';
      altText = 'Sun';
      titleText = 'Clear sky';
      break;
    case '01n':
      img = '../src/modules/detailed/images/moon.svg';
      altText = 'Moon';
      titleText = 'Clear sky';
      break;
    case '02d':
      img = '../src/modules/detailed/images/cloudy-day.svg';
      altText = 'Sun with clouds';
      titleText = 'Cloudy day';
      break;
    case '02n':
      img = '../src/modules/detailed/images/cloudy-night.svg';
      altText = 'Moon with clouds';
      titleText = 'Clear night';
      break;
    case '03d':
    case '03n':
    case '04d':
    case '04n':
      img = '../src/modules/detailed/images/cloudy.svg';
      altText = 'Clouds';
      titleText = 'Cloudy skies';
      break;
    case '09d':
    case '09n':
    case '10d':
    case '10n':
      img = '../src/modules/detailed/images/rainy.svg';
      altText = 'Cloud and rain';
      titleText = 'Rain';
      break;
    case '11d':
    case '11n':
      img = '../src/modules/detailed/images/lightning.svg';
      altText = 'Cloud and lightning';
      titleText = 'Thunderstorm';
      break;
    case '13d':
    case '13n':
      img = '../src/modules/detailed/images/snow.svg';
      altText = 'Cloud and snow';
      titleText = 'Snow';
      break;
    case '50d':
    case '50n':
      img = '../src/modules/detailed/images/mist.svg';
      altText = 'Mist';
      titleText = 'Haze';
  }

  // Convert unix time to human readable time
  function getHRTime(time, zone) {
    // Get date of unix timestamp
    // Convert time (s) to ms
    // Need to convert to ms for Date() constructor
    // Output ex: Tue Oct 18 2022 14:34:05 GMT-0700 (Pacific Daylight Time)
    let myDate = new Date(time * 1000);

    // Get time since Unix epoch 1/1/70, 00:00:00.000 GMT (in ms)
    let myTime = myDate.getTime();

    // Get difference between date in UTC time zone and local time zone (in min)
    // Convert min to ms
    let myOffset = myDate.getTimezoneOffset() * 60000;

    // Get unix timestamp
    let myUT = myTime + myOffset;

    // Get target city unix timestamp
    // Convert target timezone seconds to ms and add to myUT
    let targetCityUT = myUT + 1000 * zone;

    // Get human readable time
    let destinTime = new Date(targetCityUT).toLocaleString([], {
      hour: 'numeric',
      minute: 'numeric',
    });

    return destinTime;
  }

  city.forEach((header) => (header.textContent = obj.name));
  time.textContent = getHRTime(obj.dt, obj.timezone);
  temp.textContent = Math.round(obj.main.temp) + '°';
  descrImg.src = img;
  descrImg.alt = altText;
  descrImg.title = titleText;
  descrText.textContent = current.replace(regexFL, (fl) => fl.toUpperCase());
  feels.textContent = Math.round(obj.main.feels_like) + '°';
  sunrise.textContent = getHRTime(sunriseEpoch, timezone);
  sunset.textContent = getHRTime(sunsetEpoch, timezone);
  maxMin.textContent = `${maxTemp}° / ${minTemp}°`;
  windDir.style.transform = `rotate(${obj.wind.deg}deg)`;
  humidity.textContent = obj.main.humidity + '%';
  pressure.textContent = obj.main.pressure + ' hPa';

  stateCountry.textContent = obj.state
    ? `${obj.state}, ${obj.country}`
    : obj.country;

  wind.textContent =
    obj.units === 'imperial'
      ? Math.round(obj.wind.speed) + ' mph'
      : Math.round((obj.wind.speed * 3600) / 1000) + ' km/h';

}




function displayUnits() {
  const imperial = document.getElementById('imperial');
  const metric = document.getElementById('metric');

  units = imperial.classList.contains('set') ? 'imperial' : 'metric';
  imperial.classList.toggle('set');
  metric.classList.toggle('set');

}












