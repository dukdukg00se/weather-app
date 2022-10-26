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

  logParams(data);
  setTheme(data);
  displayWeather(data);
  listenForUserInput(data);
}

function logParams(obj) {

  if (obj) {

  const main = document.querySelector('main');
  const unitInput = document.getElementById('unit-input');

  main.dataset.search = obj.extran.search;
  unitInput.value = obj.extran.units;
  }


  // const main = document.querySelector('main');
  // const unitInput = document.getElementById('unit-input');

  // main.dataset.search = obj.extran.search;
  // unitInput.value = obj.extran.units;
}

// Nested in initPage()
function listenForUserInput() {
  const searchBox = document.getElementById('search-input');
  const searchIcon = document.getElementById('search');
  const unitInput = document.getElementById('unit-input');

  async function getAreaWeather(e) {
    if (e.key === 'Enter' || e.type === 'click') {
      if (this.value === '') {
        return;
      }

      let conditions = await getWeatherData(this.value, unitInput.value);

      // if (!conditions) {
      //   console.log('sdkhfasd')
      // }

      logParams(conditions);
      setTheme(conditions);
      displayWeather(conditions);
    }
  }
  async function updateUnits() {
    const main = document.querySelector('main');
    let userUnits = unitInput.value == 'imperial' ? 'metric' : 'imperial';
    let conditions = await getWeatherData(main.dataset.search, userUnits);

    logParams(conditions);
    setTheme(conditions);
    displayWeather(conditions);
  }

  searchBox.addEventListener('keypress', getAreaWeather);
  searchIcon.addEventListener('click', getAreaWeather.bind(searchBox));
  unitInput.addEventListener('click', updateUnits);
}

// Nested in initPage(), listenForUserInput()
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


  // let imgCode = obj ? obj.weather[0].icon : {};
  // let wallPaper;
  // let wallColor;

  // switch (imgCode) {
  //   case '01d':
  //     wallPaper = clearD;
  //     wallColor = 'var(--sunny)';
  //     break;
  //   case '02d':
  //   case '03d':
  //     wallPaper = cloudyD;
  //     wallColor = 'var(--sunny)';
  //     break;
  //   case '04d':
  //     wallPaper = bCD;
  //     wallColor = 'var(--broken-clouds)';
  //     break;
  //   case '01n':
  //     wallPaper = clearN;
  //     wallColor = 'var(--night)';
  //     break;
  //   case '02n':
  //   case '03n':
  //     wallPaper = cloudyN;
  //     wallColor = 'var(--night)';
  //     break;
  //   case '04n':
  //     wallPaper = bCN;
  //     wallColor = 'var(--night)';
  //     break;
  //   case '09d':
  //   case '10d':
  //   case '11d':
  //     wallPaper = rainyD;
  //     wallColor = 'var(--rainy-day)';
  //     break;
  //   case '09n':
  //   case '10n':
  //   case '11n':
  //     wallPaper = rainyN;
  //     wallColor = 'var(--rainy-night)';
  //     break;
  //   case '13d':
  //     wallPaper = snowyD;
  //     wallColor = 'var(--snowy-day)';
  //     break;
  //   case '13n':
  //     wallPaper = snowyN;
  //     wallColor = 'var(--snowy-night)';
  //     break;
  //   case '50d':
  //   case '50n':
  //     wallPaper = sand;
  //     wallColor = 'var(--sand-mist)';

  // }

  // document.body.style.backgroundImage = `url(${wallPaper})`;
  // document.querySelector('main').style.backgroundColor = wallColor;
}

// Nested in initPage(), listenForUserInput()
async function getWeatherData(area = 90210, dispUnits = 'imperial') {
  let isZip = /\d/g.test(area);
  let query = isZip ? 'zip' : 'q';

  let weatherInfo

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

  // try {
  //   // Instead of passing URL string, mode option to fetch request
  //   // Use Request constructor to create new Request obj
  //   // Pass Request obj to fetch w/ default options (e.g. mode: 'cors')
  //   // Get weather info - doesn't include state, time zone abbr
  //   let weatherRequest = new Request(
  //     `https://api.openweathermap.org/data/2.5/weather?${query}=${area}&APPID=0aea211463138f620add488578423899&units=${dispUnits}`
  //   );

  //   const weatherResponse = await fetch(weatherRequest);
  //   weatherInfo = filterData(await weatherResponse.json());



  // } catch {
  //   console.log('foo')
  // }

  // try {

  //   // Get state name using second api call, limit responses to 1
  //   // Need to call openweather reverse geocoding api for state name
  //   // Current weather api only contains city name, country
  //   let nameRequest = new Request(
  //     `https://api.openweathermap.org/geo/1.0/reverse?lat=${weatherInfo.coord.lat}&lon=${weatherInfo.coord.lon}&limit=1&appid=0aea211463138f620add488578423899`
  //   );

  //   // Use TimeZoneDB RESTful API to get timezone abbreviation
  //   // Open Weather OneCall API requires CC info
  //   let tmZoneRequest = new Request(
  //     `https://api.timezonedb.com/v2.1/get-time-zone?key=P0O68OWY0HTK&format=json&by=position&lat=${weatherInfo.coord.lat}&lng=${weatherInfo.coord.lon}`
  //   );



  //   weatherInfo.extran = await Promise.all([
  //     fetch(nameRequest),
  //     fetch(tmZoneRequest),
  //   ])
  //     .then((responses) => {
  //       return Promise.all(responses.map((response) => response.json()));
  //     })
  //     .then((responses) => {
  //       // return {
  //       //   state: responses[0][0].state,
  //       //   timeZone: responses[1].abbreviation,
  //       // };

  //       let state = responses[0][0].state;
  //       let timeZone = responses[1].abbreviation;

  //       // Same as above
  //       return { state, timeZone };
  //     });
  //   weatherInfo.extran.search = area;
  //   weatherInfo.extran.units = dispUnits;

  //   return weatherInfo;
  // } catch (error){
  //   console.log(error)
  //   console.log('bar')

  //   const errorMsg = document.getElementById('search-params');
  //   errorMsg.style.display = 'block';
  //   return false;
  // }

  try {
    // Instead of passing URL string, mode option to fetch request
    // Use Request constructor to create new Request obj
    // Pass Request obj to fetch w/ default options (e.g. mode: 'cors')
    // Get weather info - doesn't include state, time zone abbr
    let weatherRequest = new Request(
      `https://api.openweathermap.org/data/2.5/weather?${query}=${area}&APPID=0aea211463138f620add488578423899&units=${dispUnits}`
    );

    const weatherResponse = await fetch(weatherRequest);
    const weatherInfo = filterData(await weatherResponse.json());

    // Get state name using second api call, limit responses to 1
    // Need to call openweather reverse geocoding api for state name
    // Current weather api only contains city name, country
    let nameRequest = new Request(
      `https://api.openweathermap.org/geo/1.0/reverse?lat=${weatherInfo.coord.lat}&lon=${weatherInfo.coord.lon}&limit=1&appid=0aea211463138f620add488578423899`
    );

    // Use TimeZoneDB RESTful API to get timezone abbreviation
    // Open Weather OneCall API requires CC info
    let tmZoneRequest = new Request(
      `https://api.timezonedb.com/v2.1/get-time-zone?key=P0O68OWY0HTK&format=json&by=position&lat=${weatherInfo.coord.lat}&lng=${weatherInfo.coord.lon}`
    );

    weatherInfo.extran = await Promise.all([
      fetch(nameRequest),
      fetch(tmZoneRequest),
    ])
      .then((responses) => {
        return Promise.all(responses.map((response) => response.json()));
      })
      .then((responses) => {
        // return {
        //   state: responses[0][0].state,
        //   timeZone: responses[1].abbreviation,
        // };

        let state = responses[0][0].state;
        let timeZone = responses[1].abbreviation;

        // Same as above
        return { state, timeZone };
      });
    weatherInfo.extran.search = area;
    weatherInfo.extran.units = dispUnits;

    return weatherInfo;
  } catch {

    // const errorMsg = document.getElementById('search-params');
    // errorMsg.style.display = 'block';

    return false;
  }
}

// Nested in initPage(), listenForUserInput()
function displayWeather(obj) {

  // const errorMsg = document.getElementById('search-params');

  if (!obj) {
    const errorMsg = document.getElementById('search-params');
    errorMsg.style.display = 'block';
    console.log('sdkhfasd')
  }


  if (obj) {
    const city = document.querySelectorAll('.city');
    const stateCountry = document.getElementById('state-country');
    const time = document.getElementById('data-time');
    const timeZone = document.getElementById('data-zone');
    const searchBox = document.getElementById('search-input');
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
  
    // Find icon for current weather, init alt and title text
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
    windDir.title = `Wind ${obj.wind.deg}deg`;
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



  // const city = document.querySelectorAll('.city');
  // const stateCountry = document.getElementById('state-country');
  // const time = document.getElementById('data-time');
  // const timeZone = document.getElementById('data-zone');
  // const searchBox = document.getElementById('search-input');
  // const temp = document.querySelector('#temp');
  // const imperial = document.getElementById('imperial');
  // const metric = document.getElementById('metric');
  // const descrImg = document.getElementById('descr-img');
  // const descrText = document.getElementById('descr');
  // const feels = document.getElementById('feels');
  // const sunrise = document.getElementById('sunrise');
  // const sunset = document.getElementById('sunset');
  // const maxMin = document.getElementById('max-min');
  // const windDir = document.getElementById('wind-dir');
  // const wind = document.getElementById('wind');
  // const humidity = document.getElementById('humidity');
  // const pressure = document.getElementById('pressure');

  // const regexFL = /(\b[a-z](?!\s))/g; // First letter of each word
  // const timezone = obj.timezone;
  // const sunriseEpoch = obj.sys.sunrise;
  // const sunsetEpoch = obj.sys.sunset;
  // const current = obj.weather[0].description;
  // const maxTemp = Math.round(obj.main.temp_max);
  // const minTemp = Math.round(obj.main.temp_min);

  // // Convert unix time to human readable time
  // const getHRTime = (time, zone) => {
  //   // Get date of unix timestamp
  //   // Convert time (s) to ms
  //   // Need to convert to ms for Date() constructor
  //   // Output ex: Tue Oct 18 2022 14:34:05 GMT-0700 (Pacific Daylight Time)
  //   let myDate = new Date(time * 1000);

  //   // Get time since Unix epoch 1/1/70, 00:00:00.000 GMT (in ms)
  //   let myTime = myDate.getTime();

  //   // Get difference between date in UTC time zone and local time zone (in min)
  //   // Convert min to ms
  //   let myOffset = myDate.getTimezoneOffset() * 60000;

  //   // Get unix timestamp
  //   let myUT = myTime + myOffset;

  //   // Get target city unix timestamp
  //   // Convert target timezone seconds to ms and add to myUT
  //   let targetCityUT = myUT + 1000 * zone;

  //   // Get human readable time
  //   let destinTime = new Date(targetCityUT).toLocaleString([], {
  //     hour: 'numeric',
  //     minute: 'numeric',
  //   });

  //   return destinTime;
  // };

  // // Find icon for current weather, init alt and title text
  // let descrImgCode = obj.weather[0].icon;
  // let img;
  // let altText;
  // let titleText;
  // switch (descrImgCode) {
  //   case '01d':
  //     img = '../src/modules/detailed/images/sun.svg';
  //     altText = 'Sun';
  //     titleText = 'Clear sky';
  //     break;
  //   case '01n':
  //     img = '../src/modules/detailed/images/moon.svg';
  //     altText = 'Moon';
  //     titleText = 'Clear sky';
  //     break;
  //   case '02d':
  //     img = '../src/modules/detailed/images/cloudy-day.svg';
  //     altText = 'Sun with clouds';
  //     titleText = 'Cloudy day';
  //     break;
  //   case '02n':
  //     img = '../src/modules/detailed/images/cloudy-night.svg';
  //     altText = 'Moon with clouds';
  //     titleText = 'Clear night';
  //     break;
  //   case '03d':
  //   case '03n':
  //   case '04d':
  //   case '04n':
  //     img = '../src/modules/detailed/images/cloudy.svg';
  //     altText = 'Clouds';
  //     titleText = 'Cloudy skies';
  //     break;
  //   case '09d':
  //   case '09n':
  //   case '10d':
  //   case '10n':
  //     img = '../src/modules/detailed/images/rainy.svg';
  //     altText = 'Cloud and rain';
  //     titleText = 'Rain';
  //     break;
  //   case '11d':
  //   case '11n':
  //     img = '../src/modules/detailed/images/lightning.svg';
  //     altText = 'Cloud and lightning';
  //     titleText = 'Thunderstorm';
  //     break;
  //   case '13d':
  //   case '13n':
  //     img = '../src/modules/detailed/images/snow.svg';
  //     altText = 'Cloud and snow';
  //     titleText = 'Snow';
  //     break;
  //   case '50d':
  //   case '50n':
  //     img = '../src/modules/detailed/images/mist.svg';
  //     altText = 'Mist';
  //     titleText = 'Haze';
  // }

  // // Highlight display units
  // switch (obj.extran.units) {
  //   case 'imperial':
  //     imperial.classList.add('set');
  //     metric.classList.remove('set');
  //     break;
  //   case 'metric':
  //     imperial.classList.remove('set');
  //     metric.classList.add('set');
  // }

  // city.forEach((header) => (header.textContent = obj.name));
  // time.textContent = getHRTime(obj.dt, obj.timezone);
  // timeZone.textContent = ` ${obj.extran.timeZone}`;
  // searchBox.value = '';
  // temp.textContent = Math.round(obj.main.temp) + '°';
  // descrImg.src = img;
  // descrImg.alt = altText;
  // descrImg.title = titleText;
  // descrText.textContent = current.replace(regexFL, (fl) => fl.toUpperCase());
  // feels.textContent = Math.round(obj.main.feels_like) + '°';
  // sunrise.textContent = getHRTime(sunriseEpoch, timezone);
  // sunset.textContent = getHRTime(sunsetEpoch, timezone);
  // maxMin.textContent = `${maxTemp}° / ${minTemp}°`;
  // windDir.style.transform = `rotate(${obj.wind.deg}deg)`;
  // windDir.title = `Wind ${obj.wind.deg}deg`;
  // humidity.textContent = obj.main.humidity + '%';
  // pressure.textContent = obj.main.pressure + ' hPa';

  // stateCountry.textContent = obj.extran.state
  //   ? `${obj.extran.state}, ${obj.sys.country}`
  //   : obj.sys.country;

  // wind.textContent =
  //   obj.extran.units === 'imperial'
  //     ? Math.round(obj.wind.speed) + ' mph'
  //     : Math.round((obj.wind.speed * 3600) / 1000) + ' km/h';
}
