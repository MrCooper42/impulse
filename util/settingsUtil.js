var SettingActions = require('../actions/settingActions');

var SettingsUtil = {
  setSettings: function(settings) {
    SettingActions.receiveSettings(settings);
  },

  setSummaryType: function(type) {
    SettingActions.receiveSummaryType(type);
  },

  refresh: function() {
    SettingActions.refresh();
  }
}

module.exports = SettingsUtil;
