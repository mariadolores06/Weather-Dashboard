var APIKey = "fab2608a114a274611d372fde5a01b93";
var cityInput = document.querySelector("#city-search");
var searchForm = document.querySelector("#search-form");
var currentConditionsUl = document.querySelector("#current-forecast #weatherConditions");
var currentConditionsTitle = document.querySelector("#current-forecast h3");
var previousCities = document.querySelector("#search-history");
var previousContainer = document.querySelector("#search-history .card-body");
var dailyContainer = document.querySelector("#daily-forecast");
var fiveDayHeader = document.querySelector("#forecastHeader");

var cityArray = [];
var previousCities = JSON.parse(localStorage.getItem("searchHistory"));

if (previousCities !== null) {
  for (let i = 0; i < previousCities.length; i++) {
    if (previousCities[i] === null) {
       previousCities.splice(i, i+1);
    } else {
        localCityArray.push(previousSearch[i]);
        }
    }
}

var updateSearches = () => {
  previousCities = JSON.parse(localStorage.getItem("searchHistory"));

  if (previousCities !== null) {
    currentButtons.forEach(button => {
      for (i=0; i<previousCities.length; i++)
      if (button.dataset.city.inlcudes(previousCities[i])) {
          previousCities.splice(i, i+1);
        }
    })
    for (i=0; i < previousCities.length; i++) {
      var cityBtn = document.createElement("button");
      cityBtn.classList.add("btn", "btn-primary");
      cityBtn.dataset.city= previousCities[i];
      cityBtn.textContent = previousCities[i];
      cityBtn.addEventListener("click", (event) => {
      openWeather(event.target.dataset.city);
      })
      previousCities.appendChild(cityBtn);
    }
    return;
}}

var updateLocalStorage = (city) => {
  if (cityArray.includes(city)) {
    return;
  } else {
    cityArray.push(city);
    localStorage.setItem("searchHistory", JSON.stringify(cityArray));
    updateSearches();
    }
}

const openWeather= (city) => {
  const urlCoords = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKey;
  fetch(urlCoords)
  .then(function (response) {
    if (!response.ok) {
      currentConditionsUl.innerHTML = "";
      currentConditionsTitle.textContent = "Please try again!";
      var errorText = document.createElement("li");
      errorText.textContent = "Sorry, City not found";
      dailyContainer.innerHTML = "";
      fiveDayHeader.classList.add("hidden") //in case there was an error with the previous search
    } else {
        response.json()
    .then (function (data) {
      var cityName = data.name;

      const weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKey;
            
      //current and daily Weather
      fetch(weatherURL)
      .then (function (response) {
        if (response.ok) {
            response.json()
      .then (function (data) {
        const icon = ("<img src='https://openweathermap.org/img/wn/${icon}.png' alt= 'Weather icon'>");
        currentConditionsTitle.innerHTML = cityName + " (" + dayjs().format("dddd MMMM DD, YYYY") + ") "+ icon;    
      
        var listArray = [];

        currentConditionsUl.innerHTML = "";
          for (i = 0; i < 4; i++) {
            var li = document.createElement("li");
            li.classList.add("mb-2");
            listArray.push(li);
          }

        listArray[0].innerHTML = "Temperature: " + Math.floor(data.temp) + " &deg;F" ;
        listArray[1].textContent = "Humidity: " + data.humidity + "%";
        listArray[2].textContent = "Wind Speed: " + Math.floor(data.wind_speed) + " MPH";

        listArray.forEach(li => {
          currentConditionsUl.append(li);
        })

        var dailyArray = [];
        
        dailyContainer.innerHTML = "";

        for (i = 0; i < 5; i++) {
          var dailyCard = document.createElement("div");
            // Populates forecast data for each card
          dailyCard.innerHTML = `
          <div class="p-2 m-2 card bg-info text-white">
            <h5>${dayjs().add(i + 1, "days").format("dddd MMMM DD, YYYY")}</h5>
            <ul id="weatherConditions">
              <li><img src='https://openweathermap.org/img/w/${icon}.png' alt="Weather icon" class="mx-auto"></li>
              <li>Temp: ${Math.floor(data.daily[i].temp.day)} &deg;F</li>
              <li>Humidity: ${data.daily[i].humidity}%</li>
            </ul>
          </div>`; 

          dailyArray.push(dailyCard);
        }
          fiveDayHeader.classList.remove("hidden");

          dailyArray.forEach(card => {
            dailyContainer.appendChild(card);
          })
          updateLocalStorage(cityName);
      })
    }
    })
  })
}
})
};

searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
      // // Removes white space from both ends of search term
      var cityValue = cityInput.value.trim("");
      if (cityValue === "") {
        currentConditionsTitle.textContent = "Please enter a city!";
        currentConditionsUl.innerHTML = "";
        dailyContainer.innerHTML = "";
        fiveDayHeader.classList.add("hidden");
      } else {
        openWeather(cityValue);
          // Clears text in input
        cityInput.value = "";
      }
  });


updateSearches();
openWeather();
