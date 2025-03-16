import React from "react";
import { getWeatherIcon, getTemperatureClass } from "../utils/weatherUtils";
import "../styles/CurrentWeather.css";

const CurrentWeather = ({ weather }) => {
  return (
    <div className={`weather-card ${getTemperatureClass(weather.temperature)}`}>
      <div className="weather-header">
        <div className="city-info">
          <h2 className="city-name">{weather.city}</h2>
          <p className="date">{weather.date}</p>
        </div>
        <div className="weather-icon">{getWeatherIcon(weather.condition)}</div>
      </div>

      <div className="current-weather">
        <div className="temperature">{weather.temperature}°C</div>
        <div className="condition">{weather.condition}</div>
      </div>

      <div className="weather-details">
        <div className="detail-item">
          <p className="detail-label">Humidity</p>
          <p className="detail-value">{weather.humidity}%</p>
        </div>
        <div className="detail-item">
          <p className="detail-label">Wind</p>
          <p className="detail-value">{weather.windSpeed} km/h</p>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
