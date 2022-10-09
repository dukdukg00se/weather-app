const sunImg = '../src/modules/bkgrnd/images/sun.png';
const rainImg = '../src/modules/bkgrnd/images/rain.png';
const nightImg = '../src/modules/bkgrnd/images/night.png';
const snowImg = '../src/modules/bkgrnd/images/snow.png';
const highSunImg = '../src/modules/bkgrnd/images/high-sun.png';

document.body.style.backgroundImage = `url(${snowImg})`;



const searchBox = document.getElementById('search-input');
const search = document.getElementById('search');
let area;

searchBox.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    area = searchBox.value;
    searchBox.value = '';

    showCurrent();
  }
});

search.addEventListener('click', () => {
  area = searchBox.value;
  searchBox.value = ''
});



function showCurrent() {
  let isZip = (/\d/g).test(area);
  let query = isZip ? 'zip' : 'q';
  
  console.log(area);
  console.log(isZip);

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?${query}=${area}&APPID=0aea211463138f620add488578423899&units=imperial`,
    { mode: 'cors' }
  )
    .then((response) => {
      // console.log(response);

      // JSON as input, parse it to produce a promise that resolves to JS object
      return response.json();
    })
    .then((response) => {
      // console.log(response);

      let test = response;
      console.log(test);
      // img.src = response.data.images.original.url;
      // error.textContent = '';
    })
    .catch(() => {
      // error.textContent = 'No gifs found';
    });
}

// showCurrent();
/** */
// Logs 5 destinations with similar name
// fetch(
//   `https://api.openweathermap.org/geo/1.0/direct?q=san+francisco&limit=5&appid=0aea211463138f620add488578423899`,
//   { mode: 'cors' }
// )
//   .then((response) => {
//     // console.log(response);

//     return response.json();
//   })
//   .then((response) => {
//     console.log(response);

//     response.forEach(x => {
//       console.log(x.name + ', ' + x.state);
//     });
//   })