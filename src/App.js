import React, { useState, useEffect, useCallback } from "react";
import {
  Sun,
  Moon,
  Search,
  Droplets,
  Wind,
  Sunrise,
  MapPin,
  Thermometer,
  Home,
} from "lucide-react";
import "./App.css";

// Replace with your own API key
const API_KEY = "028e263fca0db67ecf2c6d774fb75d25";

const App = () => {
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState(null);
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("weatherAppTheme");
    return savedTheme || "dark";
  });
  const [unit, setUnit] = useState("metric");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch weather data
  const fetchWeather = useCallback(
    async (searchCity, unitParam = unit) => {
      if (!searchCity) return;

      setLoading(true);
      setError("");

      try {
        // Fetch current weather
        const currentResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&units=${unitParam}&appid=${API_KEY}`
        );

        if (!currentResponse.ok) {
          throw new Error("City not found. Please try again.");
        }

        const currentData = await currentResponse.json();
        setWeather(currentData);

        // Fetch forecast data
        const forecastResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&units=${unitParam}&appid=${API_KEY}`
        );

        if (!forecastResponse.ok) {
          throw new Error("Failed to fetch forecast data");
        }

        const forecastData = await forecastResponse.json();

        // Process hourly forecast data (next 24 hours)
        const hourlyData = forecastData.list.slice(0, 8); // 8 x 3 hours = 24 hours
        setHourlyForecast(hourlyData);

        // Process daily forecast data
        const dailyData = [];
        const dayMap = {};

        forecastData.list.forEach((item) => {
          const date = new Date(item.dt * 1000).toLocaleDateString();
          if (!dayMap[date]) {
            dayMap[date] = {
              date: date,
              dt: item.dt, // Use UNIX timestamp for date parsing
              temp_max: item.main.temp_max,
              temp_min: item.main.temp_min,
              weather: item.weather[0],
            };
          } else {
            // Update temp_max and temp_min for the day
            if (item.main.temp_max > dayMap[date].temp_max) {
              dayMap[date].temp_max = item.main.temp_max;
            }
            if (item.main.temp_min < dayMap[date].temp_min) {
              dayMap[date].temp_min = item.main.temp_min;
            }
          }
        });

        // Convert dayMap to an array of daily data
        const dailyForecast = Object.values(dayMap).slice(0, 7); // 7-day forecast
        setForecast(dailyForecast);

        setCity(searchCity);
        localStorage.setItem("lastCity", searchCity);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching weather data:", err);
      } finally {
        setLoading(false);
      }
    },
    [unit]
  );

  // Load last searched city
  useEffect(() => {
    const lastCity = localStorage.getItem("lastCity");
    if (lastCity) {
      fetchWeather(lastCity, unit); // Pass the current unit
    }
  }, [fetchWeather, unit]);

  // Apply theme to document
  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("weatherAppTheme", theme);
  }, [theme]);

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeather(query);
  };

  // Toggle theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Toggle unit
  const toggleUnit = () => {
    setUnit((prevUnit) => {
      const newUnit = prevUnit === "metric" ? "imperial" : "metric";
      if (city) {
        fetchWeather(city, newUnit); // Pass the new unit to fetchWeather
      }
      return newUnit;
    });
  };

  // Reset
  const handleReset = () => {
    setQuery("");
    setCity("");
    setWeather(null);
    setForecast(null);
    setHourlyForecast(null);
    setError("");
  };

  // Format temperature based on unit
  const formatTemp = (temp) => {
    return `${Math.round(temp)}°${unit === "metric" ? "C" : "F"}`;
  };

  // Format time from UNIX timestamp
  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Get day name
  const getDayName = (timestamp) => {
    const date = new Date(timestamp * 1000); // Convert UNIX timestamp to milliseconds
    if (isNaN(date.getTime())) {
      console.error("Invalid timestamp:", timestamp);
      return "Invalid Date";
    }
    return date.toLocaleDateString([], { weekday: "short" });
  };

  // Get hour
  const getHour = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: "2-digit" });
  };

  return (
    <div className="weather-app">
      {/* Header */}
      <div className="header">
        <h1>Weather Forecast</h1>
        <div className="header-controls">
          <button
            className="icon-button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            className="icon-button"
            onClick={toggleUnit}
            aria-label="Toggle temperature unit"
          >
            <Thermometer size={20} />
            <span className="unit-text">{unit === "metric" ? "°C" : "°F"}</span>
          </button>
          <button
            className="icon-button"
            onClick={handleReset}
            aria-label="Reset"
          >
            <Home size={20} />
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="search-form">
        <div className="search-container">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a city..."
            className="search-input"
            aria-label="Search for a city"
          />
          <button type="submit" className="search-button" aria-label="Search">
            <Search size={20} />
          </button>
        </div>
      </form>

      {/* Error Message */}
      {error && (
        <div className="error-message" role="alert">
          {error}
        </div>
      )}

      {/* Loading State */}
      {loading && <div className="loading-spinner" aria-label="Loading"></div>}

      {/* Weather Content */}
      {weather && !loading && (
        <div className="weather-content">
          {/* Current Weather */}
          <div className="weather-card current-weather">
            <div className="weather-header">
              <div className="location-info">
                <div className="location">
                  <MapPin size={20} />
                  <h2>
                    {weather.name}, {weather.sys.country}
                  </h2>
                </div>
                <p className="date">
                  {new Date().toLocaleDateString([], {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>

              <div className="current-temp">
                <img
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt={weather.weather[0].description}
                />
                <div>
                  <h3 className="temp">{formatTemp(weather.main.temp)}</h3>
                  <p className="condition">{weather.weather[0].description}</p>
                </div>
              </div>
            </div>

            <div className="weather-details">
              <div className="detail-item">
                <div className="detail-label">
                  <Thermometer size={16} />
                  <span>Feels Like</span>
                </div>
                <p>{formatTemp(weather.main.feels_like)}</p>
              </div>

              <div className="detail-item">
                <div className="detail-label">
                  <Droplets size={16} />
                  <span>Humidity</span>
                </div>
                <p>{weather.main.humidity}%</p>
              </div>

              <div className="detail-item">
                <div className="detail-label">
                  <Wind size={16} />
                  <span>Wind</span>
                </div>
                <p>
                  {Math.round(weather.wind.speed)}{" "}
                  {unit === "metric" ? "m/s" : "mph"}
                </p>
              </div>

              <div className="detail-item">
                <div className="detail-label">
                  <Sunrise size={16} />
                  <span>Sun</span>
                </div>
                <p>
                  {formatTime(weather.sys.sunrise)} /{" "}
                  {formatTime(weather.sys.sunset)}
                </p>
              </div>
            </div>
          </div>

          {/* Hourly Forecast */}
          {hourlyForecast && (
            <div className="weather-card">
              <h3 className="section-title">Hourly Forecast</h3>
              <div className="hourly-forecast">
                {hourlyForecast.map((hour, index) => (
                  <div key={index} className="hourly-item">
                    <p className="hour">{getHour(hour.dt)}</p>
                    <img
                      src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`}
                      alt={hour.weather[0].description}
                    />
                    <p className="hourly-temp">{formatTemp(hour.main.temp)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Daily Forecast */}
          {forecast && (
            <div className="weather-card">
              <h3 className="section-title">7-Day Forecast</h3>
              <div className="daily-forecast">
                {forecast.map((day, index) => (
                  <div key={index} className="daily-item">
                    <p className="day">{getDayName(day.dt)}</p>
                    <img
                      src={`https://openweathermap.org/img/wn/${day.weather.icon}.png`}
                      alt={day.weather.description}
                    />
                    <p className="condition">{day.weather.description}</p>
                    <div className="daily-temps">
                      <p className="daily-temp">{formatTemp(day.temp_max)}</p>
                      <p className="daily-temp min">
                        {formatTemp(day.temp_min)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
