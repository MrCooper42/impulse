var SettingActions = require('../actions/settingActions');

var SettingsUtil = {
  setSettings: function(settings) {
    SettingActions.receiveSettings(settings);
  },

  setSummaryType: function(type) {
    SettingActions.receiveSummaryType(type);
  }
}

module.exports = SettingsUtil;
