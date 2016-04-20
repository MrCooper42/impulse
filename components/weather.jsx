var React = require('react');
var key = require('../app/assets/javascripts/keys.js');

var Weather = React.createClass({
  getInitialState: function () {
      return {weather: null}
  },

  componentDidMount: function(){
    navigator.geolocation.getCurrentPosition(this.pollWeather);
  },

  toQueryString: function(obj) {
    var parts = [];
    for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
            parts.push(encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]));
        }
    }
    return parts.join("&");
  },

  pollWeather: function (location) {
    var lat = location.coords.latitude;
    var long = location.coords.longitude;
    var url = "http://api.openweathermap.org/data/2.5/weather?";
    var params = {
      lat: lat,
      lon: long
    };
    url += this.toQueryString(params)
    url += "&APPID=" + key.weather

    var xmlhttp = new XMLHttpRequest();
    var that = this;
    xmlhttp.onreadystatechange = function () {
      //ready state of means this is complete
      if (xmlhttp.status == 200 && xmlhttp.readyState == XMLHttpRequest.DONE) {
        var data = JSON.parse(xmlhttp.responseText);
        that.setState({ weather: data });
      }
    }

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  },

  getWeatherImage: function(){
    var weather = this.state.weather.weather[0].main;
    if(weather === "Clear"){
      return <img src="http://res.cloudinary.com/mshencloudinary/image/upload/c_crop,g_south,h_30,w_50,x_3,y_16/v1461106714/01d_vrcpkx.png"/>
    } else if(weather === "Clouds"){
      return <img src="http://res.cloudinary.com/mshencloudinary/image/upload/c_crop,g_south,h_30,w_50,x_3,y_18/v1461106303/03d_ad0spm.png"/>
    } else if(weather === "Thunderstorm"){
      return <img src="http://res.cloudinary.com/mshencloudinary/image/upload/c_crop,g_south,h_30,w_50,x_3,y_18/v1461107621/11d_a8mm4o.png"/>
    } else if(weather === "Rain" || weather === "Drizzle"){
      return <img src="http://res.cloudinary.com/mshencloudinary/image/upload/c_crop,g_south,h_30,w_50,x_3,y_18/v1461107603/09n_xsjyiu.png"/>
    } else if(weather === "Snow"){
      return <img src="http://res.cloudinary.com/mshencloudinary/image/upload/c_crop,g_south,h_30,w_50,x_3,y_18/v1461107847/13d_zkqbv1.png"/>
    } else {
      return <img src="http://res.cloudinary.com/mshencloudinary/image/upload/c_crop,g_south,h_30,w_50,x_3,y_18/v1461107626/50d_qvjl1q.png"/>  
    }
  },

 render: function () {
    var string = "";
    var city = "";

    if (this.state.weather) {
      var weather = this.state.weather;
      var src = this.getWeatherImage();
      var temp = (weather.main.temp - 273.15) * 1.8 + 32;
      city = <div>{weather.name}</div>;
      string += temp.toFixed(1); 
      content = <span> {string}&deg;</span>

    }

    else {
      content = <div className="loader">Loading...</div>
    }

    return (
      <div className="weather">
          {src}
          {content}
          {city}
      </div>
    );
  }
});

module.exports = Weather;
