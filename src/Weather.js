import React, { useState, useEffect } from "react";
import WeatherInfo from "./WeatherInfo";
import WeatherForecast from "./WeatherForecast";
import GetCurrentTime from "./TimezoneAPI";
import axios from "axios";

import "./Weather.css";

export default function Weather(props) {
  const [weatherData, setWeatherData] = useState({ ready: false });
  const [city, setCity] = useState(props.defaultCity);
  const [time, setTimeData] = useState(null);

  const handleResponse = (response) => {
    console.log(response.data);
    getAndLogCurrentTime(city);

    setWeatherData({
      ready: true,
      temperature: response.data.temperature.current,
      humidity: response.data.temperature.humidity,
      date: new Date(response.data.time * 1000),
      description: response.data.condition.description,
      icon: response.data.condition.icon,
      wind: response.data.wind.speed,
      city: response.data.city,
    });
  };

  async function getAndLogCurrentTime(city) {
    try {
      const currentTimeConstant = await GetCurrentTime(city);
      setTimeData(currentTimeConstant);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    // When the component mounts or the default city changes, make the API call for the default city.
    const apiKey = "fe0c30430a61b3c470ofba4b5t0b59e4";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${props.defaultCity}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then((response) => {
      handleResponse(response);
    });
  }, [props.defaultCity]);

  function handleSubmit(event) {
    event.preventDefault();
    const apiKey = "fe0c30430a61b3c470ofba4b5t0b59e4";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then((response) => {
      handleResponse(response);
    });
  }

  function handleCityChange(event) {
    setCity(event.target.value);
  }

  if (weatherData.ready) {
    return (
      <div className="Weather">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-9">
              <input
                type="search"
                placeholder="Enter a city..."
                className="form-control"
                autoFocus="on"
                onChange={handleCityChange}
              />
            </div>
            <div className="col-3">
              <input
                type="submit"
                value="Search"
                className="btn btn-primary w-100"
              />
            </div>
          </div>
        </form>
        <p>
          <br />
          {time}
        </p>
        <WeatherInfo data={weatherData} />
        <WeatherForecast city={weatherData.city} />
      </div>
    );
  } else {
    return "Loading...";
  }
}
