var Store = require('flux/utils').Store;
var Dispatcher = require('../dispatcher/dispatcher');

var StatsStore = new Store(Dispatcher);

_summaryType = "Unranked";

StatsStore.summaryType = function() {
  return _summaryType
};

StatsStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case "RECEIVE_SUMMARY_TYPE":
      resetSummaryType(payload.summaryType);
      StatsStore.__emitChange();
      break;
  }
};


var resetSummaryType = function(summaryType) {
  _summaryType = summaryType;
}

module.exports = StatsStore;
