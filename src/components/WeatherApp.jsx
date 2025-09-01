import React, { useState } from "react";
import "./weatherApp.css"
function WeatherApp() {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState("");

    const API_KEY = "1e7ed1ab1ef6504af9d31b9ff530631c";

    const handleClick = async () => {
        try {
            setError("");
            const res = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
            );
            if (!res.ok) {
                throw new Error("City not found, Please Enter Valid Country Name");
            }
            const data = await res.json();
            setWeather(data);
        } catch (err) {
            setWeather(null);
            setError(err.message);
        }
    };

    const reset = () => {
        setCity("")
        setWeather("");
        setError("");
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-purple-200">
            <div className="weatherBg rounded-2xl shadow-lg p-6 w-100 text-white">
                {/* Search Bar */}
                <div className="flex items-center gap-2 mb-6">
                    <input
                        type="text"
                        placeholder="Search city here"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="flex-1 px-3 py-2 rounded-xl text-amber-400 font-bold text-lg uppercase"
                    />
                    <button
                        onClick={handleClick}
                        className="bg-white cursor-pointer text-purple-600 px-3 py-2 rounded-xl"
                    >
                        🔍
                    </button>
                </div>

                {/* Weather Info */}
                {error && <p className="text-red-300">{error}</p>}

                {weather && (
                    <div className="text-center">
                        {/* Weather Icon */}
                        <img
                            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                            alt="weather"
                            className="mx-auto"
                        />

                        {/* Temperature */}
                        <h2 className="text-4xl font-bold">{weather.main.temp}°C</h2>
                        <p className="text-xl">{weather.name}</p>

                        {/* Extra Info */}
                        <div className="flex justify-between mt-6 text-sm">
                            <div className="flex flex-col items-center">
                                <span>💧 {weather.main.humidity}%</span>
                                <span>Humidity</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span>🌬 {weather.wind.speed} Km/h</span>
                                <span>Wind Speed</span>
                            </div>
                        </div>
                    </div>
                )}

                {(!weather && !error) ?
                    <p className="text-center text-gray-200">Search for a city 🌍</p> : <div className="flex justify-center"><button onClick={reset} className="btn btn-neutral items-center w-2/4 text-center text-gray-200">Reset</button></div>
                }
            </div>
        </div>
    );
}

export default WeatherApp;
