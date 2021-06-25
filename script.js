// api key: 0b17ac4effa78f1520a5cf1ab7d339e5
// sample call  https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=0b17ac4effa78f1520a5cf1ab7d339e5
//https://api.openweathermap.org/data/2.5/onecall

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
      console.log(data);
      console.log('Weather data \n----------');
      console.log(data.name);
      console.log(data.main.humidity);
      console.log(data.main.temp);
      console.log(data.wind.speed);
      console.log(data.weather[0].description);
      console.log(data.temp);
});
