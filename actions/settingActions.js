var Dispatcher = require('../dispatcher/dispatcher');

var SettingActions = {
  receiveSettings: function(settings) {
    Dispatcher.dispatch({
      actionType: "RECEIVE_SETTINGS",
      settings: settings
    });
  },

  receiveSummaryType: function(type) {
    Dispatcher.dispatch({
      actionType: "RECEIVE_SUMMARY_TYPE",
      summaryType: type
    })
  }
};

module.exports = SettingActions;
