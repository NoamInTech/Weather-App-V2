import React, { useState } from "react";

const TemperatureConversion = ({ celsius }) => {
  const [unit, setUnit] = useState("celsius");

  const temperature =
    unit === "celsius" ? Math.round(celsius) : Math.round((celsius * 9) / 5 + 32);

  const toggleUnit = (event, targetUnit) => {
    event.preventDefault();
    setUnit(targetUnit);
  };

  return (
    <div className="TemperatureConversion">
      <span className="temperature">{temperature}</span>
      <span className="unit">
        <a href="/" onClick={(e) => toggleUnit(e, "celsius")}>
          °C
        </a>{" "}
        |{" "}
        <a href="/" onClick={(e) => toggleUnit(e, "fahrenheit")}>
          °F
        </a>
      </span>
    </div>
  );
};

export default TemperatureConversion;
