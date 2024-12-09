import { useState } from 'react';
import axios from 'axios';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = 'c40704eeb4404dc4390ec6c9dd02d3b7';
  const BASE_URL = 'https://api.openweathermap.org/data/2.5/';

  const fetchWeather = async () => {
    if (city) {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}weather?q=${city}&units=metric&appid=${API_KEY}`);
        setWeather(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[url('https://images.pexels.com/photos/531756/pexels-photo-531756.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover bg-center bg-no-repeat text-white flex items-center justify-center">
      <div className="p-6 max-w-md w-full bg-white text-gray-900 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold mb-4 text-center">Weather App</h1>

        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
          className="w-full p-2 border-b-2 focus:outline-none text-center"
        />
        <button
          onClick={fetchWeather}
          className="mt-4 w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
        >
          {loading ? 'Loading...' : 'Get Weather'}
        </button>

        {weather && (
          <div className="mt-6">
            <h2 className="text-2xl font-bold text-center">{weather.name}, {weather.sys.country}</h2>
            <div className="flex justify-center items-center my-4">
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="weather icon"
                className="w-16 h-16"
              />
              <span className="text-xl font-semibold ml-2">{weather.weather[0].description}</span>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold">Temperature: {weather.main.temp}°C</p>
              <p className="text-lg">Feels like: {weather.main.feels_like}°C</p>
              <p className="text-lg">Humidity: {weather.main.humidity}%</p>
              <p className="text-lg">Wind Speed: {weather.wind.speed} m/s</p>
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500">
                Last updated at: {new Date(weather.dt * 1000).toLocaleTimeString()}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
