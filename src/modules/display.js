import bCD from '../src/assets/images/wallpapers/broken-clouds-d.svg';
import bCN from '../src/assets/images/wallpapers/broken-clouds-n.svg';
import clearD from '../src/assets/images/wallpapers/clear-d.svg';
import clearN from '../src/assets/images/wallpapers/clear-n.svg';
import cloudyD from '../src/assets/images/wallpapers/cloudy-d.svg';
import cloudyN from '../src/assets/images/wallpapers/cloudy-n.svg';
import sand from '../src/assets/images/wallpapers/sand.png';
import rainyD from '../src/assets/images/wallpapers/rainy-d.svg';
import rainyN from '../src/assets/images/wallpapers/rainy-n.svg';
import snowyD from '../src/assets/images/wallpapers/snowy-d.svg';
import snowyN from '../src/assets/images/wallpapers/snowy-n.svg';

// Set wallpaper, background color that matches current weather
function setTheme(obj) {
  if (obj) {
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
    }

    document.body.style.backgroundImage = `url(${wallPaper})`;
    document.querySelector('main').style.backgroundColor = wallColor;
  }
}

// Pop weather info or display err msg
function displayWeather(obj) {
  const city = document.querySelectorAll('.city');
  const stateCountry = document.getElementById('state-country');
  const time = document.getElementById('data-time');
  const timeZone = document.getElementById('data-zone');
  const searchBox = document.getElementById('search-input');
  const errorMsg = document.getElementById('search-params');
  const temp = document.querySelector('#temp');
  const imperial = document.getElementById('imperial');
  const metric = document.getElementById('metric');
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

  const showErr = () => {
    errorMsg.style.display = 'block';

    const removeErr = (e) => {
      if (e.key === 'Escape' || e.type === 'click') {
        errorMsg.style.display = 'none';
        document.body.removeEventListener('keydown', removeErr);
        document.body.removeEventListener('click', removeErr);
      }
    };

    document.body.addEventListener('keydown', removeErr);
    document.body.addEventListener('click', removeErr);
  };

  if (!obj) {
    showErr();
  } else {
    const regexFL = /(\b[a-z](?!\s))/g; // First letter of each word
    const timezone = obj.timezone;
    const sunriseEpoch = obj.sys.sunrise;
    const sunsetEpoch = obj.sys.sunset;
    const current = obj.weather[0].description;
    const maxTemp = Math.round(obj.main.temp_max);
    const minTemp = Math.round(obj.main.temp_min);

    // Convert unix time to human readable time
    const getHRTime = (time, zone) => {
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
    };

    // Find icon for current weather, initialize alt and title text
    let descrImgCode = obj.weather[0].icon;
    let img;
    let altText;
    let titleText;
    switch (descrImgCode) {
      case '01d':
        img = '../src/assets/images/icons/sun.svg';
        altText = 'Sun';
        titleText = 'Clear sky';
        break;
      case '01n':
        img = '../src/assets/images/icons/moon.svg';
        altText = 'Moon';
        titleText = 'Clear sky';
        break;
      case '02d':
        img = '../src/assets/images/icons/cloudy-day.svg';
        altText = 'Sun with clouds';
        titleText = 'Cloudy day';
        break;
      case '02n':
        img = '../src/assets/images/icons/cloudy-night.svg';
        altText = 'Moon with clouds';
        titleText = 'Clear night';
        break;
      case '03d':
      case '03n':
      case '04d':
      case '04n':
        img = '../src/assets/images/icons/cloudy.svg';
        altText = 'Clouds';
        titleText = 'Cloudy skies';
        break;
      case '09d':
      case '09n':
      case '10d':
      case '10n':
        img = '../src/assets/images/icons/rainy.svg';
        altText = 'Cloud and rain';
        titleText = 'Rain';
        break;
      case '11d':
      case '11n':
        img = '../src/assets/images/icons/lightning.svg';
        altText = 'Cloud and lightning';
        titleText = 'Thunderstorm';
        break;
      case '13d':
      case '13n':
        img = '../src/assets/images/icons/snow.svg';
        altText = 'Cloud and snow';
        titleText = 'Snow';
        break;
      case '50d':
      case '50n':
        img = '../src/assets/images/icons/mist.svg';
        altText = 'Mist';
        titleText = 'Haze';
    }

    // Highlight display units
    switch (obj.extran.units) {
      case 'imperial':
        imperial.classList.add('set');
        metric.classList.remove('set');
        break;
      case 'metric':
        imperial.classList.remove('set');
        metric.classList.add('set');
    }

    city.forEach((header) => (header.textContent = obj.name));
    time.textContent = getHRTime(obj.dt, obj.timezone);
    timeZone.textContent = ` ${obj.extran.timeZone}`;
    searchBox.value = '';
    errorMsg.style.display = 'none';
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
    windDir.title = `Wind ${obj.wind.deg} degrees`;
    humidity.textContent = obj.main.humidity + '%';
    pressure.textContent = obj.main.pressure + ' hPa';

    stateCountry.textContent = obj.extran.state
      ? `${obj.extran.state}, ${obj.sys.country}`
      : obj.sys.country;

    wind.textContent =
      obj.extran.units === 'imperial'
        ? Math.round(obj.wind.speed) + ' mph'
        : Math.round((obj.wind.speed * 3600) / 1000) + ' km/h';
  }
}

export { setTheme, displayWeather };

// const createWeatherApp = () => {
//   const main = document.createElement('main');

//   const general = document.createElement('section');

//   // Location, time
//   const genHeader = document.createElement('header');
//   const timeLocatnContnr = document.createElement('div');
//   const topHeading = document.createElement('h1');
//   const locatnValue = document.createElement('span');
//   const timeValue = document.createElement('span');
//   const zoneValue = document.createElement('span');

//   const

//   //
//   const genBody = document.createElement('div');
//   const tempUnitsContnr = document.createElement('div');
//   const tempWrapper = document.createElement('span');
//   const tempValue = document.createElement('span');
//   const unitsWrapper = document.createElement('div');
//   const imperial = document.createElement('span');
//   const unitLabel = document.createElement('label');
//   const unitInput = document.createElement('input');
//   const unitSlider = document.createElement('span');
//   const metric = document.createElement('span');

//   const detailed = document.createElement('section');
//   const detHeader = document.createElement('header');
//   const detHeading = document.createElement('h2');

//   const detBodyWrapper = document.createElement('div');
//   const detBodyTop = document.createElement('div');
//   const feelsWrapper = document.createElement('div');
//   const feelsValue = document.createElement('span');

// };
