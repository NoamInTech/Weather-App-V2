import React, { useState, useEffect } from "react";
import WeatherInfo from "./WeatherInfo";
import WeatherForecast from "./WeatherForecast";
import Timezone from "./Timezone";
import axios from "axios";

import "./Weather.css";

function formatDate(timeString) {
  const date = new Date(timeString);
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  };
  return date.toLocaleString("en-US", options).replace(" at", ",").trim();
}

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
      description: response.data.condition.description,
      icon: response.data.condition.icon,
      wind: response.data.wind.speed,
      city: response.data.city,
    });
  };

  async function getAndLogCurrentTime(city) {
    try {
      const currentTimeConstant = await Timezone(city);
      setTimeData(currentTimeConstant);
    } catch (error) {
      console.error("Error:", error);
    }
  }

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

  useEffect(() => {
    // Make the initial API call with the default city
    handleSubmit({ preventDefault: () => {} });
  }, []);

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
        {time && formatDate(time)}
      </p>
      {weatherData.ready ? (
        <React.Fragment>
          <WeatherInfo data={weatherData} />
          <WeatherForecast city={weatherData.city} />
        </React.Fragment>
      ) : (
        "Loading..."
      )}
    </div>
  );
}
