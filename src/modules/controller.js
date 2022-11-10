import * as display from './display';
import * as data from './data';

function rmvErrOnEvnt(e) {
  if (e.key === 'Escape' || e.type === 'click') {
    // eslint-disable-next-line no-use-before-define
    showSearchErr(false);
  }
}

function showSearchErr(bool) {
  display.searchErr(bool);

  if (bool === true) {
    document.body.addEventListener('keydown', rmvErrOnEvnt);
    document.body.addEventListener('click', rmvErrOnEvnt);
  } else if (bool === false) {
    document.body.removeEventListener('keydown', rmvErrOnEvnt);
    document.body.removeEventListener('click', rmvErrOnEvnt);
  }
}

function handleErrs(input) {
  if (input === 'not found') {
    showSearchErr(true);
  } else if (input === false) {
    display.pageErr();
  } else {
    showSearchErr(false);
  }
}

function setPage(input) {
  handleErrs(input);

  if (typeof input === 'object') {
    data.logParams(input);
    display.setTheme(input);
    display.weather(input);
  }
}

function listenForInput() {
  const searchBox = document.getElementById('search-input');
  const searchIcon = document.getElementById('search');
  const unitInput = document.getElementById('unit-input');

  async function getAreaWeather(e) {
    if (e.key === 'Enter' || e.type === 'click') {
      if (this.value.length < 2) {
        return;
      }

      const conditions = await data.getWeather(this.value, unitInput.value);
      setPage(conditions);
    }
  }
  async function updateUnits() {
    const main = document.querySelector('main');
    const userUnits = unitInput.value === 'imperial' ? 'metric' : 'imperial';
    const conditions = await data.getWeather(main.dataset.search, userUnits);

    setPage(conditions);
  }

  searchBox.addEventListener('keypress', getAreaWeather);
  searchIcon.addEventListener('click', getAreaWeather.bind(searchBox));
  unitInput.addEventListener('click', updateUnits);
}

async function initWeatherPage() {
  const conditions = await data.getWeather();

  setPage(conditions);
  listenForInput();
}

export default initWeatherPage;
