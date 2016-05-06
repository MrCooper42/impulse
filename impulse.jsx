// REACT
var React = require('react');
var ReactDOM = require('react-dom');
var LeagueStore = require('./stores/summonerStore');

// FLUX
var leagueUtil = require('./util/leagueUtil')
var SettingsUtil = require('./util/settingsUtil')

// STORES
var SettingStore = require('./stores/settingStore');

// SETTINGS
var DEFAULT_SETTINGS = require('./app/assets/objects/defaultSettings');
var WIDGETS = require('./app/assets/objects/widgetList');

// COMPONENTS
var SettingsButton = require('./components/settings/settingsButton');
var LockBackground = require('./components/settings/lockBackground');
var RefreshBackground = require('./components/settings/refreshBackground');
var HideAllButton = require('./components/settings/hideAllButton');

// list of image urls
var bgUrls = require('./app/assets/images/bgUrls');

// ---------------CLASS DEFINITION ------------------------------------*****
var App = React.createClass({

  getInitialState: function() {
    var settings = SettingStore.settings();
    if (localStorage['widgetSettings']) {
      settings = JSON.parse(localStorage['widgetSettings']);
      SettingsUtil.setSettings(settings);
    }
    return ({
      settings: settings
    });
  },

  componentDidMount: function() {
    this.settingsListener = SettingStore.addListener(this.setSettings);
  },

  componentWillUnmount: function() {
    this.settingsListener.remove();
  },

  setSettings: function() {
    this.setState( { settings: SettingStore.settings() } )
  },

  getUrl: function() {
    // chooses random url from list
    if (!localStorage['bgUrl']) {
      this.generateBgUrl()
    } else if (localStorage['bgLocked'] === 'false'){
      var previousUrlUpdate = new Date(JSON.parse(localStorage['bgUrl']).date)
      var currentDate = new Date();
      if (currentDate.getDate() !== previousUrlUpdate.getDate()) {
        this.generateBgUrl();
      }
    }
  },

  generateBgUrl: function() {
    var idx = Math.random() * bgUrls.urls.length;
    idx = Math.floor(idx);
    localStorage['bgUrl'] = JSON.stringify({
      url: bgUrls.urls[idx],
      date: new Date()
    })
  },

  displayWidgets: function() {
    var settings = this.state.settings
    return Object.keys(WIDGETS).map(function(widget, idx) {
      if (settings[widget]) {
        return (WIDGETS[widget]);
      } else {
        return (<div key={idx}/>)
      }
    });
  },

  getDisplay: function() {
    if (localStorage['hideAll'] === 'true') {
      return <div/>
    } else {
      return this.displayWidgets()
    }
  },

  getBackgroundButtons: function() {
    var buttons = (
      <LockBackground />
    );
    if (localStorage['bgLocked'] !== 'true') {
      buttons = (
        <div>
          <LockBackground />
          <RefreshBackground />
        </div>
      );
    };

    if (localStorage['hideAll'] !== "true"){
      return buttons;
    } else{
      return <div/>
    }
  },

  render: function() {
    this.getUrl()
    var divStyle = {
        height: '100%',
        width: '100%',
        backgroundImage: 'url(' + JSON.parse(localStorage['bgUrl']).url + ')',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundSize: 'cover'
    }

    return (
      <div className="bg" style={divStyle}>
        {this.getDisplay()}
        <HideAllButton />
        <SettingsButton />
        {this.getBackgroundButtons()}
      </div>
    )
  }
})

document.addEventListener("DOMContentLoaded", function() {
  var root = document.querySelector("#root");
  ReactDOM.render(<App />, root);
});
