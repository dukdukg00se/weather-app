import * as display from './display';
import * as data from './data';

function setWeather(obj) {
  data.logParams(obj);
  display.setTheme(obj);
  display.displayWeather(obj);
}

function listenForUserInput() {
  const searchBox = document.getElementById('search-input');
  const searchIcon = document.getElementById('search');
  const unitInput = document.getElementById('unit-input');

  async function getAreaWeather(e) {
    if (e.key === 'Enter' || e.type === 'click') {
      if (this.value === '') {
        return;
      }

      let conditions = await data.getWeather(this.value, unitInput.value);

      setWeather(conditions);
    }
  }
  async function updateUnits() {
    const main = document.querySelector('main');
    let userUnits = unitInput.value == 'imperial' ? 'metric' : 'imperial';
    let conditions = await data.getWeather(main.dataset.search, userUnits);

    setWeather(conditions);
  }

  searchBox.addEventListener('keypress', getAreaWeather);
  searchIcon.addEventListener('click', getAreaWeather.bind(searchBox));
  unitInput.addEventListener('click', updateUnits);
}

async function initWeatherPage() {
  let conditions = await data.getWeather();

  setWeather(conditions);
  listenForUserInput(conditions);
}

export default initWeatherPage;
