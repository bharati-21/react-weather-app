# Weather Application
An application created using ReactJS that displays the current weather forecast and the forecast for the next 5 days.

### This application tests users knowledge of triangles and it's types.
[Live demo of the application](https://react-weather-app-bharati.netlify.app/)

<hr />

## TECHNOLOGIES/ LANGUAGES USED
* HTML
* CSS
* JavaScript
* ReactJS

<hr />

## WORKING
1. This application allows users to search for a city name, and check the weather forecast. 
2. This project uses the [metaweather API](https://www.metaweather.com/) to first search for the location id- called where on earth (woeid) id. 
3. If the city is recognized by the API, it returns the woeid, which is then used to make a second call to the same API, and fetch real time weather. 
4. The application shows the current forecast, and also for the next 5 days. 
5. Additionaly, this app also allows users to view data in either degree Farenheit or degree Celcius units.
<br />

![Image of the application](https://github.com/bharati-21/react-weather-app/blob/master/weather-app.PNG)

<hr />

## My Learnings
- My key takeaway was developing an understanding of React components, maintaining multiple states, and hooks. 
- Being my first large react project, I learnt about organizing, and structuring files in a react project. 
- I also got an opportunity understand how fetching data works in react.

<hr />

## Challenges
- Figuring the number of components, and states that were required for the application.
- Fecthing data in a react application was a major challenge. 
- The next challenge was immediately fetching weather data when location id was available.
- Updating a child component whenever the state of parent component changed.
- A final challenge was deciding upon which values were needed to be passed on as props from a parent to a child component.

