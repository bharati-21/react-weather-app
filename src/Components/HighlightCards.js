import '../App.css';
import {useState, useRef, useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faCloud, faCloudRain, faCloudSun, faSun, faWind} from '@fortawesome/free-solid-svg-icons';

export const HighlightCards = (props) => {
    const {weatherData} = props;

    return (
        <div key={weatherData.id}>
            <h2 className="highlights-head">Highlights</h2>
          <div className="cards-container">
            <div className="card large">
              <p className="weather-highlight">Wind Status</p>
              <h2 className="weather-highlight-value">{weatherData.wind_speed ? Math.round(Number(weatherData.wind_speed)) + " mph" : ""}</h2>
              <p>
                <FontAwesomeIcon icon={faWind} className="weather-highlight-icon"></FontAwesomeIcon>
              </p>
            </div>
            <div className="card large">
              <p className="weather-highlight">Humidity</p>
              <h2 className="weather-highlight-value">
                <span className="humidity-value">{weatherData.humidity ? weatherData.humidity: ""}</span>
                <span className="humidity-unit">{weatherData.humidity ? "%": ""}</span>
              </h2>
              <div className="progress-bar">
                  <div className="progress-bar-width" style={{width: weatherData.humidity? weatherData.humidity+'%': 0}}></div>

              </div>
            </div>
            <div className="card medium">
              <p className="weather-highlight">Visibility</p>
              <h2 className="weather-highlight-value">{weatherData.visibility ? Math.round(Number(weatherData.visibility)) + " miles" : ""}</h2>
            </div>
            <div className="card medium">
              <p className="weather-highlight">Air Pressure</p>
              <h2 className="weather-highlight-value">{weatherData.air_pressure ? Math.round(Number(weatherData.air_pressure)) + " mb" : ""}</h2>
            </div>
          </div>
        </div>
    )

};