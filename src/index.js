let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let month = months[now.getMonth()];

let date = now.getDate();

let year = now.getFullYear();

let heading = document.querySelector("h1");
heading.innerHTML = ` ${day}, ${month} ${date}, ${year}`;

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let currentTime = document.querySelector(".time");
currentTime.innerHTML = `${hours}:${minutes}`;

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  let cityName = document.querySelector(".city");
  cityName.innerHTML = city;
  let apiKey = "3befe0a338caeea10bbbcf2339b136d4";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function showTemperature(response) {
  let city = response.data.name;
  let cityName = document.querySelector(".city");
  cityName.innerHTML = city;
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector(".current-temp");
  let tempMessage = `${temperature}°C`;
  currentTemp.innerHTML = tempMessage;
  let wind = response.data.wind.speed;
  let windSpeed = document.querySelector(".wind");
  let windMessage = `Wind: ${wind} km/h`;
  windSpeed.innerHTML = windMessage;
  let humidity = response.data.main.humidity;
  let currentHumidity = document.querySelector(".humidity");
  let humidityMessage = `Humidity: ${humidity}%`;
  currentHumidity.innerHTML = humidityMessage;
}

function showPosition(position) {
  let apiKey = "3befe0a338caeea10bbbcf2339b136d4";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
  console.log(apiUrl);
}

function getCurrentPosition(event) {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let locationButton = document.querySelector(".location-btn");
locationButton.addEventListener("click", getCurrentPosition);

//function changeUnit(event) {
//event.preventDefault();
//let temp = document.querySelector(".current-temp");

//if (unit.innerHTML === "°F") {
//temp.innerHTML = "66°F";
//unit.innerHTML = "°C";
//} else {
//temp.innerHTML = "19°C";
//unit.innerHTML = "°F";
//}
//}

//let unit = document.querySelector(".unit");

//unit.addEventListener("click", changeUnit);
