var Store = require('flux/utils').Store;
var Dispatcher = require('../dispatcher/dispatcher');

var GameStore = new Store(Dispatcher);

_games = [];

GameStore.allGames = function() {
  return _games;
};

GameStore.lastGame = function() {
  if (_games.length === 0) {
    return {};
  } else {
    return _games[0];
  }
};

GameStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case "RECEIVE_GAMES":
      resetGames(payload.games);
      GameStore.__emitChange();
      break;
  };
};

var resetGames = function(games) {
  _games = games;
};


module.exports = GameStore;
