// api key: 0b17ac4effa78f1520a5cf1ab7d339e5
// sample call  https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=0b17ac4effa78f1520a5cf1ab7d339e5
//https://api.openweathermap.org/data/2.5/onecall

var currentCityLon;
var currentCityLat;
var currentCityPull;
var currentDate;
var myDate;
var forecastDate1;
var forecastDate2;
var forecastDate3;
var forecastDate4;
var forecastDate5;


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

      fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + currentCityLat +'&lon=' + currentCityLon + '&units=imperial&exclude=minutely,hourly&APPID=0b17ac4effa78f1520a5cf1ab7d339e5', {
    cache: 'reload',
})
    .then(function (response) {
    console.log(response);
    return response.json();
    })
    .then(function (data) {

    console.log(data);
    console.log("Weather data \n----------");
    console.log("current city " + currentCityPull)
    console.log("current date " + data.current.dt);
    console.log("current humid " + data.current.humidity);
    console.log("current temp " + data.current.temp);
    console.log("current wind " + data.current.wind_speed);
    console.log("current UV Index " + data.current.uvi );
    console.log("current description " + data.current.weather[0].description);
    currentDate = data.current.dt
    // from https://www.epochconverter.com/programming/#javascript
    var myDate = new Date(currentDate *1000);
    console.log(myDate);
    return myDate;
})
});

console.log(currentCityLon);
console.log(currentCityLat);
console.log(myDate);
