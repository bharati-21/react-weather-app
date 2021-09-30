import {useState, useRef, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../App.css'
import { faMapMarkerAlt, faCloud, faCloudRain, faCloudSun, faSun, faWind} from '@fortawesome/free-solid-svg-icons';

const PostData = (props) => {
    // console.log
    return (
      <div>
        {props.props.map( data => {
          return <h1 key={data.id}>{data.id}</h1>
        })}
      </div>
    );
  };

export const FetchFutureData = (props) => {

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'december'];

    const {woeid, formattedDate, unit, date} = props;

    
    const [icon, setIcon] = useState("");
    const [minTemp, setMinTemp] = useState("");
    const [maxTemp, setMaxTemp] = useState("");

  
    useEffect(() => {
      fetchFutureWeatherData();
    }, [unit])
  
    const setTempAndUnit = (weather_data) => {
      let minTemp = Math.round(Number(weather_data["max_temp"])), maxTemp = Math.round(Number(weather_data["min_temp"]));
      if(unit === "°F") {
        minTemp = minTemp * (9/5) + 32;
        maxTemp = maxTemp * (9/5) + 32;
      }
      setMaxTemp(Math.round(minTemp));
      setMinTemp(Math.round(maxTemp));
    };
  
    const fetchFutureWeatherData = async() => {
        try {
  
            const weatherResponse = await fetch(`https://cors-anywhere-venky.herokuapp.com/https://www.metaweather.com/api/location/${woeid}/${formattedDate}/`);
            
            const weatherData = await weatherResponse.json();
            const weather_data = weatherData[0];
            // console.log("Weather data", weather_data)
        

            setTempAndUnit(weather_data);

            
            setIcon(`https://www.metaweather.com/static/img/weather/${weather_data["weather_state_abbr"]}.svg`);

        }
        catch(err) {
          console.log(err);
        }
      
      
    };
  
    
    return (
    <>
        <p className="weather-future-date">{date}</p>
       
    <img className="weather-future-icon" src={icon} />
        
        <p className="weather-future-temp">
            <span className="min-temp">{minTemp} {unit}</span>
            <span className="max-temp">{maxTemp} {unit}</span>
        </p>
    </>
    );
  
  };
  