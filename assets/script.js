
var submitBtn = document.getElementById('submitbtn');
var cityInput = document.getElementById('search-city');
var fiveDayContainer = document.getElementById('five-day-forcast');
var currWeather = document.getElementById('current-weather');
var citySearch = [];
var previousSearch = document.getElementById('previous-search');
var pastBtns = document.querySelectorAll('.past-btn');
var clearBtn = document.getElementById('clearBtn')


//Add API
function getApi(event, previousCity) {
  event.preventDefault()
  console.log(previousCity)
  var cityName = cityInput.value || previousCity 
  console.log(cityName)
  citySearch.push(cityName)
  storeSearch()
  renderSearch()
  var requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=d73924e0fd4a0a8efda9fc43d20f1773`

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      if (data.message === 'city not found') {
        console.log('city not found')
        return
      }
        showWeather(data)
        showCurrWeather(data)
      
      
    })
};

//Dispay curent day weather 
function showCurrWeather(data) {
  currWeather.innerHTML = "";
  var card = document.createElement("h2");
  var name = document.createElement("div")
  var text = document.createElement("h1")
  var date = document.createElement("div");
  var image = document.createElement("img");
  var temp = document.createElement("div");
  var wind = document.createElement("div");
  var humidity = document.createElement("div");
  text.textContent = "Current Weather"
  name.textContent = data.city.name;
  date.textContent = moment.unix(data.list[0].dt).format("MMM Do YY")
  image.src = `https://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png`
  temp.textContent = `Temp: ${data.list[0].main.temp} ℉`
  wind.textContent = `Wind: ${data.list[0].wind.speed} MPH`
  humidity.textContent = `Humidity: ${data.list[0].main.humidity} %`
  card.append(text, name, date, image, temp, wind, humidity)
  currWeather.append(card)
};

//display 5 day weather 
function showWeather(data) {
  fiveDayContainer.innerHTML = "";
  for (var i = 7; i < data.list.length; i += 7) {
    var card = document.createElement("div");
    card.classList.add("forcastcards");
    var date = document.createElement("div");
    var image = document.createElement("img");
    var temp = document.createElement("div");
    var wind = document.createElement("div");
    var humidity = document.createElement("div");
    date.textContent = moment.unix(data.list[i].dt).format("MMM Do YY")
    image.src = `https://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png`
    temp.textContent = `Temp: ${data.list[i].main.temp} ℉`
    wind.textContent = `Wind: ${data.list[i].wind.speed} MPH`
    humidity.textContent = `Humidity: ${data.list[i].main.humidity} %`
    card.append(date, image, temp, wind, humidity)
    fiveDayContainer.append(card)
  }
};

//Submit search
submitBtn.addEventListener('submit', getApi);

//Previous city search saved to local storage
function storeSearch() {
  localStorage.setItem("citySearch", JSON.stringify(citySearch));
};

function renderSearch() {
  previousSearch.innerHTML = "";
  var preSearch = JSON.parse(localStorage.getItem("citySearch"))
  if (preSearch) {
    citySearch = [...new Set(preSearch)]
  } else {
    citySearch = []
  }
  for (var i = 0; i < citySearch.length; i++) {
    var singleSearch = citySearch[i];
    var btn = document.createElement("button");
    btn.textContent = singleSearch;
    btn.setAttribute("data-city", citySearch [i]);
    previousSearch.appendChild(btn)
  }
};

//Previous search
previousSearch.addEventListener('click', function (event) {
  cityInput.value = ""
  console.log('click', event.target.getAttribute("data-city"))
  getApi(event, event.target.getAttribute("data-city"))
});


//Clear previous city searches 
clearBtn.addEventListener("click", function () {
  localStorage.clear();
  previousSearch.innerHTML = "";
  citySearch = [];

});

renderSearch()