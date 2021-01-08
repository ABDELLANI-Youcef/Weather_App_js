import './style.css';


const resultsShow = document.querySelector('#results');
const cityName = document.querySelector('#city_name');
const img = document.querySelector('#weather_img');
const temperatureC = document.querySelector('#temperatureC');
const temperatureF = document.querySelector('#temperatureF');
const weather = document.querySelector('#weather');
const humidity = document.querySelector('#humidity');
const windSpeed = document.querySelector('#wind_speed');
const windDirection = document.querySelector('#wind_direction');
const errMessage = document.querySelector('#error_message');
const directions = ['North', 'North-east', 'East', 'South-east', 'South', 'South-west', 'West', 'North-west'];
const btnText = ['Fahrenheit degree', 'Celsius degree'];
let btnIndex = 0;

const degCelToFeh = (deg) => ((deg * 9) / 5 + 32).toFixed(1);

const getPicture = async (theme) => {
  try {
    const response = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=2EwOKoQXnNF8ez8G3i67obeO2o5TT7EN&s=${theme}`, { mode: 'cors' });
    const weatherImgData = await response.json();
    img.src = weatherImgData.data.images.original.url;
  } catch (error) {
    img.src = '#';
  }
};

const getWeather = async (place) => {
  try {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${place}&APPID=6e34ebc8632e3e43ecefd3953c9f8c70`, { mode: 'cors' });
    const weatherData = await response.json();
    const state = weatherData.weather[0].main;
    const tempDegree = (weatherData.main.temp - 273.15).toFixed(1);
    getPicture(state);
    resultsShow.style.display = 'block';
    cityName.textContent = place;
    weather.textContent = state;

    temperatureC.textContent = `${tempDegree}°C`;
    temperatureF.textContent = `${degCelToFeh(tempDegree)}°F`;
    humidity.textContent = weatherData.main.humidity;
    windSpeed.textContent = `${(weatherData.wind.speed * 3.6).toFixed(2)}`;
    const d = (((weatherData.wind.deg + 360 - 22.5) / 45) % 8).toFixed(0);
    windDirection.textContent = directions[d];
    errMessage.style.display = 'none';
  } catch (error) {
    errMessage.style.display = 'block';
  }
};

const form = document.querySelector('#town_form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const town = document.querySelector('#town_name').value;
  getWeather(town);
});

const tempBtn = document.querySelector('#switchTemp');
const toggleTemp = () => {
  temperatureC.classList.toggle('fahranheit_mode');
  temperatureF.classList.toggle('fahranheit_mode');
  btnIndex = 1 - btnIndex;
  tempBtn.textContent = btnText[btnIndex];
};

tempBtn.addEventListener('click', toggleTemp);