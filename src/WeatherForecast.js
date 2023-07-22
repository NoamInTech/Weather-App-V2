import React, { useState, useEffect, useCallback } from "react";
import WeatherForecastDay from "./WeatherForecastDay";
import "./WeatherForecast.css";
import axios from "axios";

export default function WeatherForecast(props) {
  const [forecastLoaded, setForecastLoaded] = useState(false);
  const [forecast, setForecast] = useState(null);

  const handleResponse = useCallback((response) => {
    setForecast(response.data.daily);
    setForecastLoaded(true);
  }, []);

  const load = useCallback(() => {
    let apiKey = "fe0c30430a61b3c470ofba4b5t0b59e4";
    let city = props.city;
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

    axios
      .get(apiUrl)
      .then((response) => handleResponse(response))
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [props.city, handleResponse]);

  useEffect(() => {
    setForecastLoaded(false);
    load();
  }, [load]);

  if (forecastLoaded) {
    return (
      <div className="WeatherForecast">
        <div className="row">
          {forecast.map(function (dailyForecast, index) {
            if (index < 5) {
              return (
                <div className="col" key={index}>
                  <WeatherForecastDay data={dailyForecast} />
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
    );
  } else {
    return null;
  }
}
