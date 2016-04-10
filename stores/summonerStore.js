var Store = require('flux/utils').Store;
var Dispatcher = require('../dispatcher/dispatcher');

var SummonerStore = new Store(Dispatcher);

var _summoner = {};

SummonerStore.summoner = function() {
  return _summoner;
};

SummonerStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case 'RECEIVE_SUMMONER':
      resetSummoner(payload.summoner);
      SummonerStore.__emitChange();
      break;
  };
};

var resetSummoner = function(summoner) {
  _summoner = summoner;
  localStorage["summoner"] = JSON.stringify(summoner);
};

module.exports = SummonerStore;
