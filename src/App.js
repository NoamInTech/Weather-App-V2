import React from "react";
import WeatherApp from "./WeatherApp";

import "./styles/App.css";

const App = () => {
  return (
    <div className="App">
      <div className="container">
        <WeatherApp defaultCity="London" />
        <footer>
          {" "}
          This project was coded by{" "}
          <a
            href="https://www.linkedin.com/in/noemiepivin/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Noémie Pivin
          </a>{" "}
          and is{" "}
          <a
            href="https://github.com/NoamInTech/weather-final-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            open-sourced on GitHub
          </a>
          .
        </footer>
      </div>
    </div>
  );
};

export default App;
