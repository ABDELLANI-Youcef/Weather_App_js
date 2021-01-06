import './style.css';
let p = document.querySelector('#para');
p.textContent = "hahaha";
//get a picture
const img = document.querySelector("#weather_img");

const getPicture = async (theme)=>{
  const response = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=2EwOKoQXnNF8ez8G3i67obeO2o5TT7EN&s=${theme}`, {mode: 'cors'});
  const weatherImgData = await response.json();
  img.src = weatherImgData.data.images.original.url;
}

const getWeather = async (place)=>{
  // needs pretraitements
  const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${place}&APPID=6e34ebc8632e3e43ecefd3953c9f8c70`, {mode: 'cors'});
  const weatherData = await response.json();
  console.log(weatherData);
}

getPicture("rain");
getWeather('Ain Oussera');
const form = document.querySelector("#town_form");
form.addEventListener('submit',(e)=>{
  e.preventDefault();
  let town = document.querySelector('#town_name').value;
  getWeather(town);
  console.log("aye");
})
console.log('Hello youcef');