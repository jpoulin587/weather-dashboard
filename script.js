// api key: 0b17ac4effa78f1520a5cf1ab7d339e5
// sample call  https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=0b17ac4effa78f1520a5cf1ab7d339e5
//https://api.openweathermap.org/data/2.5/onecall

let currentCityLon;
let currentCityLat;
let currentCityPull;
let currentDate;
let myDate;
//let forecastDate1;
//let forecastDate2;
//let forecastDate3;
//let forecastDate4;
//let forecastDate5;
let cityName = $('#city-name');
let todayDate = $('#today-date');
let currentTemp = $('#current-temp');
let currentWind = $('#current-wind');
let currentHumidity = $('#current-humidity');
let currentUiv = $('#current-uvi');
let currentDesc = $('#current-description');
let forecastDay;
let fiveDayList = $('five-day-list');
let fiveDayData = []


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

  // show current data  on the index.html
  let nowUvi = data.current.uvi * 1;
  cityName.text("Current City: " + currentCityPull);
  //TODO this date is not pulling. 
  todayDate.text("Today's Date: " + myDate);
  currentDesc.text("Current Conditions: " + data.current.weather[0].description);
  currentTemp.text("Current Temp: " + data.current.temp + "F");
  currentWind.text("Current Wind: " + data.current.wind_speed + " MPH");
  currentHumidity.text("Current Humidity: " + data.current.humidity + "%");
  currentUiv.text("Current UV Index: " + nowUvi)

  // This makes the color of the UV Index adjust with the severity 
  //TODO How do I add also make the text white with the green and red background
  if (nowUvi <= 3.0) {
    $("#current-uvi").css("background-color", "green");
  } else if (nowUvi > 3.0 && nowUvi < 6.0) {
    $("#current-uvi").css("background-color", "yellow");
  } else if (nowUvi >= 6.0) {
    $("#current-uvi").css("background-color", "red");
  };

  // populate the 5-day forecast
  console.log("Weather data for day one \n----------");
  console.log("Forecast date " + data.daily[0].dt);
  console.log("Forecast description " + data.daily[0].weather[0].description);
  console.log("Forecast humid " + data.daily[0].humidity);
  console.log("Forecast hi temp " + data.daily[0].temp.max);
  console.log("Forecast lo temp " + data.daily[0].temp.min);
  console.log("Forecast wind " + data.daily[0].wind_speed);
  //console.log(data.daily);


  // make an array of the date we need
  fiveDayData.push(data.daily[0].dt, data.daily[0].weather[0].description, data.daily[0].humidity, data.daily[0].temp.max, data.daily[0].temp.min, data.daily[0].wind_speed);
  console.log(fiveDayData);

  //TODO go back another time a refactor this to make it work
  // TODO this should populate the 5-day forecast blocks

  let forecastDay = data.daily;
  console.log(forecastDay);
  for (let i = 0; i < 5; i++) {
    //const dailyData = forecastDay[i];
    //console.log(dailyData);
    console.log("date day " + i + " " + data.daily[i].dt);
    console.log("outlook day " + i + " " + data.daily[i].weather[0].description);
    console.log("humid day " + i + " " + data.daily[i].humidity);
    console.log("hi day " + i + " " + data.daily[i].temp.max);
    console.log("low day " + i + " " + data.daily[i].temp.min);
    console.log("wind day " + i + " " + data.daily[i].wind_speed);

  }

  //   currentQuestion.choices.forEach(function(choice, i){
  //console.log(questionIndex + "questionIndex")
  //console.log(i);
  //console.log(choice);
  //     let choiceButton = document.createElement("button");















};

//converts current UNIX date to a human date
function convertDate(data) {
  currentDate = data.current.dt
  // from https://www.epochconverter.com/programming/#javascript
  var myDate = new Date(currentDate * 1000);
  console.log("Current human date: " + myDate);
  return myDate;
};



//TODO create function to create cards for the 5 day forecast


getWeather();

/*
//---TODO Search field history list
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




