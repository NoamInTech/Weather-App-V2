import React from "react";
import ReactAnimatedWeather from "react-animated-weather";

const codeMapping = {
  "clear-sky-day": "CLEAR_DAY",
  "clear-sky-night": "CLEAR_NIGHT",
  "few-clouds-day": "PARTLY_CLOUDY_DAY",
  "few-clouds-night": "PARTLY_CLOUDY_NIGHT",
  "scattered-clouds-day": "PARTLY_CLOUDY_DAY",
  "scattered-clouds-night": "PARTLY_CLOUDY_NIGHT",
  "broken-clouds-day": "CLOUDY",
  "broken-clouds-night": "CLOUDY",
  "shower-rain-day": "RAIN",
  "shower-rain-night": "RAIN",
  "rain-day": "RAIN",
  "rain-night": "RAIN",
  "thunderstorm-day": "RAIN",
  "thunderstorm-night": "RAIN",
  "snow-day": "SNOW",
  "snow-night": "SNOW",
  "mist-day": "FOG",
  "mist-night": "FOG",
};

const WeatherIcon = ({ code, size }) => (
  <ReactAnimatedWeather
    icon={codeMapping[code]}
    color="#1e1e1e"
    size={size}
    animate={true}
  />
);

export default WeatherIcon;

// Weather icons source: http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png
