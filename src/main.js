import "./style.css";
import "./queries.css";

// ----------------------------------------------------------------------------------------------
// classes
// ----------------------------------------------------------------------------------------------
class clsHourlyWeather {
  constructor(
    startTime,
    temps,
    tempUnit,
    precipitation,
    windSpeed,
    windDirection,
    forecast,
    dewPoint,
    humidity,
  ) {
    this.StartTime = startTime;
    this.Temps = temps;
    this.TempUnit = tempUnit;
    this.ProbabilityOfPrecipitation = precipitation;
    this.WindSpeed = windSpeed;
    this.WindDirection = windDirection;
    this.Forecaset = forecast;
    this.Icon = getWeatherIcon(forecast);
    this.DewPoint = dewPoint;
    this.humidity = humidity;
  }
}

class clsweatherDays {
  constructor(
    temps,
    tempUnit,
    header,
    forecast,
    precipitation,
    windSpeed,
    windDirection,
  ) {
    this.Temps = temps;
    this.TempUnit = tempUnit;
    this.Header = header;
    this.Forecast = forecast;
    this.ProbabilityOfPrecipitation = precipitation;
    this.WindSpeed = windSpeed;
    this.WindDirection = windDirection;
    this.Icon = getWeatherIcon(forecast);
  }
}

class clsWeather {
  constructor(
    today,
    tomorrow,
    nextTomorrow,
    fourth,
    fifth,
    sixth,
    seventh,
    tonight,
    tomorrowNight,
    nextTomorrowNight,
    fourthNight,
    fifthNight,
    sixthNight,
  ) {
    this.Today = today;
    this.Tonight = tonight;

    this.Tomorrow = tomorrow;
    this.TomorrowNight = tomorrowNight;

    this.NextTomorrow = nextTomorrow;
    this.NextTomorrowNight = nextTomorrowNight;

    this.Fourth = fourth;
    this.FourthNight = fourthNight;

    this.Fifth = fifth;
    this.FifthNight = fifthNight;

    this.Sixth = sixth;
    this.sixthNight = sixthNight;

    this.Seventh = seventh;
  }
}

// ----------------------------------------------------------------------------------------------
// vars
// ----------------------------------------------------------------------------------------------
// Input ----------------------------
let _GridYInput = document.getElementById("GridY-input");
let _GridXInput = document.getElementById("GridX-input");
let _OfficeIdInput = document.getElementById("OfficeId-input");
let _xGrid = _GridXInput.value;
let _yGrid = _GridYInput.value;
let _officeID = _OfficeIdInput.value;

// Temps ----------------------------
let _todayTemps = document.getElementById("today-temps");
let _tomorrowTemps = document.getElementById("tomorrow-temps");
let _nextTomorrowTemps = document.getElementById("next-tomorrow-temps");
let _fourthTemps = document.getElementById("fourth-temps");
let _fifthTemps = document.getElementById("fifth-temps");
let _sixthTemps = document.getElementById("sixth-temps");
let _seventhTemps = document.getElementById("seventh-temps");

// Forecast ----------------------------
let _todayForecast = document.getElementById("today-forecast");
let _tomorrowForecast = document.getElementById("tomorrow-forecast");
let _nextTomorrowForecast = document.getElementById("next-tomorrow-forecast");
let _fourthForecast = document.getElementById("fourth-forecast");
let _fifthForecast = document.getElementById("fifth-forecast");
let _sixthForecast = document.getElementById("sixth-forecast");
let _seventhForecast = document.getElementById("seventh-forecast");

// Header ----------------------------
let _todayHeader = document.getElementById("today-header");
let _tomorrowHeader = document.getElementById("tomorrow-header");
let _nextTomorrowHeader = document.getElementById("next-tomorrow-header");
let _fourthHeader = document.getElementById("fourth-header");
let _fifthHeader = document.getElementById("fifth-header");
let _sixthHeader = document.getElementById("sixth-header");
let _seventhHeader = document.getElementById("seventh-header");

// icons ----------------------------
let _todayIcon = document.getElementById("today-icon");
let _tomorrowIcon = document.getElementById("tomorrow-icon");
let _nextTomorrowIcon = document.getElementById("next-tomorrow-icon");
let _fourthIcon = document.getElementById("fourth-icon");
let _fifthIcon = document.getElementById("fifth-icon");
let _sixthIcon = document.getElementById("sixth-icon");
let _seventhIcon = document.getElementById("seventh-icon");

// precipitation ----------------------------
let _todayPrecipitation = document.getElementById("today-precipitation");
let _todayDewPoint = document.getElementById("today-DewPoint");
let _todayHumidity = document.getElementById("today-humidity");

// Wind ----------------------------
let _todayWind = document.getElementById("today-wind");
let _todayWindSpeed = document.getElementById("today-wind-Speed");
let _todayWindDirection = document.getElementById("today-wind-Direction");
let _todayWindIcon = document.getElementById("wind-icon");

// today's forecast ----------------------------
// today's header ----------------------------
let _todaysHeader1 = document.getElementById("todays-header-1");
let _todaysHeader2 = document.getElementById("todays-header-2");
let _todaysHeader3 = document.getElementById("todays-header-3");
let _todaysHeader4 = document.getElementById("todays-header-4");
let _todaysHeader5 = document.getElementById("todays-header-5");
let _todaysHeader6 = document.getElementById("todays-header-6");

// today's temps ----------------------------
let _todaysTemp1 = document.getElementById("todays-temp-1");
let _todaysTemp2 = document.getElementById("todays-temp-2");
let _todaysTemp3 = document.getElementById("todays-temp-3");
let _todaysTemp4 = document.getElementById("todays-temp-4");
let _todaysTemp5 = document.getElementById("todays-temp-5");
let _todaysTemp6 = document.getElementById("todays-temp-6");

// today's temps ----------------------------
let _todaysIcon1 = document.getElementById("todays-icon-1");
let _todaysIcon2 = document.getElementById("todays-icon-2");
let _todaysIcon3 = document.getElementById("todays-icon-3");
let _todaysIcon4 = document.getElementById("todays-icon-4");
let _todaysIcon5 = document.getElementById("todays-icon-5");
let _todaysIcon6 = document.getElementById("todays-icon-6");

// v ----------------------------
let APIstring =
  "https://corsproxy.io/?" +
  // `https://api.weather.gov/gridpoints/OKX/35,35/forecast?units=si`;
  `https://api.weather.gov/gridpoints/${_officeID}/${_xGrid},${_yGrid}/forecast?units=si`;

let TodayAPIstring =
  "https://corsproxy.io/?" +
  // `https://api.weather.gov/gridpoints/OKX/35,35/forecast?units=si`;
  `https://api.weather.gov/gridpoints/${_officeID}/${_xGrid},${_yGrid}/forecast/hourly?units=si`;

// ----------------------------------------------------------------------------------------------
// functions
// ----------------------------------------------------------------------------------------------
_GridXInput.addEventListener("change", (event) => {
  _xGrid = event.target.value;

  console.log(_xGrid);
  changeAPI();
});

_GridYInput.addEventListener("change", (event) => {
  _yGrid = event.target.value;

  changeAPI();
});

_OfficeIdInput.addEventListener("change", (event) => {
  _officeID = event.target.value;

  changeAPI();
});

// ----------------------------------------------------------------------------------------------
// functions
// ----------------------------------------------------------------------------------------------
function changeAPI() {
  APIstring =
    "https://corsproxy.io/?" +
    `https://api.weather.gov/gridpoints/${_officeID}/${_xGrid},${_yGrid}/forecast?units=si`;

  TodayAPIstring =
    "https://corsproxy.io/?" +
    `https://api.weather.gov/gridpoints/${_officeID}/${_xGrid},${_yGrid}/forecast/hourly?units=si`;

  init();
}

function fetchWeatherDataFromAPI(src) {
  return new Promise(function(resolve, reject) {
    // fetch("https://www.api.weather.gov/gridpoints/OKX/35,35/forecast")
    fetch(src)
      .then((response) => response.json())
      // .then((data) => resolve(data.properties.periods[1].shortForecast));
      .then((data) => resolve(praiseData(data)));
  });
}

function fetchHourlyWeatherDataFromAPI(src) {
  return new Promise(function(resolve, reject) {
    // fetch("https://www.api.weather.gov/gridpoints/OKX/35,35/forecast")
    fetch(src)
      .then((response) => response.json())
      // .then((data) => resolve(data.properties.periods[1].shortForecast));
      .then((data) => resolve(praiseHourlyData(data)));
  });
}

function praiseHourlyData(data) {
  let hourlyDataArray = [];

  for (let i = 0; i < 7; i++) {
    let hourlyData = new clsHourlyWeather(
      data.properties.periods[i].startTime,
      data.properties.periods[i].temperature,
      data.properties.periods[i].temperatureUnit,
      data.properties.periods[i].probabilityOfPrecipitation.value,
      data.properties.periods[i].windSpeed,
      data.properties.periods[i].windDirection,
      data.properties.periods[i].shortForecast,
      data.properties.periods[i].dewpoint.value,
      data.properties.periods[i].relativeHumidity.value,
    );

    hourlyDataArray.push(hourlyData);
  }

  console.log(hourlyDataArray);
  return hourlyDataArray;
}

function praiseData(data) {
  let Days = [];
  let Nights = [];

  for (let i = 0; i <= 13; i++) {
    if (data.properties.periods[i].isDaytime == true) {
      let day = new clsweatherDays(
        data.properties.periods[i].temperature,
        data.properties.periods[i].temperatureUnit,
        data.properties.periods[i].name,
        data.properties.periods[i].shortForecast,
        data.properties.periods[i].probabilityOfPrecipitation.value,
        data.properties.periods[i].windSpeed,
        data.properties.periods[i].windDirection,
      );

      Days.push(day);
    }
  }

  for (let i = 0; i <= 13; i++) {
    if (data.properties.periods[i].isDaytime == false) {
      let day = new clsweatherDays(
        data.properties.periods[i].temperature,
        data.properties.periods[i].temperatureUnit,
        data.properties.periods[i].name,
        data.properties.periods[i].shortForecast,
        data.properties.periods[i].probabilityOfPrecipitation.value,
        data.properties.periods[i].windSpeed,
        data.properties.periods[i].windDirection,
      );

      Nights.push(day);
    }
  }

  //DEBUG
  console.log(Days);
  console.log(Nights);

  let weatherdata = new clsWeather(
    Days[0],
    Days[1],
    Days[2],
    Days[3],
    Days[4],
    Days[5],
    Days[6],
    Nights[0],
    Nights[2],
    Nights[3],
    Nights[4],
    Nights[5],
    Nights[6],
  );

  return weatherdata;
}

function getWeatherIcon(weather) {
  if (weather.includes("Sunny")) {
    return "☀️";
  } else if (
    weather.includes("Thunder") &&
    (weather.includes("Rain") || weather.includes("Showers"))
  ) {
    return "⛈️";
  } else if (weather.includes("Rain") || weather.includes("Showers")) {
    return "🌧️";
  } else if (weather.includes("Cloudy")) {
    return "☁️";
  } else if (weather.includes("Thunderstorm")) {
    return "🌩️";
  } else if (weather.includes("Snow")) {
    return "🌨️";
  } else if (weather.includes("Clear")) {
    return "⛅";
  } else if (weather.includes("Fog")) {
    return "🌫️";
  }
}

function getWindDirectionIcon(windData) {
  if (windData == "E") {
    return "nf nf-weather-wind_east";
  } else if (windData == "W") {
    return "nf nf-weather-wind_west";
  } else if (windData == "S") {
    return "nf nf-weather-wind_south";
  } else if (windData == "N") {
    return "nf nf-weather-wind_north";
    //
  } else if (windData == "NE") {
    return "nf nf-weather-wind_north_east";
  } else if (windData == "NW") {
    return "nf nf-weather-wind_north_west";
  } else if (windData == "SE") {
    return "nf nf-weather-wind_south_east";
  } else if (windData == "SW") {
    return "nf nf-weather-wind_south_west";
  }
}

function onError(data) {
  console.log(`${data}`);
}

function done() {
  console.log(`DONE`);
}

function displayWeatherDataForDay(
  day,
  TempVar,
  HeaderVar,
  ForecastVar,
  IconVar,
) {
  TempVar.innerText = day.Temps + "° " + day.TempUnit;
  HeaderVar.innerText = day.Header;
  IconVar.innerText = day.Icon;
  ForecastVar.innerText = day.Forecast;
}

function displayWeatherAir(weather) {
  _todayPrecipitation.innerText =
    weather.Today.ProbabilityOfPrecipitation + "%";
  _todayWindSpeed.innerText = weather.Today.WindSpeed;
  _todayWindDirection.innerText = weather.Today.WindDirection;
  _todayWindIcon.className = getWindDirectionIcon(weather.Today.WindDirection);
  // _todayWind.innerText = weather.Today.WindSpeed + ", " + weather.Today.WindDirection;
}

function displayWeatherHumidity(data) {
  console.log(data);

  _todayHumidity.innerText = data.humidity + "%";
  _todayDewPoint.innerText = data.DewPoint.toFixed(2);
}

function displayWeatherForTodayHourly(hour, TempVar, HeaderVar, IconVar) {
  TempVar.innerText = hour.Temps + "° " + hour.TempUnit;
  IconVar.innerText = hour.Icon;

  let date = new Date(hour.StartTime);
  HeaderVar.innerText = date.getHours() + ":00";
}

// ----------------------------------------------------------------------------------------------
// page
// ----------------------------------------------------------------------------------------------
function displayHourlyData(HourlyData) {
  displayWeatherForTodayHourly(
    HourlyData[0],
    _todaysTemp1,
    _todaysHeader1,
    _todaysIcon1,
  );
  displayWeatherForTodayHourly(
    HourlyData[1],
    _todaysTemp2,
    _todaysHeader2,
    _todaysIcon2,
  );
  displayWeatherForTodayHourly(
    HourlyData[2],
    _todaysTemp3,
    _todaysHeader3,
    _todaysIcon3,
  );
  displayWeatherForTodayHourly(
    HourlyData[3],
    _todaysTemp4,
    _todaysHeader4,
    _todaysIcon4,
  );
  displayWeatherForTodayHourly(
    HourlyData[4],
    _todaysTemp5,
    _todaysHeader5,
    _todaysIcon5,
  );
  displayWeatherForTodayHourly(
    HourlyData[5],
    _todaysTemp6,
    _todaysHeader6,
    _todaysIcon6,
  );

  displayWeatherHumidity(HourlyData[0]);
}

function displayData(weather) {
  //DEBUG
  console.log(weather);

  displayWeatherDataForDay(
    weather.Today,
    _todayTemps,
    _todayHeader,
    _todayForecast,
    _todayIcon,
  );
  displayWeatherDataForDay(
    weather.Tomorrow,
    _tomorrowTemps,
    _tomorrowHeader,
    _tomorrowForecast,
    _tomorrowIcon,
  );
  displayWeatherDataForDay(
    weather.NextTomorrow,
    _nextTomorrowTemps,
    _nextTomorrowHeader,
    _nextTomorrowForecast,
    _nextTomorrowIcon,
  );
  displayWeatherDataForDay(
    weather.Fourth,
    _fourthTemps,
    _fourthHeader,
    _fourthForecast,
    _fourthIcon,
  );
  displayWeatherDataForDay(
    weather.Fifth,
    _fifthTemps,
    _fifthHeader,
    _fifthForecast,
    _fifthIcon,
  );
  displayWeatherDataForDay(
    weather.Sixth,
    _sixthTemps,
    _sixthHeader,
    _sixthForecast,
    _sixthIcon,
  );
  displayWeatherDataForDay(
    weather.Seventh,
    _seventhTemps,
    _seventhHeader,
    _seventhForecast,
    _seventhIcon,
  );

  displayWeatherAir(weather);
}

// ----------------------------------------------------------------------------------------------
// program
// ----------------------------------------------------------------------------------------------
function init() {
  let APIpromise = fetchWeatherDataFromAPI(APIstring);
  APIpromise.then(displayData).catch(onError).finally(done);

  let HourlyAPIpromise = fetchHourlyWeatherDataFromAPI(TodayAPIstring);
  HourlyAPIpromise.then(displayHourlyData).catch(onError).finally(done);
}

init();
