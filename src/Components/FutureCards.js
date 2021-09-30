import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../App.css'
import { faMapMarkerAlt, faCloud, faCloudRain, faCloudSun, faSun, faWind} from '@fortawesome/free-solid-svg-icons';
import { FetchFutureData } from './FetchFutureData';

export  const FutureCards = (props) => {

    const {nextFiveDates, nextFiveDatesFormatted, woeid, unit} = props.futureCardProps;
    return (
        <>
        {
            nextFiveDates.map((date, index) => {
              return <div key={woeid-index} className="card small">
                  <FetchFutureData woeid={woeid} formattedDate = {nextFiveDatesFormatted[index]} unit={unit} date={date}/>
                
              </div>
            })
        }
        </>
    )

};