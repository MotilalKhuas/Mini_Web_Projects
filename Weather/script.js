"use strict"

const API_KEY = "9631287053ce83f36cd0a0ef5b0b4302";

let city = "Bhubaneswar";
let current_weather_url = "https://api.openweathermap.org/data/2.5/weather?q=";

function fillCurrentWeatherData(weatherData){
    const TEMP = document.querySelector("#current-temp");
    const STATUS = document.querySelector("#weather-status");
    const DATE = document.querySelector("#current-date");
    const LOC = document.querySelector("#current-location");

    const PARTICULATE_MATTER = document.querySelector("#particulate-matter-val");
    const SULFUR_DIOXIDE = document.querySelector("#sulfur-dioxide-val");
    const NITROGEN_DIOXIDE = document.querySelector("#nitrogen_dioxide-val");
    const OZONE = document.querySelector("#ozone-val");
    const SUNRISE_TIME = document.querySelector("#sunrise-time");
    const SUNSET_TIME = document.querySelector("#sunset-time");
    const HUMIDITY = document.querySelector("#humidity-val");
    const PRESSURE = document.querySelector("#pressure-val");
    const VISIBILITY = document.querySelector("#visibility-val");
    const FEELS_LIKE_TEMP = document.querySelector("#feels-like-temp");

    const today = new Date();
    const date_str = `${today.toLocaleDateString('en-US', { weekday: 'long' })} ${today.getDate()}, ${today.toLocaleDateString('en-US', { month: 'long' })}`;
    const sunrise = new Date(weatherData.sys.sunrise * 1000);
    const sunset = new Date(weatherData.sys.sunset * 1000);
    
    TEMP.innerHTML = `<p>${Math.round(weatherData.main.temp)}<sup>&deg;C</sup></p>
                      <img src="./Assets/${weatherData.weather[0].icon}.png" alt="${weatherData.weather[0].description} icon">`;
    
    STATUS.innerHTML =  `<p>${weatherData.weather[0].description}</p>`

    DATE.innerHTML = `<i class="fa-regular fa-calendar"></i>
                      <p><time datetime="${today.toISOString().split('T')[0]}">${date_str}</time></p>`;

    LOC.innerHTML = `<i class="fa-solid fa-location-dot"></i>
                          <p>${weatherData.name}, ${weatherData.sys.country}</p>`;
    

    SUNRISE_TIME.innerHTML = `${sunrise.getHours()} : ${sunrise.getMinutes()} <span class="highlight-matrices-units">am</span>`;
    SUNSET_TIME.innerHTML = `${sunset.getHours() % 12} : ${sunrise.getMinutes()} <span class="highlight-matrices-units">pm</span>`;
    HUMIDITY.innerHTML = `${weatherData.main.humidity}<span class="highlight-matrices-units"> %</span>`;
    PRESSURE.innerHTML = `${weatherData.main.pressure}<span class="highlight-matrices-units"> hPa</span>`;
    VISIBILITY.innerHTML = `${Math.round(weatherData.visibility / 1000)}<span class="highlight-matrices-units"> Km</span>`
    FEELS_LIKE_TEMP.innerHTML = `${Math.round(weatherData.main.feels_like)}<sup>&deg;<span>C</span></sup>`;
}





async function getTodayWeatherData(loc, API_KEY){
    let weather_response = await fetch(`${current_weather_url}${loc}&appid=${API_KEY}&units=metric`)
    let json_weather_data = await weather_response.json();
    console.log(json_weather_data);

    // let air_quality_response = await fetch(`${air_quality_url}`)

    if(json_weather_data.cod === 200){
        fillCurrentWeatherData(json_weather_data);
    }
}

getTodayWeatherData(city, API_KEY);