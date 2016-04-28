var React = require('react');
var SettingStore = require('../../stores/settingStore');
var SettingsUtil = require('../../util/settingsUtil');

var WIDGETS = require('../../app/assets/objects/widgetList');
var DEFAULTS = require('../../app/assets/objects/defaultSettings');

var Settings = React.createClass({

  getInitialState: function() {
    return ({
      settings: SettingStore.settings()
    });
  },

  componentDidMount: function() {
    this.settingsListener = SettingStore.addListener(this.update);
    if (localStorage['widgetSettings']) {
      SettingsUtil.setSettings(JSON.parse(localStorage['widgetSettings']));
    }
  },

  componentWillUnmount: function() {
    this.settingsListener.remove();
  },

  update: function() {
    this.setState({ settings: SettingStore.settings() });
  },

  changeSettings: function(event) {
    event.preventDefault();
    var widget = event.currentTarget.id;
    var newSettings = this.state.settings;
    newSettings[widget] = !newSettings[widget];
    SettingsUtil.setSettings(newSettings);
  },

  displaySettings: function() {
    that = this
    return Object.keys(this.state.settings).map(function(widget, idx) {
      var toggled = that.state.settings[widget] ? "settingsButtonOn" : "settingsButtonOff"
      return (
        <li key={idx}>
          <div>
            <span>{widget}</span>
            <button onClick={that.changeSettings} id={widget} className={toggled} value="toggle"/>
          </div>
        </li>
      );
    });
  },

  render: function() {
    return (
      <div className="settingsMenu">
        <ul>
          {this.displaySettings()}
        </ul>
      </div>
    );
  }

});

module.exports = Settings;
