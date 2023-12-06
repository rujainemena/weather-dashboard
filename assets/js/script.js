var apiKey = "f7ae399b8e597d582a4791021dac9f31";
var titleEl = document.getElementById("title");
var tempEl = document.getElementById("temp");
var windEl = document.getElementById("wind");
var humidityEl = document.getElementById("humidity");
var searchBtn = document.getElementById("search-btn");
var cityInput = document.getElementById("city-input");
var fivedayForecast = document.getElementById("fiveday-forecast");

// search button function
function searchCity() {
  var cityName = cityInput.value;

  displayWeather(cityName);
}

function displayWeather(cityName) {
  // main weather display
  var url =
    "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey + "&units=imperial";

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (currentData) {
      console.log(currentData);
      titleEl.innerHTML =
        currentData.name +
        dayjs.unix(currentData.dt).format(" MM/DD/YYYY") +
        "<img src='https://openweathermap.org/img/wn/" +
        currentData.weather[0].icon +
        "@2x.png'>";
    });

  // 5 day forecast display
  var forecastUrl =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    cityName +
    "&appid=" +
    apiKey +
    "&units=imperial";

  fetch(forecastUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (forecastData) {
      console.log(forecastData);
      //grab every 12pm for each day for 5 days
      var forecastArr = forecastData.list;

      for (let i = 3, j = 1; i < forecastArr.length; i = i + 8, j++) {
        console.log(forecastArr[i]);

        var cardTitle = document.getElementById("card-title" + j);
        console.log("card-title" + j);
        // dynamic city title
        cardTitle.textContent = dayjs.unix(forecastArr[i].dt).format("MM/DD/YYYY ");

        //   dynamic temperature 
        var temp = document.getElementById("temp" + j);
        temp.textContent = forecastArr[i].main.temp;

        // dynamic wind
        var wind = document.getElementById("wind" + j);
        wind.textContent = forecastArr[i].wind.speed;

        // dynamic humidity
        var humidity = document.getElementById("humidity" + j);
        humidity.textContent = forecastArr[i].main.humidity;
      }
    });
}

// event listeners
searchBtn.addEventListener("click", searchCity);
