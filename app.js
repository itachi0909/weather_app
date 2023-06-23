const apiKey = "8f845328853405f9ff2cbea2ef437596";
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const checkWeatherBtn = document.getElementById('checkWeatherBtn');

const url = (city) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

async function getWeatherByLocation(city) {
    const resp = await fetch(url(city));
    const respData = await resp.json();
    addWeatherToPage(respData);
}

function addWeatherToPage(data) {
    const temp = Ktoc(data.main.temp);
    const weather = document.createElement('div');
    weather.classList.add('weather');
    weather.innerHTML = `
        <h2>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png">
            ${temp}°C
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png">
        </h2>
        <small>${data.weather[0].main}</small>`;
    main.innerHTML = "";
    main.appendChild(weather);
}

function Ktoc(K) {
    return Math.floor(K - 273.15);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = search.value;
    if (city) {
        getWeatherByLocation(city);
    }
});

checkWeatherBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const city = search.value;
    if (city) {
        getWeatherByLocation(city);
    }
});