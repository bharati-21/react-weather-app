import './App.css';
import {useState, useRef, useEffect} from 'react'
import {axios} from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faCloud, faCloudRain, faCloudSun, faSun, faWind} from '@fortawesome/free-solid-svg-icons';
import {FutureCards} from './Components/FutureCards.js';


const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'december'];

const todayDate = 29;


function App() {

  const [weatherData, setWeatherData] = useState([]);
  const [city, setCity] = useState("Chennai");
  const [unit, setUnit] = useState("°C");
  const [woeid, setWOEID] = useState("2295424");
  const [icon, setIcon] = useState("");
  const [nextFiveDates, setNextFiveDates] = useState([]);
  const [nextFiveDatesFormatted, setNextFiveDatesFormatted] = useState([]);
  const [weatherCity, setWeatherCity] = useState("Chennai");

  
  const responseMessage = useRef("");

  // const nextFiveDates = [], nextFiveDatesFormatted = [];

 
  useEffect(() => {
    fetchNextFiveDays();
    fetchWeatherData();
  }, [woeid]);


  
  function fetchNextFiveDays() {
    const nextFiveDays = [];
    const nextFiveDaysFormatted = [];
    for(let i = 0; i<5; i++) {
      const nextDate = new Date();
  
      nextDate.setDate(nextDate.getDate()+i+1);
  
      nextFiveDaysFormatted.push(`${nextDate.getFullYear()}/${Number(nextDate.getMonth())+1}/${nextDate.getDate()}`);      
      nextFiveDays.push(`${days[nextDate.getDay()]}, ${nextDate.getDate()} ${months[nextDate.getMonth()]}`);
    }
    
    setNextFiveDatesFormatted(nextFiveDaysFormatted);
    setNextFiveDates(nextFiveDays);
  }

  const fetchWOEID = async () => {
    const response = await fetch(`https://cors-anywhere-venky.herokuapp.com/https://www.metaweather.com/api/location/search/?query=${city}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
   
    let data = await response.json();
    if(data.length === 0 || data === null) {
      responseMessage.current.className = "message error";
      throw new Error('Please enter a City');
    }
    const responseCity = data[0].title;
    if(city!==responseCity) {
      responseMessage.current.textContent = `Did you mean ${responseCity}?`;
      responseMessage.current.className = "message suggestion block";
      setWeatherCity(city);
      weatherCity.current.innerText = responseCity;
    }
    else {
      responseMessage.current.className = 'message none';
      setWeatherCity(city);
    }
    return data;
  };

  const fetchWeatherData = async () => {
    const weatherResponse = await fetch(`https://cors-anywhere-venky.herokuapp.com/https://www.metaweather.com/api/location/${woeid}/`)
    
    const data = await weatherResponse.json();

    setWeatherData(data["consolidated_weather"][0])

    setIcon(`https://www.metaweather.com//static/img/weather/${data["consolidated_weather"][0]["weather_state_abbr"]}.svg`);
    // console.log(icon);
  };

  

  const today = `${days[new Date().getDay()]}, ${new Date().getDate()} ${months[new Date().getMonth()]}`;

  function changeCity(e){
    responseMessage.current.className = "message none";
    setCity(e.target.value);
  }

  function searchCity(e) {
    e.preventDefault();
    fetchWOEID()
      .then(data => {
        setWOEID(data[0].woeid);
      })
      .catch(err => {
        console.log(err);
        responseMessage.current.className = "message error block";
        responseMessage.current.textContent = err;
      });
  }

  const props = {woeid: woeid, nextFiveDatesFormatted: nextFiveDatesFormatted}
  const futureCardProps = {nextFiveDates: nextFiveDates, nextFiveDatesFormatted: nextFiveDatesFormatted, woeid: woeid, unit: unit};
  return (
    <main className="App">
      <section className="weather-today">
        <div className="container">
          <article className="weather-city">
            <form className="city-form" onSubmit={searchCity}>
              <input className="city-input" placeholder="Search City" onChange={changeCity}/>
              <input type="submit" className="btn-search-city"></input>
            </form>
            <p className="response-message" ref={responseMessage}></p>
          </article>
          <article className="weather-icon">
            <img src={icon} />
          </article>
          <article className="weather-data">
            <h1 className="weather-temp">
              <span className="temp-value">{
                  Math.round(weatherData.the_temp)
                }</span>
              <span className="temp-unit">{unit}</span>
            </h1>
            <h3 className="weather-desc">
              {
                weatherData.weather_state_name
              }
            </h3>
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
                {weatherCity}
              </span>
            </p>
          </article>
        </div>
      </section>
      <section className="container weather-future">
        <article className="weather-future-forecast cards-container">
          <FutureCards futureCardProps = {futureCardProps}/>
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
