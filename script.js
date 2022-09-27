const weatherDays = [];
let currDay = null;
var submitBtn = document.getElementById('submitbtn');
var cityInput = document.getElementById('search-city');
var fiveDayContainer = document.getElementById('five-day-forcast');
var currWeather = document.getElementById('current-weather');

//Add API
function getApi(event) {
  event.preventDefault()
  var cityName = cityInput.value
  console.log(cityName)
  var requestUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=d73924e0fd4a0a8efda9fc43d20f1773`

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      showWeather(data)
      showCurrWeather(data)
    })
};

function showCurrWeather(data) {
  var card = document.createElement("div");
  var date = document.createElement("div");
  var image = document.createElement("img");
  var temp = document.createElement("div");
  var wind = document.createElement("div");
  var humidity = document.createElement("div");
  date.textContent = data.list[0].dt
  image.src = `https://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png`
  temp.textContent = data.list[0].main.temp
  wind.textContent = data.list[0].wind.speed
  humidity.textContent = data.list[0].main.humidity
  card.append(date, image, temp, wind, humidity)
  currWeather.append(card)
};

function showWeather(data) {
  for (var i = 7; i < data.list.length; i += 7) {
    var card = document.createElement("div");
    var date = document.createElement("div");
    var image = document.createElement("img");
    var temp = document.createElement("div");
    var wind = document.createElement("div");
    var humidity = document.createElement("div");
    date.textContent = data.list[i].dt
    image.src = `https://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png`
    temp.textContent = data.list[i].main.temp
    wind.textContent = data.list[i].wind.speed
    humidity.textContent = data.list[i].main.humidity
    card.append(date, image, temp, wind, humidity)
    fiveDayContainer.append(card)
  }
};
submitBtn.addEventListener('submit', getApi);


// sampleData.list.forEach( function(tsObj){

//   // Makes a moment date object for each record
//   const dateObj = moment.unix(tsObj.dt)

//   // Generate the day # for the day in the date object
//   const dateNum = dateObj.format("DDD")

//   // If the current date in tsObj hasn't had a record put into weatherDays, do that now 
//   // Then skip over all other records for this day
//   if( dateNum !== currDay && weatherDays.length < 5 ){
//     weatherDays.push( tsObj )
//     currDay = dateNum
//   }

// });

