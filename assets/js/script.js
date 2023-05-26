var APIKey = "fab2608a114a274611d372fde5a01b93";
var cityInput = document.querySelector("#city-search");
var searchForm = document.querySelector("#search-form");
var currentConditions = document.querySelector("#current-forecast");
var previousCities = document.querySelector("#search-history");
var previousContainer = document.querySelector("#search-history .card-body");
var dailyContainer = document.querySelector("#daily-forecast");
var fiveDayHeader = document.querySelector("#forecastHeader");
var cities = [];

function loadCities() {
  var citiesSearched = localStorage.getItem("cities")
  if (!citiesSearched) {
    return false;
  }
  citiesSearched = JSON.parse(citiesSearched);

  for (var i=0; i < citiesSearched.length; i++) {
    displayCitySearches(citiesSearched[i])
    cities.push(citiesSearched[i])
  }
}

function storeCities() {
  localStorage.setItem("cities", JSON.stringify(cities));
}

function displayCitySearches(city) {
  var searchCardEl = document.createElement("div");
  searchCardEl.setAttribute("class", "card");
  var searchCardTitleEl = document.createElement("div");
  searchCardTitleEl.setAttribute("class", "card-body searched-city");
  searchCardTitleEl.textContent = city;

  searchCardEl.appendChild(searchCardTitleEl)

  searchCardEl.addEventListener("click", function() {
    getCityData(city)
  });

  previousCities.appendChild(searchCardEl)
}


function displayWeather (city, data) {
  console.log(data)
  var temp = Math.round(data.temp);
  var humidity = Math.round(data.humidity);
  var wind = data.speed;
  var iconSource = data.icon;

  currentConditions.textContent = "";
  currentConditions.setAttribute("class", "col-10 text-center")
  var divCityHeader = document.createElement("div");
  var headerCityDate = document.createElement("h2");
  var currentDate = dayjs().format("MM/DD/YYYY");
  var icon = document.createElement("img");
  icon.setAttribute('src', "")
  icon.setAttribute('src', "https://openweathermap.org/img/wn/" + iconSource + "@2x.png")
  headerCityDate.textContent = city + " (" + currentDate + ")";

  divCityHeader.appendChild(headerCityDate)
  divCityHeader.appendChild(icon)
  currentConditions.appendChild(divCityHeader)

  var divCurrent = document.createElement("div")
  var currentTemp = document.createElement("p");
  var humidity = document.createElement("p");
  var wind = document.createElement("p");

  currentTemp.appendChild(currentConditions)
  humidity.appendChild(currentConditions)
  wind.appendChild(currentConditions)

  currentTemp.textContent = "Temperature: " + temp + "°F";
  humidity.textContent = "Humidity: " + humidity + "%";
  wind.textContent = "Wind Speed: " + wind + " MPH";

  divCurrent.appendChild(currentTemp);
  divCurrent.appendChild(humidity);
  divCurrent.appendChild(wind);

  currentConditions.appendChild(divCurrent);
}

function displayForecast(data) {
  console.log(data)
  dailyContainer.textContent = "";
  // fiveDayHeader.textContent = "5-Day Forecast:"

  for (var i = 0; i < 5; i++ ) {
    var tempForecast = Math.round(data.list[i].main.temp);
    var humidityForecast = data.list[i].humidity;
    var iconForecast = data.list[i].icon;

    var cardEl = document.createElement("div");
    cardEl.setAttribute("class", "card col-md-5 col-sm-10 bg-primary text-white text-center");
    
    var cardBodyEl = document.createElement("h5");
    cardBodyEl.setAttribute("class", "card-body"); 

    var cardDateEl = document.createElement("div");
    cardDateEl.textContent = dayjs().add(i, "days").format("MM/DD/YYYY");

    var cardIconEl = document.createElement("img");
    cardIconEl.setAttribute("src", "https://openweathermap.org/img/wn/" + iconForecast + "@2x.png");

    var cardTempEl = document.createElement("p");
    cardTempEl.setAttribute("class", "card-text");
    cardTempEl.textContent = "Temperature: " + tempForecast + "°F";

    var cardHumidEl = document.createElement("p");
    cardHumidEl.setAttribute("class", "card-text");
    cardHumidEl.textContent = "Humidity: " + humidityForecast + "%";

    cardBodyEl.appendChild(cardDateEl)
    cardBodyEl.appendChild(cardIconEl)
    cardBodyEl.appendChild(cardTempEl)
    cardBodyEl.appendChild(cardHumidEl)

    cardEl.appendChild(cardBodyEl);
    dailyContainer.appendChild(cardEl);

    searchForm.reset()
  }
};

function getCityData(city) {
  event.preventDefault();

  var cityURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKey;

  fetch(cityURL).then(function (response) {
    if (response.ok) {
      response.json().then(function(data) {
        console.log(data);

  var cityName = data.name;
  var lat = data.coord.lat;
  var lon = data.coord.lon;
  
  var previousCity = cities.includes(cityName)
  if (!previousCity) {
     cities.push(cityName)
     storeCities()
     displayCitySearches(cityName)
  }
  getWeather(cityName, lat, lon);
  });

  } else {
    alert("Invalid Entry. Please Try Again!")
    searchForm.reset() 
  } 
  });
};

function getWeather(city, lat, lon) {
  var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&units=imperial";
  fetch(forecastURL).then(function(response) {
    response.json().then(function(data) {
      console.log(data);
    
    displayWeather(city, data);
    displayForecast(data);
    });
  });
};

loadCities()

searchForm.addEventListener("submit", function() {
  citySearch = cityInput.value.trim();
  getCityData(citySearch);
})




