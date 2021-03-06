var Dispatcher = require('../dispatcher/dispatcher');

var LeagueActions = {

  setSummoner: function(summoner) {
    Dispatcher.dispatch({
      actionType: "SET_SUMMONER",
      summoner: summoner
    });
  },

  receiveChampions: function(champions) {
    Dispatcher.dispatch({
      actionType: "RECEIVE_CHAMPIONS",
      champions: champions
    });
  },

  receiveGames: function(games) {
    Dispatcher.dispatch({
      actionType: "RECEIVE_GAMES",
      games: games
    });
  },

  receiveSummaryStats: function(summaryStats) {
    Dispatcher.dispatch({
      actionType: "RECEIVE_STATS",
      stats: summaryStats
    });
  },

  receiveRankedData: function(data) {
    Dispatcher.dispatch({
      actionType: "RECEIVE_RANK",
      data: data
    });
  },

  receiveUnrankedData: function() {
    Dispatcher.dispatch({
      actionType: "NO_RANK"
    })
  },

  receiveCurrentGameData: function(game) {
    Dispatcher.dispatch({
      actionType: "CURRENT_GAME",
      game: game
    });
  },

  noCurrentGameAvailable: function() {
    Dispatcher.dispatch({
      actionType: "CURRENT_GAME",
      game: {gameId : 0}
    });
  },

  receiveTeamData: function(teamData) {
    Dispatcher.dispatch({
      actionType: "TEAM_DATA",
      teamData: teamData
    });
  }

};

module.exports = LeagueActions;
