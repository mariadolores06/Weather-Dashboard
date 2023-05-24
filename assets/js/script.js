var APIKey = "fab2608a114a274611d372fde5a01b93";
var cityInput = document.querySelector("#city-search");
var searchForm = document.querySelector("#search-form");
var currentConditionsUl = document.querySelector("#current-forecast #weatherConditions");
var currentConditionsTitle = document.querySelector("#current-forecast h3");
var previousCities = document.querySelector("#search-history");
var previousContainer = document.querySelector("#search-history .card-body");
var dailyContainer = document.querySelector("#daily-forecast");
var fiveDayHeader = document.querySelector("#forecastHeader");


var cities = [];

// let previousCity = JSON.parse(localStorage.getItem("serchHistory"));

function loadCities() {

}

function storeCities() {

}

function displayCitySearches() {

}


function displayWeather () {

  var currentTemp = Math.round(data.current.temp);
  var humidity = Math.round(data.current.humidity);
  var wind = data.current.wind_speed;
  var iconSource = data.current.weather[0].icon;

  var icon = document.createElement("img");
  icon.setAttribute('src', "")
  icon.setAttribute('src', "https://openweathermap.org/img/wn/" + iconSource + "@2x.png")

  currentConditionsTitle.innerHTML = cityName + " (" + dayjs().format("MM/DD/YYYY") + ") " + icon;
  // append child 

  currentTemp.appendChild(currentConditionsUl)
  humidity.appendChild(currentConditionsUl)
  wind.appendChild(currentConditionsUl)

  currentTemp.textContent = "Temperature: " + temp + "&deg;F" ;
  humidity.textContent = "Humidity: " + humidity + "%";
  wind.textContent = "Wind Speed: " + wind + " MPH";
}

function displayForecast() {

}

function getCityData() {
  var cityURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIkey;

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
  var forecastURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&exclude=minutely,hourly&appid=" + APIkey;

  fetch(forecastURL).then(function(response) {
    response.json().then(function(data) {
      console.log(data);
    
    displayWeather();
    displayForecast();
    });
  });
};

// // Removes any null results stored in localStorage
// if (previousCities!== null) {
//     for (let i = 0; i < previousCities.length; i++) {
//         if (previousCities[i] === null) {
//             previousCities.splice(i, i+1);
//         } else {
//            //publishes previous search buttons
//             localCityArray.push(previousCities[i]);
//         }
//     }
// }

// var updateSearchHistory = () => {
    
//     previousCity = JSON.parse(localStorage.getItem("searchHistory"));

//     var existingButtons = document.querySelectorAll("#search-history button");

//     if (previousCity !== null) {
//         existingButtons.forEach(button => {
//             // Ensures buttons aren't repeated for existing searches
//             for (let i = 0; i < previousCity.length; i++)
//             if (button.dataset.city.includes(previousCity[i])) {
//                 previousCity.splice(i, i + 1);
//             }
//         })
//         for (let i = 0; i < previousCity.length; i++) {
//             const searchButton = document.createElement("button");
//             searchButton.classList.add("m-2", "btn", "btn-light");

//             searchButton.dataset.city = previousCity[i];
//             searchButton.textContent = previousCity[i];
//             searchButton.addEventListener("click", (event) => {
//               urlCoords(event.target.dataset.city);
//             })
//             previousContainer.appendChild(searchButton); 
//         }
//     }
// }


// const updateLocalStorage = (city) => {
//     // Ensures searched city isn't pushed into array (and then localStorage) if city has already been searched
//    
//         updateSearchHistory();
//     }
// }

// const urlCoords  = (city) => {
//     // Creates URL for initial API call to retrieve latitude and longitude of requested city
//     const urlCoords = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=fab2608a114a274611d372fde5a01b93";
//     // Initial fetch to retrieve lat + lon
//     fetch(urlCoords)
//     .then(function (response) {
//         if (!response.ok) {
//             currentConditionsUl.innerHTML = "";
//             currentConditionsTitle.textContent = "Try again!";
//             const errorText = document.createElement("li");
//             errorText.textContent = "City not found.";
//             currentConditionsUl.appendChild(errorText);
//             dailyContainer.innerHTML = "";
//             fiveDayHeader.classList.add("hidden");
//         } else {
//             response.json()
//         .then(function (data) {
//             

//             const weatherURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=fab2608a114a274611d372fde5a01b93&units=imperial";
            
//             // Fetch to retrive current and daily weather info
//             fetch(weatherURL)
//             .then(function (response) {
//                 if (response.ok) {
//                     // Converts API response into json object
//                     response.json()
//             .then(function (data) {
//                 // Creates icon to display current weather status
//                 const icon = ("<img src='https://openweathermap.org/img/w/" + data.current.weather[0].icon + ".png' alt='Weather icon'>");

//                 // Displays city name, weather icon, and current date pulled from moment.js
//                 
//                 const liArray = [];
          
//                 currentConditionsUl.innerHTML = "";

//                 // Creates four list items to hold current weather
//                 for (let i = 0; i < 4; i++) {
//                     const li = document.createElement("li");
//                     li.classList.add("mb-2");
//                     liArray.push(li);
//                 }

//                 // Populates contents of list items with properties of json object
//                 

//                 liArray.forEach(li => {
//                     currentConditionsUl.append(li);
//                 })

//                 let dailyArray = [];

//                 dailyCardContainer.innerHTML = "";

//                 // Loop to populate cards for next 5 days with information from daily openCall property
//                 for (let i = 0; i < 5; i++) {
//                     const dailyCard = document.createElement("div");
               
//                     dailyCard.innerHTML = `
//                     <div class="p-2 m-2 card bg-info text-white">
//                         <h5>${dayjs().add(i + 1, "days").format("MM/DD/YYYY")}</h5>
//                         <ul id="conditions">
//                             <li><img src='https://openweathermap.org/img/w/${data.daily[i].weather[0].icon}.png' alt="Weather icon" class="mx-auto"></li>
//                             <li>Temp: ${Math.floor(data.daily[i].temp.day)} &deg;F</li>
//                             <li>Humidity: ${data.daily[i].humidity}%</li>
//                         </ul>
//                     </div>`;

//                     // Pushes card into dailyArray to then be appended to container
//                     dailyArray.push(dailyCard);
//                 }

//                 fiveDayHeader.classList.remove("hidden");

//                 dailyArray.forEach(card => {
//                     dailyCardContainer.appendChild(card);
//                 })
             
//                 updateLocalStorage(cityName);
//             })
//         }
//         })
//     })
// }
// })   
// }

// // Adds event listener to search form
// searchForm.addEventListener("submit", (event) => {
//     event.preventDefault();

//     // Removes white space from both ends of search term
//     let searchValue = cityInput.value.trim("");

//     // Handler if user submits form with blank field
//     if (searchValue === "") {
//         currentConditionsTitle.textContent = "Please enter a city!";
//         currentConditionsUl.innerHTML = "";
//         dailyContainer.innerHTML = "";
//         // Hides 5-day forecast if API won't be called
//         fiveDayHeader.classList.add("hidden");
//     } else {
//         urlCoords(searchValue);
//         // Clears text in input
//         cityInput.value = "";
//     }
// });

// // Called at run time to populate search buttons for previous searches in localStorage
// updateSearchHistory();

// // Default city to display at run time
// urlCoords("Chicago");
