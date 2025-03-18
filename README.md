# React Weather App

This is a React-based weather application that provides current weather and forecast information for cities around the world. It features a clean, responsive design with light and dark theme support, and displays detailed weather data including temperature, humidity, wind speed, and sunrise/sunset times.

## Features

- **Current Weather:** Displays real-time weather information for a searched city, including temperature, conditions, and detailed metrics.
- **Hourly Forecast:** Shows the weather forecast for the next 24 hours in 3-hour intervals.
- **7-Day Forecast:** Provides a weekly forecast with daily high and low temperatures and weather conditions.
- **Theme Toggle:** Allows users to switch between light and dark themes for optimal viewing.
- **Unit Toggle:** Enables users to switch between metric (°C) and imperial (°F) temperature units.
- **Search Functionality:** Users can search for any city to get its weather information.
- **Persistent Data:** Remembers the last searched city and user's theme preference using local storage.
- **Responsive Design:** Works seamlessly across various devices, including desktops, tablets, and mobile phones.
- **Error Handling:** Displays user-friendly error messages for invalid city searches or API failures.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (>=12.0.0)
- npm (>=6.0.0)

### Installation

1.  Clone the repository:

    ```bash
    git clone [https://github.com/skrnjoshi/skrn-weather.git](https://github.com/skrnjoshi/skrn-weather.git)
    ```

2.  Navigate to the project directory:

    ```bash
    cd skrn-weather
    ```

3.  Install dependencies:

    ```bash
    npm install
    ```

4.  Obtain an API key from [OpenWeatherMap](https://openweathermap.org/api).
5.  Replace `YOUR_API_KEY` with your actual OpenWeatherMap API key in `src/App.js`:

    ```javascript
    const API_KEY = "YOUR_API_KEY";
    ```

### Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Deployment

This app is deployed on Firebase Hosting. To deploy your own version, follow the Firebase deployment instructions.

1.  Install the Firebase CLI:

    ```bash
    npm install -g firebase-tools
    ```

2.  Login to Firebase:

    ```bash
    firebase login
    ```

3.  Initialize Firebase in your project directory:

    ```bash
    firebase init
    ```

4.  Follow the prompts to set up hosting.

5.  Build the project:

    ```bash
    npm run build
    ```

6.  Deploy to Firebase Hosting:

    ```bash
    firebase deploy --only hosting
    ```

You can view the deployed application at: [https://skrn-weather.web.app/](https://skrn-weather.web.app/)

## Technologies Used

- React
- OpenWeatherMap API
- Lucide React (icons)
- CSS (with custom theming)
- Local Storage

## Contributing

Contributions are welcome! If you have suggestions for improvements or find any issues, please open an issue or submit a pull request.

## License

This project is open-source and available under the [MIT License](LICENSE).
