var Store = require('flux/utils').Store;
var Dispatcher = require('../dispatcher/dispatcher');

var DEFAULTS = require('../app/assets/objects/defaultSettings');

var SettingStore = new Store(Dispatcher);

var _settings = DEFAULTS;

SettingStore.settings = function() {
  return _settings
};

SettingStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case "RECEIVE_SETTINGS":
      resetSettings(payload.settings);
      SettingStore.__emitChange();
      break;
    case "REFRESH_SETTINGS":
      SettingStore.__emitChange();
      break;
  }
};

var resetSettings = function(settings) {
  _settings = settings;
  localStorage['widgetSettings'] = JSON.stringify(settings);
};


module.exports = SettingStore;
