function formattedDate(timestamp) {
  // Calculate the date
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

function searchForm(event) {
  event.preventDefault();
  document.querySelector("#heading").innerHTML = document.querySelector(
    "#text-input"
  ).value;
}

function convertToFarenheit(event) {
  event.preventDefault();
  // remove the class of active
  celciusLink.classList.remove("active");
  //add the class of  active;
  farenheitLink.classList.add("active");
  let temperature = document.querySelector("#degree");
  let farenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  temperature.innerHTML = Math.round(farenheitTemperature);
}

function convertToCelsius(event) {
  event.preventDefault();
  celciusLink.classList.add("active");
  farenheitLink.classList.remove("active");
  let temperature = document.querySelector("#degree");
  temperature.innerHTML = celciusTemperature;
}

function showTemperature(response) {
  celciusTemperature = Math.round(response.data.main.temp);
  document.querySelector("#degree").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#heading").innerHTML = response.data.name;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("h3").innerHTML = response.data.weather[0].description;
  document.querySelector("#data").innerHTML = formattedDate(
    response.data.dt * 1000
  );
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function cityName(city) {
  let units = "metric";
  let apiKey = `63319272f90841d507345d8c9d4e1232`;
  let headUrl = `https://api.openweathermap.org/data/2.5/weather?q=`;
  let apiUrl = `${headUrl}${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

function findCity() {
  let city = document.querySelector("#text-input").value;
  cityName(city);
}

function showWheather(response) {
  document.querySelector("#degree").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#heading").innerHTML = response.data.name;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("h3").innerHTML = response.data.weather[0].main;
}

function showPosition(position) {
  let latitude = Math.round(position.coords.latitude);
  let longitude = Math.round(position.coords.longitude);
  let units = "metric";
  let apiKey = `63319272f90841d507345d8c9d4e1232`;
  let headUrl = `https://api.openweathermap.org/data/2.5/weather?`;
  let apiUrl = `${headUrl}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWheather);
}

function showLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let celciusTemperature = null;
document.querySelector("#form").addEventListener("submit", searchForm);

let farenheitLink = document.querySelector("#farenheit");
farenheitLink.addEventListener("click", convertToFarenheit);

let celciusLink = document.querySelector("#celsius");
celciusLink.addEventListener("click", convertToCelsius);

document.querySelector("#current").addEventListener("click", showLocation);

document.querySelector("#form").addEventListener("submit", findCity);

cityName("Paris");
