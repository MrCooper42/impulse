// REACT
var React = require('react');
var ReactDOM = require('react-dom');
var LeagueStore = require('./stores/summonerStore');

// FLUX
var leagueUtil = require('./util/leagueUtil.js')

// COMPONENTS
var Clock = require('./components/clock.jsx');
var Search = require('./components/searchSummoner.jsx');
var TopChampionsIndex = require('./components/topChampionsIndex.jsx');
var Weather = require('./components/weather.jsx');
// list of image urls
var bgUrls = require('./app/assets/images/bgUrls.js');

// ---------------CLASS DEFINITION ------------------------------------*****
var App = React.createClass({

  getUrl: function() {
    // chooses random url from list
    var idx = Math.random() * bgUrls.urls.length;
    idx = Math.floor(idx);
    return bgUrls.urls[idx];
  },


  render: function() {
    var divStyle = {
        height: '100%',
        width: '100%',
        backgroundImage: 'url(' + this.getUrl() + ')',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundSize: 'cover'
    }

    return (
      <div style={divStyle}>
        <Search />
        <Weather />
        <Clock />
      </div>
    )
  }
})

document.addEventListener("DOMContentLoaded", function() {
  var root = document.querySelector("#root");
  ReactDOM.render(<App />, root);
});
