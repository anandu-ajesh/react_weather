
import "./WeatherApp.css";

import React, { useState } from "react";
import search_icons from "../Assets/search.png";
import humidity_icon from "../Assets/humidity.png";
import wind_icons from "../Assets/wind.png";
import clear_icons from "../Assets/clear.png";
import cloud_icons from "../Assets/cloud.png";
import drizzle_icons from "../Assets/drizzle.png";
import rain_icons from "../Assets/rain.png";
import snow_icons from "../Assets/snow.png";

const WeatherApp = () => {
    const api_key = "053861d0a83244d9b5f943c76eb3013b";
    const [icon, setIcon] = useState(clear_icons);

    const search = async () => {
        const element = document.getElementsByClassName("city-input")[0];
        if (!element || element.value === "") {
            return;
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element.value}&units=Metric&appid=${api_key}`;
        try {
            let response = await fetch(url);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            let data = await response.json();

            const humidity = document.getElementsByClassName('humidity-percent')[0];
            const wind = document.getElementsByClassName('wind-speed')[0];
            const temperature = document.getElementsByClassName('weather-temp')[0];
            const location = document.getElementsByClassName('weather-location')[0];
            humidity.innerHTML = data.main.humidity + "% ";
            wind.innerHTML = data.wind.speed + " km/h";
            temperature.innerHTML = data.main.temp + '&#8451'; //Kel
            location.innerHTML = data.name;

            if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
                setIcon(clear_icons)
            }
            else if (data.weather[0].icon === "02d" || data.weather[0].icon === "02n") {
                setIcon(cloud_icons)
            }
            else if (data.weather[0].icon === "03d" || data.weather[0].icon === "03n") {
                setIcon(drizzle_icons)
            }
            else if (data.weather[0].icon === "04d" || data.weather[0].icon === "04n") {
                setIcon(drizzle_icons)
            }
            else if (data.weather[0].icon === "09d" || data.weather[0].icon === "09n") {
                setIcon(rain_icons)
            }
            else if (data.weather[0].icon === "10d" || data.weather[0].icon === "10n") {
                setIcon(rain_icons)
            }
            else if (data.weather[0].icon === "13d" || data.weather[0].icon === "13n") {
                setIcon(snow_icons)
            }
            else {
                setIcon(clear_icons)
            }
        } catch (error) {
            console.error("There was a problem with the fetch operation:", error);
        }
    }

    return (
        <div className="container">
            <div className="top-bar">
                <input type="text" className="city-input" placeholder="search" />
                <div className="search-icon" onClick={() => { search() }}>
                    <img src={search_icons} alt="search" />
                </div>
            </div>
            <div className="weather-image">
                <img src={icon} alt="cloud" />
            </div>
            <div className="weather-temp">24°C</div>
            <div className="weather-location">London</div>
            <div className="data-container">
                <div className="element">
                    <img src={humidity_icon} alt="humidity" className="icon" />
                    <div className="data">
                        <div className="humidity-percent">60%</div>
                        <div className="text">Humidity</div>
                    </div>
                </div>
                <div className="element">
                    <img src={wind_icons} alt="wind" className="icon" />
                    <div className="data">
                        <div className="wind-speed">18 km/h</div>
                        <div className="text">Wind Speed</div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default WeatherApp;
