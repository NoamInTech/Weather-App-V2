import React from "react";
import WeatherIcon from "../WeatherIcon";
import { temperaturelabel } from "../../utils/Temperature";

const WeatherForecastDay = ({ data }) => {
  const getDayOfWeek = () => {
    const date = new Date(data.time * 1000);
    const day = date.getDay();

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[day];
  };

  return (
    <div>
      <div className="WeatherForecast-day">{getDayOfWeek()}</div>
      <WeatherIcon code={data.condition.icon} size={36} />
      <div className="WeatherForecast-temperatures">
        <span className="WeatherForecast-temperature-max">
          {temperaturelabel(data.temperature.maximum)}
        </span>
        <span className="WeatherForecast-temperature-min">
          {temperaturelabel(data.temperature.minimum)}
        </span>
      </div>
    </div>
  );
};

export default WeatherForecastDay;
