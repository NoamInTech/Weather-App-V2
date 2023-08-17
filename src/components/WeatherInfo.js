import React from "react";
import WeatherIcon from "./WeatherIcon";
import TemperatureConversion from "./TemperatureDisplay";

const WeatherInfo = ({ data }) => {
  const { city, description, icon, temperature, humidity, wind } = data;

  return (
    <div className="WeatherInfo">
      <h1>{city}</h1>
      <ul>
        <li className="text-capitalize">{description}</li>
      </ul>
      <div className="row mt-3">
        <div className="col-8">
          <div className="d-flex">
            <div>
              <WeatherIcon code={icon} size={52} />
            </div>
            <div>
              <TemperatureConversion celsius={temperature} />
            </div>
          </div>
        </div>
        <div className="col-4">
          <ul>
            <li>Humidity: {humidity}%</li>
            <li>Wind: {wind}km/h</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WeatherInfo;
