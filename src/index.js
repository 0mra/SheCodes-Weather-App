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

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let currentDate = document.querySelector(".date");
currentDate.innerHTML = `${day}, ${month} ${date}, ${year}`;
let currentTime = document.querySelector(".time");
currentTime.innerHTML = `Last updated: ${hours}:${minutes}`;

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

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `              <div class="col">
                <div class="day">${day}</div>
                <div class="emoji">🌤</div>
                <div class="temp">21° | 11°</div>
              </div>
            `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function showTemperature(response) {
  let city = response.data.name;
  let cityName = document.querySelector(".city");
  let description = response.data.weather[0].description;
  let descriptionElement = document.querySelector("#description");
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector(".current-temp");
  let tempMessage = `${temperature}°C`;
  let wind = response.data.wind.speed;
  let windSpeed = document.querySelector(".wind");
  let windMessage = `Wind: ${wind} km/h`;
  let humidity = response.data.main.humidity;
  let currentHumidity = document.querySelector(".humidity");
  let humidityMessage = `Humidity: ${humidity}%`;
  feels = response.data.main.feels_like;
  let feelsLike = document.querySelector(".feels");
  let feelsTemp = Math.round(feels);
  let iconElement = document.querySelector("#icon");

  cityName.innerHTML = city;
  descriptionElement.innerHTML = description;
  currentTemp.innerHTML = tempMessage;
  windSpeed.innerHTML = windMessage;
  currentHumidity.innerHTML = humidityMessage;
  feelsLike.innerHTML = `Feels like: ${feelsTemp}°C`;
  celsius = response.data.main.temp;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function showPosition(position) {
  let apiKey = "3befe0a338caeea10bbbcf2339b136d4";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentPosition(event) {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let locationButton = document.querySelector(".location-btn");
locationButton.addEventListener("click", getCurrentPosition);

let apiKey = "3befe0a338caeea10bbbcf2339b136d4";
let units = "metric";
let city = "Poznań";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
axios.get(apiUrl).then(showTemperature);
let temp = true;

function changeUnitF() {
  let currentTemp = document.querySelector(".current-temp");
  let fahrenheit = Math.round((celsius * 9) / 5 + 32);
  currentTemp.innerHTML = `${fahrenheit}°F`;
  fahrenheitButton.innerHTML = "°C";
  let feelsLike = document.querySelector(".feels");
  let feelsTemp = Math.round((feels * 9) / 5 + 32);
  feelsLike.innerHTML = `Feels like: ${feelsTemp}°C`;
}

function changeUnitC() {
  let currentTemp = document.querySelector(".current-temp");
  let celsiusTemp = Math.round(celsius);
  currentTemp.innerHTML = `${celsiusTemp}°C`;
  fahrenheitButton.innerHTML = "°F";
  let feelsLike = document.querySelector(".feels");
  let feelsTemp = Math.round(feels);
  feelsLike.innerHTML = `Feels like: ${feelsTemp}°C`;
}

function changeUnit(event) {
  event.preventDefault();
  if (temp) changeUnitF();
  else changeUnitC();
  temp = !temp;
}

let celsius = null;
let feels = null;

let fahrenheitButton = document.querySelector(".unit");
fahrenheitButton.addEventListener("click", changeUnit);

displayForecast();
