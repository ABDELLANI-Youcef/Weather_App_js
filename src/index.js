import './style.css';

//get a picture
const img = document.querySelector("#weather_img");
const temperature = document.querySelector("#temperature");
const humidity = document.querySelector("#humidity");
const windSpeed = document.querySelector("#wind_speed");
const windDirection = document.querySelector("#wind_direction");
const directions = ['North','North-east','East','South-east','South','South-west','West','North-west'];


const getPicture = async (theme)=>{
  const response = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=2EwOKoQXnNF8ez8G3i67obeO2o5TT7EN&s=${theme}`, {mode: 'cors'});
  const weatherImgData = await response.json();
  img.src = weatherImgData.data.images.original.url;
}

const getWeather = async (place)=>{
  // needs pretraitements
  const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${place}&APPID=6e34ebc8632e3e43ecefd3953c9f8c70`, {mode: 'cors'});
  const weatherData = await response.json();
  getPicture(weatherData.weather[0].main);
  temperature.textContent =`${(weatherData.main.temp - 273.15).toFixed(2)}°C`; 
  humidity.textContent = weatherData.main.humidity;
  windSpeed.textContent = `${weatherData.wind.speed * 3.6}`;
  let d = (((weatherData.wind.deg + 360 - 22.5)/45)%8).toFixed(0)
  windDirection.textContent = directions[d];

  console.log(weatherData);
}

getPicture("rain");
getWeather('Ain Oussera');
const form = document.querySelector("#town_form");
form.addEventListener('submit',(e)=>{
  e.preventDefault();
  let town = document.querySelector('#town_name').value;
  getWeather(town);
  console.log(town);
})
console.log('Hello youcef');