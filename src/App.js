import './App.css';
import {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import lightShower from'./assets/Shower.png';



console.log(lightShower);


function App() {

  const [city, setCity] = useState("");

  function searchCity(e) {
    e.preventDefault();
    setCity(e.target.value);
  }

  return (
    <main className="App">
      <section className="weather-today">
        <article className="flex-container">
          <div className="flex-item">
            <form className="city-form" onSubmit={(e) => searchCity(e)}>
              <input type="text" name="city-input" className="city-input" id="city-input"  placeholder="Enter City Name"/>
              <button type="submit" value="Search" className="city-search">Search <FontAwesomeIcon icon={faMapMarkerAlt}></FontAwesomeIcon></button>
            </form>  
          </div>
          <div className="flex-item">
            <img src={lightShower}></img>
          </div>
          <h1 className="weather-temp">20</h1>
          <h3 className="weather-desc"></h3>
          <div className="weather-date-place">
            <p className="weather-date"></p>
            <p className="weather-place">
              <span className="fontawesome-icon">
              <FontAwesomeIcon icon={faMapMarkerAlt}></FontAwesomeIcon></span>
              </p>
          </div>
        </article>      
      </section>
      <section className="weather-future"></section>
    </main>
  );
}

export default App;
