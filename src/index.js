// Get current datetime and format
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

// Assign days of week to timestamps
function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  return days[day];
}

// Display forecast
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
            <div class="col-2">
              <div class="day">${formatForecastDay(forecastDay.time)}</div>
              <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
                forecastDay.condition.icon
              }.png" alt="${forecastDay.condition.icon}" width="56" />
              <div class="weatherForecastTemp">
                <span class="weatherForecastMax">${Math.round(
                  forecastDay.temperature.maximum
                )}°</span>
                <span class="weatherForecastMin">${Math.round(
                  forecastDay.temperature.minimum
                )}°</span>
              </div>
          </div>`;
    }
  });
  forecastHTML = forecastHTML + "</div>";
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(city) {
  console.log(city);
  let apiKey = "b6c11b300o5f402a9bd26174tc9f8161";
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayForecast);
}

// Get temp and weather for city and update innerHTML
function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;
  let descElement = document.querySelector("#desc");
  descElement.innerHTML = response.data.condition.description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.temperature.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.time * 1000);
  let iconElement = document.querySelector("#weather-icon");
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", response.data.condition.description);
  celsiusTemp = response.data.temperature.current;

  getForecast(response.data.city);
}

function search(city) {
  let apiKey = "b6c11b300o5f402a9bd26174tc9f8161";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  search(cityInput.value);
}

//Convert units between Fahrenheit and Celsius
// function displayFahrenheitTemp(event) {
//   event.preventDefault();
//   let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
//   let temperatureElement = document.querySelector("#temperature");
//   temperatureElement.innerHTML = Math.round(fahrenheitTemp);
//   celsiusLink.classList.remove("active");
//   fahrenheitLink.classList.add("active");
// }

// function displayCelsiusTemp(event) {
//   event.preventDefault();
//   let temperatureElement = document.querySelector("#temperature");
//   temperatureElement.innerHTML = Math.round(celsiusTemp);
//   celsiusLink.classList.add("active");
//   fahrenheitLink.classList.remove("active");
// }

let celsiusTemp = null;

let form = document.querySelector("#form");
form.addEventListener("submit", handleSubmit);

// let fahrenheitLink = document.querySelector("#fahrenheit-link");
// fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

// let celsiusLink = document.querySelector("#celsius-link");
// celsiusLink.addEventListener("click", displayCelsiusTemp);

search("Reading");
