// REACT
var React = require('react');
var ReactDOM = require('react-dom');
var LeagueStore = require('./stores/summonerStore');

// FLUX
var leagueUtil = require('./util/leagueUtil.js')

// SETTINGS
var DEFAULT_SETTINGS = require('./app/assets/objects/defaultSettings');
var WIDGETS = require('./app/assets/objects/widgetList');
var SettingStore = require('./stores/settingStore');

// COMPONENTS
var Clock = require('./components/clock.jsx');
var Search = require('./components/searchSummoner.jsx');
var TopChampionsIndex = require('./components/topChampionsIndex.jsx');
var Weather = require('./components/weather.jsx');
var RecentGame = require('./components/recentGame.jsx');
var CompareStats = require('./components/compareStats.jsx');
var Quote = require('./components/quotes.jsx');
var Settings = require('./components/settings.jsx');

// list of image urls
var bgUrls = require('./app/assets/images/bgUrls.js');

// ---------------CLASS DEFINITION ------------------------------------*****
var App = React.createClass({

  getInitialState: function() {
    return ({
      settings: DEFAULT_SETTINGS
    });
  },

  componentDidMount: function() {
    this.settingsListener = SettingStore.addListener(this.setSettings)
  },

  componentWillUnmount: function() {
    this.settingsListener.remove();
  },

  setSettings: function() {
    this.setState({settings: SettingStore.settings()})
  },

  getUrl: function() {
    // chooses random url from list
    var idx = Math.random() * bgUrls.urls.length;
    idx = Math.floor(idx);
    return bgUrls.urls[idx];
  },

  chooseWidgets: function() {
    var settings = this.state.settings
    return Object.keys(WIDGETS).map(function(widget) {
      if (settings[widget]) {
        return (WIDGETS[widget]);
      }
    });
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
    this.chooseWidgets();
    return (
      <div style={divStyle}>
        <Search />
        {this.chooseWidgets()}
        <Settings />
      </div>
    )
  }
})

document.addEventListener("DOMContentLoaded", function() {
  var root = document.querySelector("#root");
  ReactDOM.render(<App />, root);
});
