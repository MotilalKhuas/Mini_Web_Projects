"use strict"

const API_KEY = "9631287053ce83f36cd0a0ef5b0b4302";

let city = "Bhubaneswar";
let current_weather_url = "https://api.openweathermap.org/data/2.5/weather?q=";

function fillCurrentWeatherData(data){
    const TEMP = document.querySelector("#current-temp");
    const STATUS = document.querySelector("#weather-status");
    const DATE = document.querySelector("#current-date");
    const LOC = document.querySelector("#current-location");

    TEMP.innerHTML = `<p>${Math.round(data.main.temp)}<sup>o<sub>C</sub></sup></p>
                      <img src="./Assets/${data.weather[0].icon}.png" alt="${data.weather[0].description} icon">`;
    
    STATUS.innerHTML =  `<p>${data.weather[0].description}</p>`

    // const today = new Date();
    // if(DATE.children.length === 1)
    //     DATE.append = `<p><time datetime="${today.toISOString().split('T')[0]}">Tuesday 1, April</time></p>`
    const TODAY = new Date();
    const DATE_STR = `${TODAY.toLocaleDateString('en-US', { weekday: 'long' })} ${TODAY.getDate()}, ${TODAY.toLocaleDateString('en-US', { month: 'long' })}`;
       
    if (DATE.children.length === 1) {
        DATE.append(`<p><time datetime="${TODAY.toISOString().split('T')[0]}">${DATE_STR}</time></p>`);
    }
    
    console.log(DATE.innerHTML);
}

async function getCurrentWeatherData(loc, API_KEY){
    let response = await fetch(`${current_weather_url}${loc}&appid=${API_KEY}&units=metric`)
    let json_data = await response.json();
    console.log(json_data);

    if(json_data.cod === 200){
        fillCurrentWeatherData(json_data);
    }
}

getCurrentWeatherData(city, API_KEY);