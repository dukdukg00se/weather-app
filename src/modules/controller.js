import * as display from './display';
import * as data from './data';

async function initPage() {
  let conditions = await getWeather();

  logParams(conditions);
  setTheme(conditions);
  displayWeather(conditions);
  listenForUserInput(conditions);
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

      let conditions = await getWeather(this.value, unitInput.value);

      logParams(conditions);
      setTheme(conditions);
      displayWeather(conditions);
    }
  }
  async function updateUnits() {
    const main = document.querySelector('main');
    let userUnits = unitInput.value == 'imperial' ? 'metric' : 'imperial';
    let conditions = await getWeather(main.dataset.search, userUnits);

    logParams(conditions);
    setTheme(conditions);
    displayWeather(conditions);
  }

  searchBox.addEventListener('keypress', getAreaWeather);
  searchIcon.addEventListener('click', getAreaWeather.bind(searchBox));
  unitInput.addEventListener('click', updateUnits);
}
