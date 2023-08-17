import React, { useState, useEffect, useCallback } from "react";
import { getApiUrl } from "../../utils/Api";
import ForecastDay from "./ForecastDay";
import axios from "axios";

import "../../styles/Forecast.css";

const ForecastDisplay = ({ city }) => {
  const [forecast, setForecast] = useState([]);

  const handleResponse = useCallback((response) => {
    setForecast(response.data.daily.slice(0, 5));
  }, []);

  useEffect(() => {
    const apiUrl = getApiUrl("forecast", { query: city });

    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        handleResponse(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [city, handleResponse]);

  if (!forecast.length) {
    return null;
  }

  return (
    <div className="WeatherForecast">
      <div className="row">
        {forecast.map((dailyForecast, index) => (
          <div className="col" key={index}>
            <ForecastDay data={dailyForecast} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastDisplay;
