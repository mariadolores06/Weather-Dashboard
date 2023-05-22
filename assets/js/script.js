var APIKey = "fab2608a114a274611d372fde5a01b93";
var cityInput = document.querySelector("#city-search");
var searchForm = document.querySelector("#search-form");
var searchBtn = document.querySelector("#searchBtn");
var previousCities = document.querySelector("#search-history");
var currentWeather = document.querySelector("#todays-weather");
var cityDate = document.querySelector("#date");
var temp = document.querySelector("#temp");
var wind = document.querySelector("#wind");
var humid = document.querySelector("#humid");
var icon = document.querySelector("#icon");

var today= dayjs().format("dddd MMMM DD, YYYY");
var cityNames = JSON.parse(localStorage.getItem("searchHistory"))

var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&units=imperial" + "&APPID=" + APIKey;
var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityInput + "&units=imperial" + "&APPID=" + APIKey;

searchBtn.on("click", getCityName);
previousCities.on("click", getCityNameFromSearchHistory);

