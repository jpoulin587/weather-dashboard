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
let fiveDayList = document.getElementById("five-day-list");
let citySearch = $('#city-search');
let searchHistory = $('#search-history');
let searchInput = "bar harbor";




function getWeather(city) {
  fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&APPID=0b17ac4effa78f1520a5cf1ab7d339e5', {
    // The browser fetches the resource from the remote server without first looking in the cache.
    // The browser will then update the cache with the downloaded resource.
    cache: 'reload',
  })
    .then(function (response) {
      //console.log(response);
      return response.json();
    })
    .then(function (data) {
      currentCityLon = data.coord.lon;
      currentCityLat = data.coord.lat;
      console.log(data);
      currentCityPull = data.name;
      //console.log(currentCityLon);
      //console.log(currentCityLat);
      fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + currentCityLat + '&lon=' + currentCityLon + '&units=imperial&exclude=minutely,hourly&APPID=0b17ac4effa78f1520a5cf1ab7d339e5', {
        cache: 'reload',
      })
        .then(function (response) {
          //console.log(response);
          return response.json();
        })
        .then(function (data) {
          convertCurrentDate(data);
          populateCurrent(data);



        })
    });
};// this is the end of the big function
//-------------------------------------------------------------------

//function to populate current weather

function populateCurrent(data) {
  //console.log(data);

  // show current data  on the index.html
  cityName.text("Current City: " + currentCityPull);
  //TODO this date is not pulling. 
  todayDate.text("Today's Date: " + myDate);
  currentDesc.text("Current Conditions: " + data.current.weather[0].description);
  currentTemp.text("Current Temp: " + data.current.temp + "F");
  currentWind.text("Current Wind: " + data.current.wind_speed + " MPH");
  currentHumidity.text("Current Humidity: " + data.current.humidity + "%");
  currentUiv.text("Current UV Index: " + data.current.uvi)

  // This makes the color of the UV Index adjust with the severity 
  //TODO How do I add also make the text white with the green and red background
  if (data.current.uvi <= 3.0) {
    $("#current-uvi").css("background-color", "LightGreen");
  } else if (data.current.uvi > 3.0 && data.current.uvi < 6.5) {
    $("#current-uvi").css("background-color", "yellow");
  } else if (data.current.uvi >= 6.5) {
    $("#current-uvi").css("background-color", "Red");
  };

  // populate the 5-day forecast


  // TODO this should populate the 5-day forecast blocks

  let forecastDay = data.daily;
  fiveDayList.innerHTML = "";
  console.log(forecastDay);
  for (let i = 0; i < 5; i++) {
    //const dailyData = forecastDay[i];
    //console.log(dailyData);
    // console.log("date day " + i + " " + data.daily[i].dt);
    // console.log("outlook day " + i + " " + data.daily[i].weather[0].description);
    // console.log("humid day " + i + " " + data.daily[i].humidity);
    // console.log("hi day " + i + " " + data.daily[i].temp.max);
    // console.log("low day " + i + " " + data.daily[i].temp.min);
    // console.log("wind day " + i + " " + data.daily[i].wind_speed);


    var card = document.createElement('div');
    var cardDate = document.createElement('h4');
    var cardDesc = document.createElement('p');
    var cardHumid = document.createElement('p');
    var cardTempHi = document.createElement('p');
    var cardTempLo = document.createElement('p');
    var cardWind = document.createElement('p');

    function convertFiveDate(data) {

      currentDate = data.daily[i].dt
      // from https://www.epochconverter.com/programming/#javascript
      fiveDateFull = new Date(currentDate * 1000);
      console.log("5day human date: " + fiveDateFull);
      //console.log("type of: " + typeof fiveDateFull);
      let fiveDateString = JSON.stringify(fiveDateFull);
      console.log(fiveDateString);
      //console.log("string? " + typeof fiveDateString);
      fiveDate = fiveDateString.substring(1, 11)
    };
    convertFiveDate(data)

    cardDate.innerText = fiveDate;
    cardDesc.innerText = data.daily[i].weather[0].description;
    cardHumid.innerText = "humidity: " + data.daily[i].humidity;
    cardTempHi.innerText = "Hi Temp: " + data.daily[i].temp.max;
    cardTempLo.innerText = "Lo Temp: " + data.daily[i].temp.min;
    cardWind.innerText = "Wind: " + data.daily[i].wind_speed;

    card.append(cardDate);
    card.append(cardDesc);
    card.append(cardHumid);
    card.append(cardTempHi);
    card.append(cardTempLo);
    card.append(cardWind);
    fiveDayList.append(card);


  };
}; // this is the end of the populate function

//converts current UNIX date to a human date
//TODO make the date.time a string and trunkate
function convertCurrentDate(data) {
  currentDate = data.current.dt
  // from https://www.epochconverter.com/programming/#javascript
  myDate = new Date(currentDate * 1000);
  console.log("Current human date: " + myDate);

};

// this adds the event listener to the  search button and populates the search history list.
// adapted from https://www.codegrepper.com/code-examples/javascript/how+to+get+data+from+input+field+in+javascript
document.querySelector("form").addEventListener("submit", SearchCityForm);
function SearchCityForm(e) {
  searchInput = document.getElementById("search-input").value;
  console.log('search', searchInput)
  e.preventDefault();
  searchInput = $('input[name="search-input"]').val();

  searchHistory.append('<button class="btn btn-info history">' + searchInput + '</button>');
  $('input[name="search-input"]').val('');


  getWeather(searchInput);

};

//week 04 activity 12
$("#search-history").on("click", ".history", function () {
  let city = $(this).text()
  getWeather(city)
});



