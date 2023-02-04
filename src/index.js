import './styles/reset.css';
import './styles/styles.css';
import favicon from './assets/images/icons/cloudy-day.svg';
import initWeatherPage from './modules/controller';
import setFavicon from './modules/display-favicon';

setFavicon(favicon);
initWeatherPage();
