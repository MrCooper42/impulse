var Store = require('flux/utils').Store;
var Dispatcher = require('../dispatcher/dispatcher');

var GameStore = new Store(Dispatcher);

var _games = [];
var _currentGame = {gameId : 0};

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

GameStore.currentGame = function() {
  return _currentGame;
};

GameStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case "RECEIVE_GAMES":
      resetGames(payload.games);
      GameStore.__emitChange();
      break;
    case "CURRENT_GAME":
      resetCurrentGame(payload.game);
      GameStore.__emitChange();
      break;
  };
};

var resetGames = function(games) {
  _games = games;
  localStorage['leagueGames'] = JSON.stringify(games)
};

var resetCurrentGame = function(game) {
  _currentGame = game;
  localStorage['currentGame'] = JSON.stringify(game);
};

var checkStorage = function() {
  if (localStorage['leagueGames']) {
    _games = JSON.parse(localStorage['leagueGames']);
  }
  if (localStorage['currentGame']) {
    _currentGame = JSON.parse(localStorage['currentGame']);
  }
};

checkStorage();

module.exports = GameStore;
