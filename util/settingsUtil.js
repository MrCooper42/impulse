var SettingActions = require('../actions/settingActions');

var SettingsUtil = {
  setSettings: function(settings) {
    SettingActions.receiveSettings(settings);
  }
}

module.exports = SettingsUtil;
