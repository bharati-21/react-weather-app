import './App.css';
import {useState, useRef, useEffect} from 'react'
import {axios} from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faCloud, faCloudRain, faCloudSun, faSun, faWind} from '@fortawesome/free-solid-svg-icons';
import {FutureCards} from './Components/FutureCards';
import { HighlightCards } from './Components/HighlightCards';


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
  const [temp, setTemp] = useState();
  const [weatherCity, setWeatherCity] = useState("Chennai");

  
  const responseMessage = useRef("");

  // const nextFiveDates = [], nextFiveDatesFormatted = [];

 
  useEffect(() => {
    console.clear();
    fetchNextFiveDays();
    fetchWeatherData();
  }, [woeid]);


  
  function changeUnit(e) {
    if(unit === '°C' && e.target.innerText === "°F") {
      setUnit("°F");

      setTemp(Math.round((temp * (9/5)) + 32));

    }
    else if(unit === '°F' && e.target.innerText === "°C") {
      setUnit("°C");
      setTemp(Math.round((temp - 32) * (5/9)));
    }
  }

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
      setWeatherCity(responseCity);
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
    let weatherTemp = Math.round(Number(data["consolidated_weather"][0]["the_temp"]));
    if(unit === '°F') {
        weatherTemp = (Math.round(weatherTemp * (9/5) + 32));
    }

    setTemp(weatherTemp);
    
    

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
              <span className="temp-value"> {!Number.isNaN(temp) ?
                  temp : ""}</span>
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
        <article className="unit-buttons container">
          <button onClick={changeUnit} className={unit === "°C" ? "unit unit-cel current-unit" : "unit unit-cel"}>°C</button>
          <button onClick={changeUnit} className={unit === "°C" ? "unit unit-far" : "unit unit-far current-unit"}>°F</button>
        </article>
        <article className="weather-future-forecast cards-container">
          <FutureCards futureCardProps = {futureCardProps}/>
        </article>
        <article className="weather-today-highlights">
          <HighlightCards weatherData={weatherData}  />
        </article>
        <footer>
          <small>Created by Bharati</small>
        </footer>
      </section>
    </main>
  );
}

export default App;
