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
    }, [])
  
  
    const fetchFutureWeatherData = async() => {
        try {
  
            const weatherResponse = await fetch(`https://cors-anywhere-venky.herokuapp.com/https://www.metaweather.com/api/location/${woeid}/${formattedDate}/`);
            
            const weatherData = await weatherResponse.json();
            const weather_data = weatherData[0];
            console.log("Weather data", weather_data)
        
            setMaxTemp(weather_data["max_temp"]);
            setMinTemp(weather_data["min_temp"]);
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
            <span className="min-temp">{Math.round(minTemp)} {unit}</span>
            <span className="max-temp">{Math.round(maxTemp)} {unit}</span>
        </p>
    </>
    );
  
  };
  