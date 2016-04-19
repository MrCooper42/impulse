var Store = require('flux/utils').Store;
var Dispatcher = require('../dispatcher/dispatcher');

var SettingStore = new Store(Dispatcher);

_settings = {};

SettingStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case "RECEIVE_SETTINGS":
      resetSettings(payload.settings);
      SettingStore.__emitChange();
      break;
  }
};

var resetSettings = function(settings) {
  _settings = settings;
  localStorage['widgetSettings'] = JSON.stringify(settings);
};


module.exports = SettingStore;
