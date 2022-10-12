const earlySunImg = '../src/modules/bkgrnd/images/sun.png';
const rainImg = '../src/modules/bkgrnd/images/rain.png';
const nightImg = '../src/modules/bkgrnd/images/night.png';
const snowImg = '../src/modules/bkgrnd/images/snow.png';
const lateSunImg = '../src/modules/bkgrnd/images/high-sun.png';

const searchBox = document.getElementById('search-input');
const search = document.getElementById('search');
let area;
let units = 'imperial';

// Wrap in function depending on weather
document.body.style.backgroundImage = `url(${earlySunImg})`;
document.querySelector('main').style.backgroundColor = 'var(--early-sun-bkgrnd-color)';


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

  const filterData = ({coord, dt, main, name, sys, timezone, weather, wind}) => ({coord, dt, main, name, sys, timezone, weather, wind});

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
      
      getGeoCoord(reqInfo);
      displayDataCollectTime(reqInfo);
      popWeatherInfo(reqInfo);

    })
    .catch(() => {
      console.log('No')
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
      console.log('No')
    });

}
function displayLocation(obj) {
  let city = document.querySelectorAll('.city');
  let stateCountry = document.getElementById('state-country');

  city.forEach(heading => {
    heading.textContent = obj.name;
  })

  stateCountry.textContent = (obj.state) ? `${obj.state}, ${obj.country}` : obj.country;
}


function displayDataCollectTime(obj) {
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

}







const selectUnits = document.getElementById('select-units');
const farenUnit = document.getElementById('faren');
const celsUnit = document.getElementById('cels');

selectUnits.addEventListener('click', () => {
  farenUnit.classList.toggle('set');
  celsUnit.classList.toggle('set');

  units = farenUnit.classList.contains('set') ? 'imperial' : 'metric';
  console.log(units);
})




