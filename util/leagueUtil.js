var key = require('../app/assets/javascripts/keys.js');
var LeagueActions = require('../actions/leagueActions');

var LeagueUtil = {

  fetchSummonerInfo: function(summonerName){
    $.ajax({
      url: "https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/" + summonerName + "?api_key=" + key.league,
      method: "GET",
      success: function(summoner) {
        LeagueActions.receiveSummoner(summoner)
      },
      error: function(error) {
        console.log("Summoner not found");
      }
    });
  },

  setSummoner: function(summoner) {
    LeagueActions.receiveSummoner(summoner);
  },

  fetchSummonerStats: function(summonerId) {
    $.ajax({
      url: "https://na.api.pvp.net/api/lol/na/v1.3/stats/by-summoner/60131288/summary?season=SEASON2016&api_key=" key.league,
      method: "GET",
      success: function(stats) {
        console.log("success!!");
      },
      error: function(error) {
        console.log("Error");
      }
    });
  }

}

module.exports = LeagueUtil;
