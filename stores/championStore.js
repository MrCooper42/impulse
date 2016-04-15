var Store = require('flux/utils').Store;
var Dispatcher = require('../dispatcher/dispatcher');

var ChampionStore = new Store(Dispatcher);

var _champions = [];

ChampionStore.champions = function(){
  return _champions;
};

ChampionStore.__onDispatch = function(payload) {
  switch(payload.actionType){
    case 'RECEIVE_CHAMPIONS':
      resetChampions(payload.champions);
      ChampionStore.__emitChange();
      break;
  };
};

var resetChampions = function(champions) {
  _champions = champions;
  localStorage["champions"] = JSON.stringify(champions);
};




module.exports = ChampionStore;
