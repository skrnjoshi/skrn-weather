// Utility functions for weather data processing

export const getWeatherIcon = (condition) => {
  switch (condition.toLowerCase()) {
    case "sunny":
      return "☀️";
    case "cloudy":
      return "☁️";
    case "rainy":
      return "🌧️";
    case "partly cloudy":
      return "⛅";
    case "thunderstorm":
      return "⛈️";
    default:
      return "🌤️";
  }
};

export const getTemperatureClass = (temperature) => {
  if (temperature < 10) return "cold";
  if (temperature < 20) return "mild";
  return "hot";
};
