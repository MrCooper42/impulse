var Dispatcher = require('../dispatcher/dispatcher');

var LeagueActions = {
  receiveSummoner: function(summoner) {
    Dispatcher.dispatch({
      actionType: "RECEIVE_SUMMONER",
      summoner: summoner
    });
  }
};

module.exports = LeagueActions;
