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

// days ----------------------------
let DaysTemps = document.querySelectorAll(".DaysTemps");
let DaysForecast = document.querySelectorAll(".weather-info-forecast");
let DaysText = document.querySelectorAll(".DaysText");
let DaysIcons = document.querySelectorAll(".DaysIcons");

// precipitation ----------------------------
let _todayPrecipitation = document.getElementById("today-precipitation");
let _todayDewPoint = document.getElementById("today-DewPoint");
let _todayHumidity = document.getElementById("today-humidity");

// Wind ----------------------------
let _todayWindSpeed = document.getElementById("today-wind-Speed");
let _todayWindDirection = document.getElementById("today-wind-Direction");
let _todayWindIcon = document.getElementById("wind-icon");

// today's forecast ----------------------------
let HourlyText = document.querySelectorAll(".HourlyText");
let HourlyTemps = document.querySelectorAll(".HourlyTemps");
let HourlyIcon = document.querySelectorAll(".HourlyIcon");

// APIs ----------------------------
let APIstring =
  "https://corsproxy.io/?" +
  // `https://api.weather.gov/gridpoints/OKX/35,35/forecast?units=si`;
  `https://api.weather.gov/gridpoints/${_officeID}/${_xGrid},${_yGrid}/forecast?units=si`;

let HourlyAPIstring =
  "https://corsproxy.io/?" +
  // `https://api.weather.gov/gridpoints/OKX/35,35/forecast?units=si`;
  `https://api.weather.gov/gridpoints/${_officeID}/${_xGrid},${_yGrid}/forecast/hourly?units=si`;

// ----------------------------------------------------------------------------------------------
// events
// ----------------------------------------------------------------------------------------------
_GridXInput.addEventListener("change", (event) => {
  const xGrid = event.target.value;

  if (!checkForNumbersOnly(xGrid)) {
    event.target.style.backgroundColor = "lightcoral";
    return;
  } else {
    event.target.style.backgroundColor = "";
  }

  _xGrid = xGrid;

  changeAPI();
});

_GridYInput.addEventListener("change", (event) => {
  const yGrid = event.target.value;

  if (!checkForNumbersOnly(yGrid)) {
    event.target.style.backgroundColor = "lightcoral";
    return;
  } else {
    event.target.style.backgroundColor = "";
  }

  _yGrid = yGrid;

  changeAPI();
});

_OfficeIdInput.addEventListener("change", (event) => {
  const ID = event.target.value;

  if (!checkForLettersOnly(ID)) {
    event.target.style.backgroundColor = "lightcoral";
    return;
  } else {
    event.target.style.backgroundColor = "";
  }

  _officeID = ID;

  changeAPI();
});

// ----------------------------------------------------------------------------------------------
// functions
// ----------------------------------------------------------------------------------------------
function checkForLettersOnly(string) {
  return /^[a-zA-Z]+$/.test(string);
}

function checkForNumbersOnly(numbers) {
  return /^[0-9]+$/.test(numbers);
  // return typeof numbers === "number";
}

function changeAPI() {
  if (_xGrid == "" || _yGrid == "" || _officeID == "") return;

  APIstring =
    "https://corsproxy.io/?" +
    `https://api.weather.gov/gridpoints/${_officeID}/${_xGrid},${_yGrid}/forecast?units=si`;

  HourlyAPIstring =
    "https://corsproxy.io/?" +
    `https://api.weather.gov/gridpoints/${_officeID}/${_xGrid},${_yGrid}/forecast/hourly?units=si`;

  init();
}

function fetchWeatherDataFromAPI(src, timeout = "5000") {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  return new Promise(function(resolve) {
    fetch(src, { signal: controller.signal })
      .then((response) => response.json())
      .then((data) => resolve(praiseData(data)))
      .finally(() => clearTimeout(timer));
  });
}

function fetchHourlyWeatherDataFromAPI(src, timeout = "5000") {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  return new Promise(function(resolve) {
    fetch(src, { signal: controller.signal })
      .then((response) => response.json())
      .then((data) => resolve(praiseHourlyData(data)))
      .finally(() => clearTimeout(timer));
  });
}

function praiseHourlyData(data) {
  let hourlyDataArray = [];

  for (let i = 0; i < 7; i++) {
    let hourlyData = new clsHourlyWeather(
      data?.properties?.periods[i]?.startTime || "unknown",
      data?.properties?.periods[i]?.temperature || "unknown",
      data?.properties?.periods[i]?.temperatureUnit || "unknown",
      data?.properties?.periods[i]?.probabilityOfPrecipitation?.value ||
      "unknown",
      data?.properties?.periods[i]?.windSpeed || "unknown",
      data?.properties?.periods[i]?.windDirection || "unknown",
      data?.properties?.periods[i]?.shortForecast || "unknown",
      data?.properties?.periods[i]?.dewpoint.value || "unknown",
      data?.properties?.periods[i]?.relativeHumidity?.value || "unknown",
    );

    hourlyDataArray.push(hourlyData);
  }

  // console.log(hourlyDataArray);
  return hourlyDataArray;
}

function praiseData(data) {
  let Days = [];
  let Nights = [];

  for (let i = 0; i <= 13; i++) {
    if (data?.properties?.periods[i]?.isDaytime == true) {
      let day = new clsweatherDays(
        data?.properties?.periods[i]?.temperature || "unknown",
        data?.properties?.periods[i]?.temperatureUnit || "unknown",
        data?.properties?.periods[i]?.name.slice(0, 3) || "unknown",
        data?.properties?.periods[i]?.shortForecast || "unknown",
        data?.properties?.periods[i]?.probabilityOfPrecipitation?.value ||
        "unknown",
        data?.properties?.periods[i]?.windSpeed || "unknown",
        data?.properties?.periods[i]?.windDirection || "unknown",
      );

      Days.push(day);
    }
  }

  for (let i = 0; i <= 13; i++) {
    if (data?.properties?.periods[i]?.isDaytime == false) {
      let day = new clsweatherDays(
        data?.properties?.periods[i]?.temperature || "unknown",
        data?.properties?.periods[i]?.temperatureUnit || "unknown",
        data?.properties?.periods[i]?.name || "unknown",
        data?.properties?.periods[i]?.shortForecast || "unknown",
        data?.properties?.periods[i]?.probabilityOfPrecipitation?.value ||
        "unknown",
        data?.properties?.periods[i]?.windSpeed || "unknown",
        data?.properties?.periods[i]?.windDirection || "unknown",
      );

      Nights.push(day);
    }
  }

  //DEBUG
  // console.log(Days);
  // console.log(Nights);

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
  // if (weather.includes("Sunny")) {
  //   return "☀️";
  // } else if (
  //   weather.includes("Thunder") &&
  //   (weather.includes("Rain") || weather.includes("Showers"))
  // ) {
  //   return "⛈️";
  // } else if (weather.includes("Rain") || weather.includes("Showers")) {
  //   return "🌧️";
  // } else if (weather.includes("Cloudy")) {
  //   return "☁️";
  // } else if (weather.includes("Thunderstorm")) {
  //   return "🌩️";
  // } else if (weather.includes("Snow")) {
  //   return "🌨️";
  // } else if (weather.includes("Clear")) {
  //   return "⛅";
  // } else if (weather.includes("Fog")) {
  //   return "🌫️";
  // }

  const weatherIconMapping = {
    "Thunder Rain Showers": "⛈️",
    Sunny: "☀️",
    Rain: "🌧️",
    Showers: "🌧️",
    Cloudy: "☁️",
    Snow: "🌨️",
    Clear: "🌈",
    Fog: "🌫️",
    Thunderstorm: "🌩️",
  };

  for (let condition in weatherIconMapping) {
    if (weather.includes(condition)) {
      return weatherIconMapping[condition];
    }
  }

  return "🌈";
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
  if (day.Header == "Tod") {
    HeaderVar.innerText = "Today";
  } else {
    HeaderVar.innerText = day.Header;
  }

  IconVar.innerText = day.Icon;
  ForecastVar.innerText = day.Forecast;
  TempVar.innerText = day.Temps + "° " + day.TempUnit;
}

function displayWeatherAir(weather) {
  _todayPrecipitation.innerText =
    weather.Today.ProbabilityOfPrecipitation + "%";

  _todayWindSpeed.innerText = weather.Today.WindSpeed;
  _todayWindDirection.innerText = weather.Today.WindDirection;
  _todayWindIcon.className = getWindDirectionIcon(weather.Today.WindDirection);
}

function displayWeatherHumidity(data) {
  _todayHumidity.innerText = data.humidity + "%";
  _todayDewPoint.innerText = data.DewPoint.toFixed(2);
}

function displayWeatherForTodayHourly(hour, TempVar, HeaderVar, IconVar) {
  IconVar.innerText = hour.Icon;
  TempVar.innerText = hour.Temps + "° " + hour.TempUnit;

  let date = new Date(hour.StartTime);
  HeaderVar.innerText = date.getHours() + ":00";
}

// ----------------------------------------------------------------------------------------------
// page
// ----------------------------------------------------------------------------------------------
function displayHourlyData(HourlyData) {
  for (let i = 0; i < 6; i++) {
    displayWeatherForTodayHourly(
      HourlyData[i],
      HourlyTemps[i],
      HourlyText[i],
      HourlyIcon[i],
    );
  }

  displayWeatherHumidity(HourlyData[0]);
}

function displayData(weather) {
  //DEBUG
  // console.log(weather);

  const keys = Object.keys(weather);
  let dayIndex = 0;

  for (let i = 0; i < keys.length && dayIndex < DaysTemps.length; i++) {
    const key = keys[i];

    if (!key.toLowerCase().endsWith("night")) {
      displayWeatherDataForDay(
        weather[key],
        DaysTemps[dayIndex],
        DaysText[dayIndex],
        DaysForecast[dayIndex],
        DaysIcons[dayIndex],
      );

      dayIndex++;
    }
  }

  displayWeatherAir(weather);
}

// ----------------------------------------------------------------------------------------------
// program
// ----------------------------------------------------------------------------------------------
function init() {
  let APIpromise = fetchWeatherDataFromAPI(APIstring);
  APIpromise.then(displayData).catch(onError).finally(done);

  let HourlyAPIpromise = fetchHourlyWeatherDataFromAPI(HourlyAPIstring);
  HourlyAPIpromise.then(displayHourlyData).catch(onError).finally(done);
}

init();
