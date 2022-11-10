// Records search units, search term to html
// Serves to "save" search params
function logParams(obj) {
  if (obj) {
    const main = document.querySelector('main');
    const unitInput = document.getElementById('unit-input');

    main.dataset.search = obj.extran.search;
    unitInput.value = obj.extran.units;
  }
}

// Returns obj with weather info for given area
// If area not found - return not found
// If other error - return false
async function getWeather(area = 90210, dispUnits = 'imperial') {
  const isZip = /\d/g.test(area);
  const query = isZip ? 'zip' : 'q';

  // Use parameter destructuring and default object values to filter weatherResponse
  // See: https://stackoverflow.com/questions/43011742/how-to-omit-specific-properties-from-an-object-in-javascript
  const filterData = ({
    coord,
    dt,
    main,
    name,
    sys,
    timezone,
    weather,
    wind,
  }) => ({
    coord,
    dt,
    main,
    name,
    sys,
    timezone,
    weather,
    wind,
  });

  try {
    // Instead of passing URL string and mode option to fetch request
    // Use Request constructor to create new Request obj
    // Pass Request obj to fetch w/ default options (e.g. mode: 'cors')
    // Get weather info - doesn't include state, time zone abbr
    const weatherRequest = new Request(
      `https://api.openweathermap.org/data/2.5/weather?${query}=${area}&APPID=0aea211463138f620add488578423899&units=${dispUnits}`
    );

    const weatherResponse = await fetch(weatherRequest);
    const weatherInfo = filterData(await weatherResponse.json());

    if (!weatherResponse.ok) {
      throw new Error(weatherResponse.status);

      // Could also just throw status
      // throw weatherResponse.status;
    }

    // Get state name using second api call, limit responses to 1
    // Need to call openweather reverse geocoding api for state name
    // Current weather api only contains city name, country
    const stateRequest = new Request(
      `https://api.openweathermap.org/geo/1.0/reverse?lat=${weatherInfo.coord.lat}&lon=${weatherInfo.coord.lon}&limit=1&appid=0aea211463138f620add488578423899`
    );

    // Use TimeZoneDB RESTful API to get timezone abbreviation
    const tmZoneRequest = new Request(
      `https://api.timezonedb.com/v2.1/get-time-zone?key=P0O68OWY0HTK&format=json&by=position&lat=${weatherInfo.coord.lat}&lng=${weatherInfo.coord.lon}`
    );

    weatherInfo.extran = await Promise.all([
      fetch(stateRequest),
      fetch(tmZoneRequest),
    ])
      .then((responses) =>
        Promise.all(responses.map((response) => response.json()))
      )
      .then((responses) => {
        // return {
        //   state: responses[0][0].state,
        //   timeZone: responses[1].abbreviation,
        // };

        // const state = responses[0][0].state;
        // Use obj destructring instead (below)
        const { state } = responses[0][0];
        const timeZone = responses[1].abbreviation;

        // Same as above
        return { state, timeZone };
      });

    // TimeZoneDB API occasionally returns CORS error
    // By commenting out fetch request above and using code below
    // will return weatherInfo object so that other features can still be worked on
    // weatherInfo.extran = {};
    // const stateResp = await fetch(stateRequest);

    weatherInfo.extran.search = area;
    weatherInfo.extran.units = dispUnits;

    return weatherInfo;
  } catch (error) {
    if (error.message === '404') {
      return 'not found';
    }

    return false;
  }
}

export { logParams, getWeather };
