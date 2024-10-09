import React, {useState} from "react";
import axios from "axios";

function App() {
  const [data,setData] = useState({})
  const [location, setLocation] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=0e2ab8b6c2d4ae9251f4ba35273f0aa8`

  const searchLocation = (event) => {
    if(event.key === 'Enter'){
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }

  return (
    <div className="App">
      <div className="search">
        <input 
        value = {location}
        onChange={event => setLocation(event.target.value)}
        onKeyDown = {searchLocation}
        placeholder= "Enter City Name"
        type = "text" />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h2>{data.main.temp.toFixed()}°C</h2> :null}
          </div>
          <div className="description">
            {data.weather ?<p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined &&
        <div className="bottom">
          <div className="feels">
              {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°C</p> : null}
              <p>Feels Like</p>
            </div>
          <div className="humidity">
            {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
            <p>Humidity</p>
          </div>
          <div className="wind">
          {data.wind ? <p className="bold">{data.wind.speed.toFixed()}MPH</p> : null}
            <p>Wind</p>
          </div>
        </div>}
      </div>
    </div>
  );
}

export default App;
