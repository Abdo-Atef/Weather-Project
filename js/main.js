var cityName = document.getElementById('cityName');
var degV = document.getElementById('degV');
var locationN = document.getElementById('locationName');
var findBtn = document.getElementById('findBtn');
var todayImg = document.getElementById('todayImg');
var imgDay2 = document.getElementById('imgDay2');
var imgDay3 = document.getElementById('imgDay3');
var statToday = document.getElementById('statToday');
var stat2day = document.getElementById('stat2day');
var stat3day = document.getElementById('stat3day');
var max2deg = document.getElementById('max2deg');
var max3deg = document.getElementById('max3deg');
var min2deg = document.getElementById('min2deg');
var min3deg = document.getElementById('min3deg');

(function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
    if(navigator.geolocation.getCurrentPosition(showPosition) == null){
      getForecast('cairo')
    }
  }
})();

function showPosition(position) {
  latitude=position.coords.latitude;
  longitude=position.coords.longitude;
  // console.log("Latitude: " + latitude)
  // console.log("Longitude: " + longitude);
  position = `${latitude},${longitude}`
  getForecast(position);
}

async function getForecast (temp){

  var apiResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7ae97b0d3729464ab72143940230208%20&q=${temp}&days=3&aqi=no&alerts=no`);
  var result = await apiResponse.json();
  // console.log(result);
  // console.log(result.current);
  cityName.innerHTML = `${result.location.country} - ${result.location.region} - ${result.location.name}`;
  todayImg.innerHTML = `<img id="todayImg" src="${result.current.condition.icon}" style="width: 90px;height: 90px;">`;
  imgDay2.innerHTML = `<img src="${result.forecast.forecastday[1].day.condition.icon}" style="width: 45px;">`;
  imgDay3.innerHTML = `<img src="${result.forecast.forecastday[2].day.condition.icon}" style="width: 45px;">`;
  degV.innerHTML = result.current.temp_c;
  max2deg.innerHTML = result.forecast.forecastday[1].day.maxtemp_c;
  min2deg.innerHTML = result.forecast.forecastday[1].day.mintemp_c;
  max3deg.innerHTML = result.forecast.forecastday[2].day.maxtemp_c;
  min3deg.innerHTML = result.forecast.forecastday[2].day.mintemp_c;
  statToday.innerHTML = result.current.condition.text;
  stat2day.innerHTML = result.forecast.forecastday[1].day.condition.text;
  stat3day.innerHTML = result.forecast.forecastday[2].day.condition.text;
}

function locationName(name){
  getForecast(name);
}

// findBtn.addEventListener('click', function(){
//    getForecast (locationName.value);
// });


/*-----------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------*/

var dM = document.getElementById('dM');
var todayN = document.getElementById('todayN');
var day2N = document.getElementById('dayTwoName');
var day3N= document.getElementById('dayThreeName');

(function getDayName() {
  const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const d = new Date();

  let day1Name = weekday[d.getDay()];
  todayN.innerHTML = day1Name;

  let day2Index = (d.getDay() + 1) % 7;
  let day2Name = weekday[day2Index];
  day2N.innerHTML = day2Name;

  let day3Index = (d.getDay() + 2) % 7;
  let day3Name = weekday[day3Index];
  day3N.innerHTML = day3Name;
})();

(function getMonthName(){
  const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const x = new Date();
  let mName = month[x.getMonth()];
  dM.innerHTML = new Date().getDate() + mName;
  
})();