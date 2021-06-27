// api key: 0b17ac4effa78f1520a5cf1ab7d339e5
// sample call  https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=0b17ac4effa78f1520a5cf1ab7d339e5
//https://api.openweathermap.org/data/2.5/onecall

let currentCityLon;
let currentCityLat;
let currentCityPull;
let currentDate;
let myDate;
let forecastDate1;
let forecastDate2;
let forecastDate3;
let forecastDate4;
let forecastDate5;
let cityName = $('#city-name');
let todayDate = $('#today-date');
let currentTemp = $('#current-temp');
let currentWind = $('#current-wind');
let currentHumidity = $('#current-humidity');
let currentUiv = $('#current-uvi');
let currentDesc = $('#current-description');


function getWeather() {
  fetch('https://api.openweathermap.org/data/2.5/weather?q=houston&units=imperial&APPID=0b17ac4effa78f1520a5cf1ab7d339e5', {
    // The browser fetches the resource from the remote server without first looking in the cache.
    // The browser will then update the cache with the downloaded resource.
    cache: 'reload',
  })
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      currentCityLon = data.coord.lon;
      currentCityLat = data.coord.lat;
      //console.log(data);
      currentCityPull = data.name;

      console.log(currentCityLon);
      console.log(currentCityLat);

      fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + currentCityLat + '&lon=' + currentCityLon + '&units=imperial&exclude=minutely,hourly&APPID=0b17ac4effa78f1520a5cf1ab7d339e5', {
        cache: 'reload',
      })
        .then(function (response) {
          console.log(response);
          return response.json();
        })
        .then(function (data) {
          populateCurrent(data);
          convertDate(data);


        })
    });
};// this is the end of the big function
//-------------------------------------------------------------------

//function to populate current weather

function populateCurrent(data) {
  console.log(data);
  console.log("Weather data from function \n----------");
  console.log("current city " + currentCityPull)
  console.log("current date " + data.current.dt);
  console.log("current humid " + data.current.humidity);
  console.log("current temp " + data.current.temp);
  console.log("current wind " + data.current.wind_speed);
  console.log("current UV Index " + data.current.uvi);
  console.log("current description " + data.current.weather[0].description);
  let nowUvi = data.current.uvi * 10;

  cityName.text("Current City: " + currentCityPull);
  todayDate.text("Today's Date: " + myDate);
  currentDesc.text("Current Conditions: " + data.current.weather[0].description);
  currentTemp.text("Current Temp: " + data.current.temp + "F");
  currentWind.text("Current Wind: " + data.current.wind_speed + " MPH");
  currentHumidity.text("Current Humidity: " + data.current.humidity + "%");
  currentUiv.text("Current UV Index: " + nowUvi)

  //TODO How do I add also make the text white with the green and red background
  if (nowUvi <= 3.0) {
    $("#current-uvi").css("background-color", "green");
  } else if (nowUvi > 3.0 && nowUvi < 6.0) {
    $("#current-uvi").css("background-color", "yellow");
  } else if (nowUvi >= 6.0) {
    $("#current-uvi").css("background-color", "red");
  };


}
//converts UNIX date to a human date
function convertDate(data) {
  currentDate = data.current.dt
  // from https://www.epochconverter.com/programming/#javascript
  var myDate = new Date(currentDate * 1000);
  console.log("function result" + myDate);
};



//TODO create function to create cards for the 5 day forecast


getWeather();

/*
//---Search field and history list
let citySearch = $('#city-search');
let searchHistory = $('#search-history');
let searchInput;

function handleFormSubmit(event) {

  event.preventDefault();

  searchInput = $('input[name="search-input"]').val();

  if (!searchInput) {
    console.log('No city entered into form!');
    return;
  }

  searchHistory.append('<li>' + searchInput + '</li>');

  $('input[name="search-input"]').val('');
  return searchInput;

}

citySearch.on('submit', handleFormSubmit);
*/



