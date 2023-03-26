function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;
  let descElement = document.querySelector("#desc");
  descElement.innerHTML = response.data.condition.description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.temperature.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
}

let apiKey = "b6c11b300o5f402a9bd26174tc9f8161";
let apiURL = `https://api.shecodes.io/weather/v1/current?query=Reading&key=${apiKey}&units=metric`;

axios.get(apiURL).then(displayTemperature);
