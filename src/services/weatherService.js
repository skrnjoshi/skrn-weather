// This would normally connect to a real weather API
// For demo purposes, we're using mock data

export const fetchWeatherData = (city) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        // Mock current weather data
        const currentWeather = {
          city: city,
          temperature: Math.floor(Math.random() * 30) + 5,
          condition: [
            "Sunny",
            "Cloudy",
            "Rainy",
            "Partly Cloudy",
            "Thunderstorm",
          ][Math.floor(Math.random() * 5)],
          humidity: Math.floor(Math.random() * 50) + 30,
          windSpeed: Math.floor(Math.random() * 20) + 1,
          date: new Date().toLocaleDateString(),
        };

        // Mock forecast data
        const forecastData = Array(5)
          .fill()
          .map((_, index) => {
            const date = new Date();
            date.setDate(date.getDate() + index + 1);

            return {
              date: date.toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              }),
              temperature: Math.floor(Math.random() * 30) + 5,
              condition: [
                "Sunny",
                "Cloudy",
                "Rainy",
                "Partly Cloudy",
                "Thunderstorm",
              ][Math.floor(Math.random() * 5)],
            };
          });

        resolve({ currentWeather, forecastData });
      } catch (err) {
        reject(err);
      }
    }, 1000);
  });
};
