import React, { useState, useEffect, useRef, useCallback } from "react";
import ForecastDisplay from "./components/Forecast/ForecastDisplay";
import WeatherInfo from "./components/WeatherInfo";
import { formatDate } from "./utils/TimeDate";
import Timezone from "./utils/Timezone";
import axios from "axios";

import "./styles/WeatherApp.css";

const WeatherApp = (props) => {
  const [weatherData, setWeatherData] = useState({ ready: false });
  const [city, setCity] = useState(props.defaultCity);
  const [time, setTimeData] = useState(null);
  const handleSubmitRef = useRef();

  const handleResponse = useCallback(
    (response) => {
      const weather = response.data;
      console.log(weather);
      getAndLogCurrentTime(city);
      setWeatherData({
        ready: true,
        temperature: weather.temperature.current,
        humidity: weather.temperature.humidity,
        description: weather.condition.description,
        icon: weather.condition.icon,
        wind: weather.wind.speed,
        city: weather.city,
      });
    },
    [city]
  );

  const getAndLogCurrentTime = async (city) => {
    try {
      const currentTimeConstant = await Timezone(city);
      setTimeData(currentTimeConstant);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
      const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
      axios.get(apiUrl).then((response) => {
        handleResponse(response);
      });
    },
    [city, handleResponse]
  );

  useEffect(() => {
    handleSubmitRef.current = handleSubmit;
  }, [handleSubmit]);

  useEffect(() => {
    // Make the initial API call with the default city
    handleSubmitRef.current({ preventDefault: () => {} });
  }, []);

  return (
    <div className="WeatherApp">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-9">
            <input
              type="search"
              placeholder="Enter a city..."
              className="form-control"
              autoFocus={true}
              onChange={(event) => setCity(event.target.value)}
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
        <>
          <WeatherInfo data={weatherData} />
          <ForecastDisplay city={weatherData.city} />
        </>
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default WeatherApp;
