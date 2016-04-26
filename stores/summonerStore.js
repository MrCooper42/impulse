var Store = require('flux/utils').Store;
var Dispatcher = require('../dispatcher/dispatcher');

var SummonerStore = new Store(Dispatcher);

var _summoner = {id: 0};
var _summaryStats = {};

SummonerStore.summoner = function() {
  return _summoner;
};

SummonerStore.stats = function() {
  return _summaryStats;
};

SummonerStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case 'RECEIVE_SUMMONER':
      resetSummoner(payload.summoner);
      SummonerStore.__emitChange();
      break;
    case 'SET_SUMMONER':
      setSummoner(payload.summoner);
      SummonerStore.__emitChange();
      break;
    case 'RECEIVE_STATS':
      resetStats(payload.stats);
      SummonerStore.__emitChange();
      break;
  };
};

var resetSummoner = function(summoner) {
  _summoner = summoner[Object.keys(summoner)[0]];
  localStorage["summoner"] = JSON.stringify(_summoner);
};

var setSummoner = function(summoner) {
  _summoner = summoner;
  localStorage["summoner"] = JSON.stringify(_summoner);
};

var resetStats = function(summaryStats) {
  _summaryStats = summaryStats;
  localStorage["summaryStats"] = JSON.stringify(summaryStats);
}

module.exports = SummonerStore;
