import React, { useState } from "react";
import SearchForm from "./SearchForm";
import CurrentWeather from "./CurrentWeather";
import Forecast from "./Forecast";
import { fetchWeatherData } from "../services/weatherService";
import "../styles/WeatherApp.css";

const WeatherApp = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (searchQuery) => {
    setQuery(searchQuery);
    setLoading(true);
    setError("");

    try {
      const { currentWeather, forecastData } = await fetchWeatherData(
        searchQuery
      );
      setWeather(currentWeather);
      setForecast(forecastData);
      setLoading(false);
    } catch (err) {
      setError("Error fetching weather data. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="weather-container">
        <h1 className="app-title">Weather App</h1>

        <SearchForm onSearch={handleSearch} />

        {loading && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
          </div>
        )}

        {error && <div className="error-message">{error}</div>}

        {weather && !loading && <CurrentWeather weather={weather} />}

        {forecast.length > 0 && !loading && <Forecast forecast={forecast} />}
      </div>
    </div>
  );
};

export default WeatherApp;
