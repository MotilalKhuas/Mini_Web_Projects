"use strict"

const API_KEY = "9631287053ce83f36cd0a0ef5b0b4302";

const CURRENT_WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather?"; //lat={lat}&lon={lon}&appid={API key}
const FUTURE_WEATHER_URL = "https://api.openweathermap.org/data/2.5/forecast?"; // lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric
const AIR_POLUTION_URL = "http://api.openweathermap.org/data/2.5/air_pollution?"; //lat={lat}&lon={lon}&appid={API key}
const GEOENCOADING_URL = "http://api.openweathermap.org/geo/1.0/direct?q="

function fillNowSectionData(current_weather_data){
    const temp = document.querySelector("#current-temp");
    const status = document.querySelector("#weather-status");
    const date = document.querySelector("#current-date");
    const loc = document.querySelector("#current-location");

    const today = new Date();
    const date_str = `${today.toLocaleDateString('en-US', { weekday: 'long' })} ${today.getDate()}, ${today.toLocaleDateString('en-US', { month: 'long' })}`;

    temp.innerHTML = `<p>${Math.round(current_weather_data.main.temp - 273.15)}<sup>&deg;C</sup></p>
                          <img src="./Assets/${current_weather_data.weather[0].icon}.png" alt="${current_weather_data.weather[0].description} icon">`;
        
    status.innerHTML =  `<p>${current_weather_data.weather[0].description}</p>`

    date.innerHTML = `<i class="fa-regular fa-calendar"></i>
                        <p><time datetime="${today.toISOString().split('T')[0]}">${date_str}</time></p>`;

    loc.innerHTML = `<i class="fa-solid fa-location-dot"></i>
                            <p>${current_weather_data.name}, ${current_weather_data.sys.country}</p>`;
}

function fill5dayForecastData(future_weather_data){

    const day_wise_containers = document.querySelector("#forcast-weather-section > .section").children;
    let count = 0;

    for(let i = 7; i <= future_weather_data.list.length; i+=8){
        const elem = day_wise_containers[count++];

        const weather_img_container = elem.querySelector(".future-weather-img");
        const temp_container = elem.querySelector(".future-temp-val");
        const date_container = elem.querySelector(".future-date");
        const day_container = elem.querySelector(".future-day");

        const date = new Date(future_weather_data.list[i].dt * 1000);

        weather_img_container.src = `./Assets/${future_weather_data.list[i].weather[0].icon}.png`;
        temp_container.innerHTML = `${Math.round(future_weather_data.list[i].main.temp)}<sup>&deg;c</sup>`;
        date_container.innerHTML = `${date.getDate()}  ${date.toLocaleDateString('en-US', { month: 'long' })}`;
        day_container.innerHTML = `${date.toLocaleDateString('en-US', { weekday: 'long' })}`;
    }
}

function fillHighlightSectionData(current_weather_data, air_pollution_data){
    const pm2_5 = document.querySelector("#particulate-matter-val");
    const so2 = document.querySelector("#sulfur-dioxide-val");
    const no2 = document.querySelector("#nitrogen_dioxide-val");
    const o3 = document.querySelector("#ozone-val");
    const sunrise_time = document.querySelector("#sunrise-time");
    const sunset_time = document.querySelector("#sunset-time");
    const humidity = document.querySelector("#humidity-val");
    const pressure = document.querySelector("#pressure-val");
    const visibility = document.querySelector("#visibility-val");
    const feels_like_temp = document.querySelector("#feels-like-temp");

    const sunrise = new Date(current_weather_data.sys.sunrise * 1000);
    const sunset = new Date(current_weather_data.sys.sunset * 1000);

    pm2_5.innerHTML = `${air_pollution_data.list[0].components.pm2_5.toFixed(1)}`;
    so2.innerHTML = `${air_pollution_data.list[0].components.so2.toFixed(1)}`;
    no2.innerHTML = `${air_pollution_data.list[0].components.no2.toFixed(1)}`;
    o3.innerHTML = `${air_pollution_data.list[0].components.o3.toFixed(1)}`;

    sunrise_time.innerHTML = `${sunrise.getHours()} : ${sunrise.getMinutes()} <span class="highlight-matrices-units">am</span>`;
    sunset_time.innerHTML = `${sunset.getHours() % 12} : ${sunrise.getMinutes()} <span class="highlight-matrices-units">pm</span>`;
    humidity.innerHTML = `${current_weather_data.main.humidity}<span class="highlight-matrices-units"> %</span>`;
    pressure.innerHTML = `${current_weather_data.main.pressure}<span class="highlight-matrices-units"> hPa</span>`;
    visibility.innerHTML = `${Math.round(current_weather_data.visibility / 1000)}<span class="highlight-matrices-units"> Km</span>`
    feels_like_temp.innerHTML = `${Math.round(current_weather_data.main.feels_like-273.15)}<sup>&deg;<span>C</span></sup>`;
}

async function getCoordinates(loc){
    let response = await fetch(`${GEOENCOADING_URL}${loc}&appid=${API_KEY}`);
    let data = await response.json();
    console.log(data);
    return {lat : data[0].lat, lon : data[0].lon};
}

function liveLocation(){
    return new Promise((resolve, reject)=>{
        navigator.geolocation.getCurrentPosition(
            (position)=>{
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                resolve({lat, lon});
            },
            (error)=>{
                reject(new Error("Failed to get Current Location"));
            }
        );
    })
}

async function loadAllData(lat, lon){
    const urls = [
        `${CURRENT_WEATHER_URL}lat=${lat}&lon=${lon}&appid=${API_KEY}`,
        `${FUTURE_WEATHER_URL}lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
        `${AIR_POLUTION_URL}lat=${lat}&lon=${lon}&appid=${API_KEY}`
       
    ]

    try{
        const responses = await Promise.all(urls.map(url=>fetch(url)));
        const data = await Promise.all(responses.map(response=>response.json()));
        const [current_weather_data, future_weather_data,air_polution_data] = data
        fillNowSectionData(current_weather_data);
        fill5dayForecastData(future_weather_data);
        fillHighlightSectionData(current_weather_data, air_polution_data)
    }
    catch(err){
        console.log(err.message);
    }
}

window.addEventListener("load", async()=>{
    try{
        let loc = await liveLocation();
        loadAllData(loc.lat, loc.lon);
    }
    catch(err){
        console.log(err.message);
    }
});