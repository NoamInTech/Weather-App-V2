import React from "react";
import WeatherApp from "./WeatherApp";
import "./App.css";

export default function App() {
  return (
    <div className="App">
      <div className="container">
        <WeatherApp defaultCity="New York" />
        <footer>
          {" "}
          This project was coded by NoamInTech and is{" "}
          <a
            href="https://github.com/NoamInTech/weather-final-app"
            target="_blank"
            rel="noreferrer"
          >
            open-sourced on GitHub
          </a>
          .
        </footer>
      </div>
    </div>
  );
}
