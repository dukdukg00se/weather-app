/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/




// const main = document.querySelector('main');
// main.innerHTML = `<section id="general">
// <header id="gen-header">
//   <div>
//     <h1 class="city" id="gen-city"></h1>
//     <span id="state-country"></span>
//     As of <span id="data-time"></span><span id="data-zone"></span>
//   </div>

//   <div id="search-container">
//     <div id="search-wrapper">
//       <label for="search-input">Search</label>
//       <input
//         id="search-input"
//         type="text"
//         placeholder="Search City or Zip"
//         autocomplete="off"
//       />
//       <img
//         id="search"
//         src="../src/assets/images/icons/magnify-glass.svg"
//         alt="Magnifying glass icon"
//         title="Search"
//       />
//     </div>

//     <div id="search-params">
//       Oops an error occured. Please check search query. Query must be a:

//       <ul>
//         <li>5 digit zip code</li>
//         <li>City name</li>
//         <li>City name, country alpha-2 code</li>
//         <li>City name, state abbrev, country alpha-2 code</li>
//       </ul>
//     </div>
//   </div>
// </header>

// <div id="gen-body">
//   <div>
//     <div>Temperature<span id="temp"></span></div>

//     <div id="units-wrapper">
//       <span id="imperial" class="set">F</span>
//       <label for="unit-input" class="switch">
//         <input id="unit-input" type="checkbox" />
//         <span class="slider"></span>
//       </label>
//       <span id="metric">C</span>
//     </div>
//   </div>

//   <div>
//     <img id="descr-img" />

//     <div id="descr"></div>
//   </div>
// </div>
// </section>

// <section id="detailed">
// <header id="det-header">
//   <h2>Weather today in <span class="city"></span></h2>
// </header>

// <div>
//   <div id="det-body-top">
//     <div>Feels Like<span id="feels"></span></div>

//     <div>
//       <div>
//         <div>
//           <img
//             class="sun-icon"
//             src="../src/assets/images/icons/sunrise-fill.svg"
//             alt="Sunrise icon"
//             title="Sunrise"
//           />
//           Sunrise:
//         </div>
//         <span id="sunrise"></span>
//       </div>

//       <div>
//         <div>
//           <img
//             class="sun-icon"
//             src="../src/assets/images/icons/sunset-fill.svg"
//             alt="Sunset Icon"
//             title="Sunset"
//           />
//           Sunset:
//         </div>
//         <span id="sunset"></span>
//       </div>
//     </div>
//   </div>

//   <div id="det-body-bottom">
//     <ul>
//       <li>
//         <img
//           class="weather-icon"
//           src="../src/assets/images/icons/thermo.svg"
//           alt="Thermometer icon"
//           title="Max/min temperature"
//         />
//         <div class="li-descr">Max / Min</div>
//         <div id="max-min"></div>
//       </li>

//       <li>
//         <img
//           class="weather-icon"
//           src="../src/assets/images/icons/wind.svg"
//           alt="Wind icon"
//           title="Wind speed and direction"
//         />
//         <div class="li-descr">Wind</div>
//         <div>
//           <img
//             id="wind-dir"
//             src="../src/assets/images/icons/wind-dir.svg"
//             alt="Arrow showing wind direction"
//           />
//           <span id="wind"></span>
//         </div>
//       </li>

//       <li>
//         <img
//           class="weather-icon"
//           src="../src/assets/images/icons/humidity.svg"
//           alt="Humidity icon"
//           title="Humidity"
//         />
//         <div class="li-descr">Humidity</div>
//         <div id="humidity"></div>
//       </li>

//       <li>
//         <img
//           class="weather-icon"
//           src="../src/assets/images/icons/pressure.svg"
//           alt="Pressure icon"
//           title="Pressure"
//         />
//         <div class="li-descr">Pressure</div>
//         <div id="pressure"></div>
//       </li>
//     </ul>
//   </div>
// </div>
// </section>`;


/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiXG5cblxuXG4vLyBjb25zdCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWFpbicpO1xuLy8gbWFpbi5pbm5lckhUTUwgPSBgPHNlY3Rpb24gaWQ9XCJnZW5lcmFsXCI+XG4vLyA8aGVhZGVyIGlkPVwiZ2VuLWhlYWRlclwiPlxuLy8gICA8ZGl2PlxuLy8gICAgIDxoMSBjbGFzcz1cImNpdHlcIiBpZD1cImdlbi1jaXR5XCI+PC9oMT5cbi8vICAgICA8c3BhbiBpZD1cInN0YXRlLWNvdW50cnlcIj48L3NwYW4+XG4vLyAgICAgQXMgb2YgPHNwYW4gaWQ9XCJkYXRhLXRpbWVcIj48L3NwYW4+PHNwYW4gaWQ9XCJkYXRhLXpvbmVcIj48L3NwYW4+XG4vLyAgIDwvZGl2PlxuXG4vLyAgIDxkaXYgaWQ9XCJzZWFyY2gtY29udGFpbmVyXCI+XG4vLyAgICAgPGRpdiBpZD1cInNlYXJjaC13cmFwcGVyXCI+XG4vLyAgICAgICA8bGFiZWwgZm9yPVwic2VhcmNoLWlucHV0XCI+U2VhcmNoPC9sYWJlbD5cbi8vICAgICAgIDxpbnB1dFxuLy8gICAgICAgICBpZD1cInNlYXJjaC1pbnB1dFwiXG4vLyAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbi8vICAgICAgICAgcGxhY2Vob2xkZXI9XCJTZWFyY2ggQ2l0eSBvciBaaXBcIlxuLy8gICAgICAgICBhdXRvY29tcGxldGU9XCJvZmZcIlxuLy8gICAgICAgLz5cbi8vICAgICAgIDxpbWdcbi8vICAgICAgICAgaWQ9XCJzZWFyY2hcIlxuLy8gICAgICAgICBzcmM9XCIuLi9zcmMvYXNzZXRzL2ltYWdlcy9pY29ucy9tYWduaWZ5LWdsYXNzLnN2Z1wiXG4vLyAgICAgICAgIGFsdD1cIk1hZ25pZnlpbmcgZ2xhc3MgaWNvblwiXG4vLyAgICAgICAgIHRpdGxlPVwiU2VhcmNoXCJcbi8vICAgICAgIC8+XG4vLyAgICAgPC9kaXY+XG5cbi8vICAgICA8ZGl2IGlkPVwic2VhcmNoLXBhcmFtc1wiPlxuLy8gICAgICAgT29wcyBhbiBlcnJvciBvY2N1cmVkLiBQbGVhc2UgY2hlY2sgc2VhcmNoIHF1ZXJ5LiBRdWVyeSBtdXN0IGJlIGE6XG5cbi8vICAgICAgIDx1bD5cbi8vICAgICAgICAgPGxpPjUgZGlnaXQgemlwIGNvZGU8L2xpPlxuLy8gICAgICAgICA8bGk+Q2l0eSBuYW1lPC9saT5cbi8vICAgICAgICAgPGxpPkNpdHkgbmFtZSwgY291bnRyeSBhbHBoYS0yIGNvZGU8L2xpPlxuLy8gICAgICAgICA8bGk+Q2l0eSBuYW1lLCBzdGF0ZSBhYmJyZXYsIGNvdW50cnkgYWxwaGEtMiBjb2RlPC9saT5cbi8vICAgICAgIDwvdWw+XG4vLyAgICAgPC9kaXY+XG4vLyAgIDwvZGl2PlxuLy8gPC9oZWFkZXI+XG5cbi8vIDxkaXYgaWQ9XCJnZW4tYm9keVwiPlxuLy8gICA8ZGl2PlxuLy8gICAgIDxkaXY+VGVtcGVyYXR1cmU8c3BhbiBpZD1cInRlbXBcIj48L3NwYW4+PC9kaXY+XG5cbi8vICAgICA8ZGl2IGlkPVwidW5pdHMtd3JhcHBlclwiPlxuLy8gICAgICAgPHNwYW4gaWQ9XCJpbXBlcmlhbFwiIGNsYXNzPVwic2V0XCI+Rjwvc3Bhbj5cbi8vICAgICAgIDxsYWJlbCBmb3I9XCJ1bml0LWlucHV0XCIgY2xhc3M9XCJzd2l0Y2hcIj5cbi8vICAgICAgICAgPGlucHV0IGlkPVwidW5pdC1pbnB1dFwiIHR5cGU9XCJjaGVja2JveFwiIC8+XG4vLyAgICAgICAgIDxzcGFuIGNsYXNzPVwic2xpZGVyXCI+PC9zcGFuPlxuLy8gICAgICAgPC9sYWJlbD5cbi8vICAgICAgIDxzcGFuIGlkPVwibWV0cmljXCI+Qzwvc3Bhbj5cbi8vICAgICA8L2Rpdj5cbi8vICAgPC9kaXY+XG5cbi8vICAgPGRpdj5cbi8vICAgICA8aW1nIGlkPVwiZGVzY3ItaW1nXCIgLz5cblxuLy8gICAgIDxkaXYgaWQ9XCJkZXNjclwiPjwvZGl2PlxuLy8gICA8L2Rpdj5cbi8vIDwvZGl2PlxuLy8gPC9zZWN0aW9uPlxuXG4vLyA8c2VjdGlvbiBpZD1cImRldGFpbGVkXCI+XG4vLyA8aGVhZGVyIGlkPVwiZGV0LWhlYWRlclwiPlxuLy8gICA8aDI+V2VhdGhlciB0b2RheSBpbiA8c3BhbiBjbGFzcz1cImNpdHlcIj48L3NwYW4+PC9oMj5cbi8vIDwvaGVhZGVyPlxuXG4vLyA8ZGl2PlxuLy8gICA8ZGl2IGlkPVwiZGV0LWJvZHktdG9wXCI+XG4vLyAgICAgPGRpdj5GZWVscyBMaWtlPHNwYW4gaWQ9XCJmZWVsc1wiPjwvc3Bhbj48L2Rpdj5cblxuLy8gICAgIDxkaXY+XG4vLyAgICAgICA8ZGl2PlxuLy8gICAgICAgICA8ZGl2PlxuLy8gICAgICAgICAgIDxpbWdcbi8vICAgICAgICAgICAgIGNsYXNzPVwic3VuLWljb25cIlxuLy8gICAgICAgICAgICAgc3JjPVwiLi4vc3JjL2Fzc2V0cy9pbWFnZXMvaWNvbnMvc3VucmlzZS1maWxsLnN2Z1wiXG4vLyAgICAgICAgICAgICBhbHQ9XCJTdW5yaXNlIGljb25cIlxuLy8gICAgICAgICAgICAgdGl0bGU9XCJTdW5yaXNlXCJcbi8vICAgICAgICAgICAvPlxuLy8gICAgICAgICAgIFN1bnJpc2U6XG4vLyAgICAgICAgIDwvZGl2PlxuLy8gICAgICAgICA8c3BhbiBpZD1cInN1bnJpc2VcIj48L3NwYW4+XG4vLyAgICAgICA8L2Rpdj5cblxuLy8gICAgICAgPGRpdj5cbi8vICAgICAgICAgPGRpdj5cbi8vICAgICAgICAgICA8aW1nXG4vLyAgICAgICAgICAgICBjbGFzcz1cInN1bi1pY29uXCJcbi8vICAgICAgICAgICAgIHNyYz1cIi4uL3NyYy9hc3NldHMvaW1hZ2VzL2ljb25zL3N1bnNldC1maWxsLnN2Z1wiXG4vLyAgICAgICAgICAgICBhbHQ9XCJTdW5zZXQgSWNvblwiXG4vLyAgICAgICAgICAgICB0aXRsZT1cIlN1bnNldFwiXG4vLyAgICAgICAgICAgLz5cbi8vICAgICAgICAgICBTdW5zZXQ6XG4vLyAgICAgICAgIDwvZGl2PlxuLy8gICAgICAgICA8c3BhbiBpZD1cInN1bnNldFwiPjwvc3Bhbj5cbi8vICAgICAgIDwvZGl2PlxuLy8gICAgIDwvZGl2PlxuLy8gICA8L2Rpdj5cblxuLy8gICA8ZGl2IGlkPVwiZGV0LWJvZHktYm90dG9tXCI+XG4vLyAgICAgPHVsPlxuLy8gICAgICAgPGxpPlxuLy8gICAgICAgICA8aW1nXG4vLyAgICAgICAgICAgY2xhc3M9XCJ3ZWF0aGVyLWljb25cIlxuLy8gICAgICAgICAgIHNyYz1cIi4uL3NyYy9hc3NldHMvaW1hZ2VzL2ljb25zL3RoZXJtby5zdmdcIlxuLy8gICAgICAgICAgIGFsdD1cIlRoZXJtb21ldGVyIGljb25cIlxuLy8gICAgICAgICAgIHRpdGxlPVwiTWF4L21pbiB0ZW1wZXJhdHVyZVwiXG4vLyAgICAgICAgIC8+XG4vLyAgICAgICAgIDxkaXYgY2xhc3M9XCJsaS1kZXNjclwiPk1heCAvIE1pbjwvZGl2PlxuLy8gICAgICAgICA8ZGl2IGlkPVwibWF4LW1pblwiPjwvZGl2PlxuLy8gICAgICAgPC9saT5cblxuLy8gICAgICAgPGxpPlxuLy8gICAgICAgICA8aW1nXG4vLyAgICAgICAgICAgY2xhc3M9XCJ3ZWF0aGVyLWljb25cIlxuLy8gICAgICAgICAgIHNyYz1cIi4uL3NyYy9hc3NldHMvaW1hZ2VzL2ljb25zL3dpbmQuc3ZnXCJcbi8vICAgICAgICAgICBhbHQ9XCJXaW5kIGljb25cIlxuLy8gICAgICAgICAgIHRpdGxlPVwiV2luZCBzcGVlZCBhbmQgZGlyZWN0aW9uXCJcbi8vICAgICAgICAgLz5cbi8vICAgICAgICAgPGRpdiBjbGFzcz1cImxpLWRlc2NyXCI+V2luZDwvZGl2PlxuLy8gICAgICAgICA8ZGl2PlxuLy8gICAgICAgICAgIDxpbWdcbi8vICAgICAgICAgICAgIGlkPVwid2luZC1kaXJcIlxuLy8gICAgICAgICAgICAgc3JjPVwiLi4vc3JjL2Fzc2V0cy9pbWFnZXMvaWNvbnMvd2luZC1kaXIuc3ZnXCJcbi8vICAgICAgICAgICAgIGFsdD1cIkFycm93IHNob3dpbmcgd2luZCBkaXJlY3Rpb25cIlxuLy8gICAgICAgICAgIC8+XG4vLyAgICAgICAgICAgPHNwYW4gaWQ9XCJ3aW5kXCI+PC9zcGFuPlxuLy8gICAgICAgICA8L2Rpdj5cbi8vICAgICAgIDwvbGk+XG5cbi8vICAgICAgIDxsaT5cbi8vICAgICAgICAgPGltZ1xuLy8gICAgICAgICAgIGNsYXNzPVwid2VhdGhlci1pY29uXCJcbi8vICAgICAgICAgICBzcmM9XCIuLi9zcmMvYXNzZXRzL2ltYWdlcy9pY29ucy9odW1pZGl0eS5zdmdcIlxuLy8gICAgICAgICAgIGFsdD1cIkh1bWlkaXR5IGljb25cIlxuLy8gICAgICAgICAgIHRpdGxlPVwiSHVtaWRpdHlcIlxuLy8gICAgICAgICAvPlxuLy8gICAgICAgICA8ZGl2IGNsYXNzPVwibGktZGVzY3JcIj5IdW1pZGl0eTwvZGl2PlxuLy8gICAgICAgICA8ZGl2IGlkPVwiaHVtaWRpdHlcIj48L2Rpdj5cbi8vICAgICAgIDwvbGk+XG5cbi8vICAgICAgIDxsaT5cbi8vICAgICAgICAgPGltZ1xuLy8gICAgICAgICAgIGNsYXNzPVwid2VhdGhlci1pY29uXCJcbi8vICAgICAgICAgICBzcmM9XCIuLi9zcmMvYXNzZXRzL2ltYWdlcy9pY29ucy9wcmVzc3VyZS5zdmdcIlxuLy8gICAgICAgICAgIGFsdD1cIlByZXNzdXJlIGljb25cIlxuLy8gICAgICAgICAgIHRpdGxlPVwiUHJlc3N1cmVcIlxuLy8gICAgICAgICAvPlxuLy8gICAgICAgICA8ZGl2IGNsYXNzPVwibGktZGVzY3JcIj5QcmVzc3VyZTwvZGl2PlxuLy8gICAgICAgICA8ZGl2IGlkPVwicHJlc3N1cmVcIj48L2Rpdj5cbi8vICAgICAgIDwvbGk+XG4vLyAgICAgPC91bD5cbi8vICAgPC9kaXY+XG4vLyA8L2Rpdj5cbi8vIDwvc2VjdGlvbj5gO1xuXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=