let now = new Date();

let mainDay = document.querySelector(".day");

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
let number = now.getDate();

mainDay.innerHTML = `${day}, ${number}th `;

let currentDate = document.querySelector(".date");

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

let myTime = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

let month = months[now.getMonth()];

currentDate.innerHTML = `${month}, ${myTime}`;

function searchCity(city) {
	let apiKey = "f93674534fd7bbf098e9c23dbb1ce46d";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
	axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
	event.preventDefault();

	let city = document.querySelector("#search-city").value;
	searchCity(city);
}

//todo empieza aca abajo

let form = document.querySelector(".input-form");

form.addEventListener("submit", handleSubmit);

function convertFahrenheit(event) {
	event.preventDefault();
	let temperatureElement = document.querySelector("#temperature");

	temperatureElement.innerHTML = 66;
}

function convertCelsius(event) {
	event.preventDefault();
	let temperatureElement = document.querySelector("#temperature");
	temperatureElement.innerHTML = 17;
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertFahrenheit);

let CelsiusLink = document.querySelector("#celsius-link");
CelsiusLink.addEventListener("click", convertCelsius);

function displayWeatherCondition(response) {
	document.querySelector(".city").innerHTML = response.data.name;
	document.querySelector(".temperature").innerHTML = Math.round(
		response.data.main.temp
	);
	document.querySelector("#description").innerHTML =
		response.data.weather[0].description;
	document.querySelector("#feels-like").innerHTML = Math.round(
		response.data.main.feels_like
	);
	document.querySelector("#humidity").innerHTML = response.data.main.humidity;
}

function searchLocation(position) {
	let apiKey = "f93674534fd7bbf098e9c23dbb1ce46d";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
	axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
	event.preventDefault();
	navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector(".currentLocationButton");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("New York");
