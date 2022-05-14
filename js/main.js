var input = document.getElementById('input');
var btn = document.getElementById('find');
var temperature = document.getElementById('temperature'); //temperature container
var locationContainer = document.getElementById('location'); /// location Container

var minTempContainer = document.getElementById('minTemp');
var maxTempContainer = document.getElementById('maxTemp');

var windSpeedContainer = document.getElementById('windSpeed');


var descContainer = document.getElementById('temperature-description'); /// Description Container
var img = document.getElementById('icon'); // icons
var notification = document.getElementById('notification'); /// notification

var tip = document.getElementById('tip'); /// tip
tip.style.visibility = "visible";


/// Get weather's data
async function getWeather(){

    const API = "https://api.openweathermap.org/data/2.5/weather?q="+input.value+"&appid=687b2a00a781593ecec21ae98eff2c90";
    const res = await fetch(API);
    const data = await res.json();
    console.log(data);

    var error = data.cod; /// catch the error


    if(error==404|| error == 400 || error == 401 || error == 403) {
        notification.style.display = "block";
        temperature.innerHTML = "?? ??";
        descContainer.innerHTML = "Search a State/City";
        locationContainer.innerHTML = "Unknown";
        img.src="icons/unknown.png";
        windSpeedContainer.innerHTML ="???";
        maxTempContainer.innerHTML = "???";
        minTempContainer.innerHTML = "???";
    }

    else{
        
        notification.style.display = "none";
    

        //API location
        var location = data.name + ", " + data.sys.country;
        var weather = data.weather;
        var desc=weather[0].main+", "+weather[0].description;

        ///Diplay The Location and Temperature Description
        locationContainer.innerHTML = location;
        descContainer.innerHTML = desc; 


        ///temperature
        var cels = Math.round(data.main.temp-273.15);
        var farh = Math.round((cels * 1.8) + 32);

        var minTemp = Math.round(data.main.temp_min - 273.15)
        var maxTemp = Math.round(data.main.temp_max - 273.15)

        var windSpeed = Math.round(data.wind.speed * 1.852);

        ///Display them
        minTempContainer.innerHTML = `Min: ${minTemp}` + '°C';
        maxTempContainer.innerHTML = `Max: ${maxTemp}` + '°C';
        windSpeedContainer.innerHTML = windSpeed + 'km/h';
        
      

       

        ///Change from Celsius to Farh. and Farh. to Celsius on onclick event
        var degree = ['°F','°C'];
        temperature.innerHTML = cels+degree[1];

        var flag = true;
        temperature.onclick = function() {

            if(flag) {
                temperature.innerHTML = farh+degree[0];
            }

            else{
                temperature.innerHTML = cels+degree[1];
            }

        flag =!flag;

        }

        ///Changing the icon

        var icon =weather[0].icon;
        img.src=`icons/${icon}.png`;

 


        //// TIP
        tip.ondblclick = function(){
            tip.style.visibility = "hidden";
        }

    }

}