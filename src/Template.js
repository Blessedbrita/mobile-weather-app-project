import React, { useState } from "react";
import axios from "axios";
import FormattedDate from "./FormattedDate"

export default function Template() {
    let [city, setCity] = useState(" ");
    let [weather, setWeather] = useState({});
    let [loaded, setLoaded] = useState(false);

    function displayWeather(response) {

        setLoaded(true);
        setWeather({
            date: new Date(response.data.dt * 1000),
            temperature: response.data.main.temp,
            wind: response.data.wind.speed,
            humidity: response.data.main.humidity,
            icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
            description: response.data.weather[0].description,
        });
    }
    function handleSubmit(event) {
        event.preventDefault();
        let apiKey = "0f8bc384a7c31b717a18cfe38a95ae06";
        let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        axios.get(apiUrl).then(displayWeather);
    }

    function updateCity(event) {
        setCity(event.target.value);
    }

    let form = (
        <form onSubmit={handleSubmit}>
            <input
                type="search"
                placeholder="Enter a city.."
                className="search-bar"
                onChange={updateCity}
            />
            <button type="Submit" className="submit">
                Search
            </button>
        </form>
    );

    if (loaded) {
        return (
            <div>
                <div class="wrapper d-block">
                    {form}
                    <br />
                    <p className="description">{weather.description}</p>
                    <br />
                    <div>
                        <img src={weather.icon} alt={weather.description} className="weather-icon" />
                    </div>
                    <div className="temperature-measure">
                        <h1 className="temperature">
                            <span className="degrees">{Math.round(weather.temperature)}°C</span> | {Math.round((weather.temperature) * 9 / 5) + 32}°F
                        </h1>
                    </div>
                    <br />
                    <div>
                        <p className="date">
                            <FormattedDate date={weather.date} />
                        </p>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-6">
                            <span className="wind-speed">
                                <img src="https://s3.amazonaws.com/shecodesio-production/uploads/files/000/119/174/original/wind.png?1710493063" width="25" />
                                <br />{weather.wind} km/h
                                <br />
                            </span>
                            <span className="weather-description">windspeed</span>
                        </div>
                        <div className="col-6">
                            <span className="humidity">
                                <img src="https://s3.amazonaws.com/shecodesio-production/uploads/files/000/119/173/original/humidity.png?1710492971" width="25" />
                                <br />  {weather.humidity} %
                                <br />
                            </span>
                            <span className="weather-description">humidity</span>
                        </div>
                    </div>
                    <br />
                </div>
            </div>
        )
    } else {
        return (
            <div className="front">
                {form}
            </div>
        )

    }

}