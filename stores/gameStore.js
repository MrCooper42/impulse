var Store = require('flux/utils').Store;
var Dispatcher = require('../dispatcher/dispatcher');

var GameStore = new Store(Dispatcher);

var _games = [];

if (localStorage['leagueGames']) {
  _games = JSON.parse(localStorage['leagueGames']);
}

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
  localStorage['leagueGames'] = JSON.stringify(games)
};


module.exports = GameStore;
