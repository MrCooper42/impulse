var Dispatcher = require('../dispatcher/dispatcher');

var SettingActions = {
  receiveSettings: function(settings) {
    Dispatcher.dispatch({
      actionType: "RECEIVE_SETTINGS",
      settings: settings
    });
  }
};

module.exports = SettingActions;
