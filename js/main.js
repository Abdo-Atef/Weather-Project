var cityName = document.getElementById('cityName');
var degV = document.getElementById('degV');
var rainProp = document.getElementById('rainProp');
var wind_kph = document.getElementById('wind_kph');
var windDir = document.getElementById('windDir');
var locationN = document.getElementById('locationName');
var todayImg = document.getElementById('todayImg');
var nextDayImg = document.getElementsByClassName('nextDayImg');
var statToday = document.getElementById('statToday');
var nextDayStat = document.getElementsByClassName('nextDayStat');
var maxDeg = document.getElementsByClassName('maxDeg');
var minDeg = document.getElementsByClassName('minDeg');
var dM = document.getElementById('dM');
var dayName = document.getElementsByClassName('dayName');

(function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
    if(navigator.geolocation.getCurrentPosition(showPosition) == null){
      displayForecast('cairo')
    }
  }
})();
function showPosition(position) {
  latitude=position.coords.latitude;
  longitude=position.coords.longitude;
  // console.log("Latitude: " + latitude)
  // console.log("Longitude: " + longitude);
  position = `${latitude},${longitude}`
  displayForecast(position);
}

async function getForecast (p){
  var apiResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7ae97b0d3729464ab72143940230208%20&q=${p}&days=3&aqi=no&alerts=no`);
  var result = await apiResponse.json();
  return result;
}
async function displayForecast(place){
  let result = await getForecast(place);
  if(!result.error){
    cityName.innerHTML = `${result.location.country} - ${result.location.region} - ${result.location.name}`;
    todayImg.setAttribute('src',`${result.current.condition.icon}`);
    degV.innerHTML = result.current.temp_c;
    rainProp.innerHTML = (result.forecast.forecastday[0].day.daily_chance_of_rain+'%');
    wind_kph.innerHTML = result.current.wind_kph +" km/h" ;
    windDir.innerHTML = result.current.wind_dir;
    statToday.innerHTML = result.current.condition.text;
    for(let i=0;i<2;i++){
      maxDeg[i].innerHTML = result.forecast.forecastday[i+1].day.maxtemp_c;
      minDeg[i].innerHTML = result.forecast.forecastday[i+1].day.mintemp_c;
      nextDayStat[i].innerHTML = result.forecast.forecastday[i+1].day.condition.text;
      nextDayImg[i].setAttribute('src',`${result.forecast.forecastday[i+1].day.condition.icon}`);
    }
    for (let i = 0; i <= 2; i++) {
      dayName[i].innerHTML = new Date(result.forecast.forecastday[i].date).toLocaleDateString('en-us',{'weekday':'long'});   
    }
    let monthName = new Date().toLocaleDateString('en-us',{'month':'long'})
    dM.innerHTML = new Date().getDate() + monthName;
  }
}

locationN.addEventListener('keyup',function(){
  displayForecast(locationN.value);
})

/*-----------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------*/

// (function getDayName() {
//   const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
//   const d = new Date();

//   let day1Name = weekday[d.getDay()];
//   todayN.innerHTML = day1Name;

//   let day2Index = (d.getDay() + 1) % 7;
//   let day2Name = weekday[day2Index];
//   day2N.innerHTML = day2Name;

//   let day3Index = (d.getDay() + 2) % 7;
//   let day3Name = weekday[day3Index];
//   day3N.innerHTML = day3Name;
// })();

// (function getMonthName(){
//   const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
//   const x = new Date();
//   let mName = month[x.getMonth()];
//   dM.innerHTML = new Date().getDate() + mName;
  
// })();