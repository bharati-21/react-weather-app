import './App.css';
import {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faCloud, faCloudRain, faCloudSun, faSun, faWind} from '@fortawesome/free-solid-svg-icons';
import lightShower from'./assets/Shower.png';



console.log(lightShower);

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'december'];

const todayDate = 29;
const nextFiveDays = [];
for(let i = 0; i<5; i++) {
  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate()+i+1);
  
  nextFiveDays[i] = `${days[nextDate.getDay()]}, ${nextDate.getDate()} ${months[nextDate.getMonth()]}`;
  console.log(nextFiveDays[i]);
}

function App() {

  
  const [city, setCity] = useState("Chennai");
  const [unit, setUnit] = useState("°C");

  const today = `${days[new Date().getDay()]}, ${new Date().getDate()} ${months[new Date().getMonth()]}`;
  console.log(today); 

  function changeCity(e){
    setCity(e.target.value);
  }

  function searchCity(e) {
    e.preventDefault();
  }

  return (
    <main className="App">
      <section className="weather-today">
        <div className="container">
          <article className="weather-city">
            <form className="city-form" onSubmit={searchCity}>
              <input className="city-input" placeholder="Search City" onChange={changeCity}/>
              <input type="submit" className="btn-search-city"></input>
            </form>
          </article>
          <article className="weather-icon">
            <FontAwesomeIcon icon={faCloudRain} size="5x"></FontAwesomeIcon>
          </article>
          <article className="weather-data">
            <h1 className="weather-temp">
              <span className="temp-value">25</span>
              <span className="temp-unit">{unit}</span>
            </h1>
            <h3 className="weather-desc"></h3>
          </article>
          <article className="weather-date-place">
            <p className="weather-date">
              {today}
            </p>
            <p className="weather-place">
              <span className="location-icon">
                <FontAwesomeIcon icon={faMapMarkerAlt}></FontAwesomeIcon>
              </span>
              <span className="weather-place">
                {city}
              </span>
            </p>
          </article>
        </div>
      </section>
      <section className="container weather-future">
        <article className="weather-future-forecast cards-container">
          {
            nextFiveDays.map(date => {
              return <div className="card small">
                <p className="weather-future-date">{date}</p>
                <p className="weather-future-icon"><FontAwesomeIcon icon={faCloud}></FontAwesomeIcon></p>
                <p className="weather-future-temp">15 {unit}</p>
              </div>
            })
          }
        </article>
        <article className="weather-today-highlights">
          <h2 className="highlights-head">Highlights</h2>
          <div className="cards-container">
            <div className="card large">
              <p className="weather-highlight">Wind Status</p>
              <h2 className="weather-highlight-value">7mph</h2>
              <p>
                <FontAwesomeIcon icon={faWind} className="weather-highlight-icon"></FontAwesomeIcon>
              </p>
            </div>
            <div className="card large">
              <p className="weather-highlight">Humidity</p>
              <h2 className="weather-highlight-value">
                <span className="humidity-value">84</span>
                <span className="humidity-unit">%</span>
              </h2>
              <div className="progress-bar"></div>
            </div>
            <div className="card medium">
              <p className="weather-highlight">Visibility</p>
              <h2 className="weather-highlight-value">6,4 miles</h2>
            </div>
            <div className="card medium">
              <p className="weather-highlight">Air Pressure</p>
              <h2 className="weather-highlight-value">998 mb</h2>
            </div>
          </div>
        </article>
        <footer>
          <small>Created by Bharati</small>
        </footer>
      </section>
    </main>
  );
}

export default App;


/*
<section className="weather-today">
        <article className="flex-container">
          <div className="flex-item">
            <form className="city-form" onSubmit={searchCity}>
              <input type="text" name="city-input" className="city-input" id="city-input"  placeholder="Enter City Name" onChange={changeCity}/>
              <button type="submit" value="Search" className="city-search">Search <FontAwesomeIcon icon={faMapMarkerAlt}></FontAwesomeIcon></button>
            </form>  
            <img src={lightShower}></img>
          </div>
            
          <h1 className="weather-temp">20<span className="weather-temp-unit">C</span></h1>
          <h3 className="weather-desc">Windy</h3>
          <div className="weather-date-place">
            <p className="weather-date"></p>
            <p className="weather-place">
              <span className="fontawesome-icon">
                <FontAwesomeIcon icon={faMapMarkerAlt}></FontAwesomeIcon>
              </span>
              <span className="weather-city">
                {city}
              </span>
              </p>
          </div>
        </article>      
      </section>
      <section className="weather-future">
        <article className="flex-container">
          <div className="card-container future-forecast">
            <div className="card">
              <h4 className="weather-future-date">Day 1</h4>
              <div className="weather-future-icon"></div>
              <p className="weather-future-temp"></p>
            </div>
            <div className="card">
              <h4 className="weather-future-date">Day 2</h4>
              <div className="weather-future-icon"></div>
              <p className="weather-future-temp"></p>
            </div>
            <div className="card">
              <h4 className="weather-future-date">Day 3</h4>
              <div className="weather-future-icon"></div>
              <p className="weather-future-temp"></p>
            </div>
            <div className="card">
              <h4 className="weather-future-date">Day 4</h4>
              <div className="weather-future-icon"></div>
              <p className="weather-future-temp"></p>
            </div>
            <div className="card">
              <h4 className="weather-future-date">Day 5</h4>
              <div className="weather-future-icon"></div>
              <p className="weather-future-temp"></p>
            </div>
          </div>
          <div className="weather-today-highlights">
            <h2>Today's Highlights</h2>
            <div className="card-container highlights">
              <div className="card">
                <h4 className="weather-highlight">Wind Status</h4>
                <p className="weather-highlight-value"></p>
              </div>
              <div className="card">
                <h4 className="weather-highlight">Humidity</h4>
                <p className="weather-highlight-value"></p>
              </div>
              <div className="card">
                <h4 className="weather-highlight">Visibility</h4>
                <p className="weather-highlight-value"></p>
              </div>
              <div className="card">
                <h4 className="weather-highlight">Air Pressure</h4>
                <p className="weather-highlight-value"></p>
              </div>
            </div>
          </div>
          <footer>
            <small>created by Bharati</small>
          </footer>
        </article>
        
      </section>
      */