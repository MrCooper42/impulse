var Dispatcher = require('../dispatcher/dispatcher');

var LeagueActions = {
  receiveSummoner: function(summoner) {
    Dispatcher.dispatch({
      actionType: "RECEIVE_SUMMONER",
      summoner: summoner
    });
  },


  receiveChampions: function(champions) {
    Dispatcher.dispatch({
      actionType: "RECEIVE_CHAMPIONS",
      champions: champions
    });
  }
};

module.exports = LeagueActions;
