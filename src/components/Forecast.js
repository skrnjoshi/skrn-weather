import React from "react";
import { getWeatherIcon } from "../utils/weatherUtils";
import "../styles/Forecast.css";

const Forecast = ({ forecast }) => {
  return (
    <div className="forecast-card">
      <h3 className="forecast-title">5-Day Forecast</h3>
      <div className="forecast-items">
        {forecast.map((day, index) => (
          <div key={index} className="forecast-day">
            <div className="forecast-date">{day.date}</div>
            <div className="forecast-icon">{getWeatherIcon(day.condition)}</div>
            <div className="forecast-temp">{day.temperature}°C</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
