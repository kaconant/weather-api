let appId = '862f28c37647222562f54c46b73c855e';
let units = 'imperial';
let searchMethod;

function getSearchMethod(searchTerm) {
  // checking to see if length is 5 and if every single item in search term is a number (by turning into a string)
  if(searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm)
    searchMethod = 'zip';
  else 
    searchMethod = 'q'
  }

function searchWeather(searchTerm) {
  getSearchMethod(searchTerm);
  fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`)
    .then(result => {
      // converting to JSON
      return result.json();
    })
    .then(result => {
      // calling function with results from server
      primaryInit(result);
    })
}

function primaryInit(resultFromServer) {
  switch(resultFromServer.weather[0].main) {
    case 'Clear':
      document.body.style.backgroundImage = 'url("clear.jpg")';
      break;

    case 'Clouds':
      document.body.style.backgroundImage = 'url("cloudy.jpg")';
      break;

    case 'Drizzle':
    case 'Mist':
    case 'Rain':
      document.body.style.backgroundImage = 'url("rain.jpg")';
      break;

    case 'Snow':
      document.body.style.backgroundImage = 'url("snow.jpg")';
      break;

    case 'Thunderstorm':
      document.body.style.backgroundImage = 'url("storm.jpg")';
      break;

    default:
      break;
  }

  let cityHeader = document.getElementById('cityHeader');
  let temperatureElement = document.getElementById('temperature');
  let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
  let weatherIcon = document.getElementById('documentIconImg');
  let windSpeedElement = document.getElementById('windSpeed');
  let humidityElement = document.getElementById('humidity');

  cityHeader.innerHTML = resultFromServer.name;
  temperatureElement.innerHTML = Math.floor(resultFromServer.main.temp) + '&deg;'; 
  let resultDescription = resultFromServer.weather[0].description;
  weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);
  weatherIcon.src = 'http://openweathermap.org/img/w/' + resultFromServer.weather[0].icon + '.png';
  windSpeedElement.innerHTML = 'Winds at ' + Math.floor(resultFromServer.wind.speed) + ' m/s'; 
  humidityElement.innerHTML = 'Humidity levels at ' + resultFromServer.main.humidity + '%';

  setPositionWeatherInfo();
}

function setPositionWeatherInfo() {
  let weatherContainer = document.getElementById('weatherContainer');
  // clientHeight is viewable height of element with padding but nothing else
  let weatherContainerHeight = weatherContainer.clientHeight;
  let weatherContainerWidth = weatherContainer.clientWidth; 

  weatherContainer.style.left = `calc(50% - ${weatherContainerWidth/2}px)`;
  weatherContainer.style.top = `calc(50% - ${weatherContainerHeight/1.3}px)`;
  weatherContainer.style.visibility = 'visible';
}

document.getElementById('searchBtn').addEventListener('click', () => {
  let searchTerm = document.getElementById('searchInput').value;
  if (searchTerm)
    searchWeather(searchTerm);
})
