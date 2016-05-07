var Store = require('flux/utils').Store;
var Dispatcher = require('../dispatcher/dispatcher');

var SummonerStore = new Store(Dispatcher);

var _summoner = {id: 0};
var _summaryStats = {};
var _rank = "";

SummonerStore.summoner = function() {
  return _summoner;
};

SummonerStore.stats = function() {
  return _summaryStats;
};

SummonerStore.rank = function() {
  return _rank;
};


SummonerStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case 'SET_SUMMONER':
      setSummoner(payload.summoner);
      SummonerStore.__emitChange();
      break;
    case 'RECEIVE_STATS':
      resetStats(payload.stats);
      SummonerStore.__emitChange();
      break;
    case 'RECEIVE_RANK':
      setRank(payload.data);
      SummonerStore.__emitChange();
      break;
    case 'NO_RANK':
      resetRank();
      SummonerStore.__emitChange();
      break;
  };
};

var setRank = function(data) {
  var summonerData = data[Object.keys(data)[0]][0];
  _rank = summonerData.tier + " " + summonerData.entries[0].division
  localStorage["summonerRank"] = _rank;
};

var resetRank = function() {
  _rank = "UNRANKED";
  localStorage["summonerRank"] = _rank;
};

var setSummoner = function(summoner) {
  _summoner = summoner;
  localStorage["summoner"] = JSON.stringify(_summoner);
};

var resetStats = function(summaryStats) {
  _summaryStats = summaryStats;
  localStorage["summaryStats"] = JSON.stringify(summaryStats);
};


var checkStorage = function() {
  if (localStorage['summoner']) {
    _summoner = JSON.parse(localStorage['summoner']);
  }
  if (localStorage['summaryStats']) {
    _summaryStats = JSON.parse(localStorage['summaryStats']);
  }
  if (localStorage['summonerRank']) {
    _rank = localStorage['summonerRank'];
  }
};

checkStorage();


module.exports = SummonerStore;
