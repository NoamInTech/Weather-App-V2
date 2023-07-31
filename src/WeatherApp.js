import React, { useState, useEffect, useRef, useCallback } from "react";
import WeatherInfo from "./Current Weather/WeatherInfo";
import ForecastApi from "./Forecast/ForecastApi";
import Timezone from "./Current Weather/Timezone";
import axios from "axios";
import "./WeatherApp.css";

function formatDate(timeString) {
  const date = new Date(timeString);
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  };
  return date
    .toLocaleString("en-US", options)
    .replace(" at", ",")
    .trim();
}

export default function WeatherApp(props) {
  const [weatherData, setWeatherData] = useState({ ready: false });
  const [city, setCity] = useState(props.defaultCity);
  const [time, setTimeData] = useState(null);
  const handleSubmitRef = useRef(null);

  const handleResponse = useCallback(
    (response) => {
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
    },
    [city]
  );

  async function getAndLogCurrentTime(city) {
    try {
      const currentTimeConstant = await Timezone(city);
      setTimeData(currentTimeConstant);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
      let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
      axios.get(apiUrl).then((response) => {
        handleResponse(response);
      });
    },
    [city, handleResponse]
  );

  // Assign the handleSubmit function to the ref
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
              autoFocus="on"
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
        <React.Fragment>
          <WeatherInfo data={weatherData} />
          <ForecastApi city={weatherData.city} />
        </React.Fragment>
      ) : (
        "Loading..."
      )}
    </div>
  );
}
