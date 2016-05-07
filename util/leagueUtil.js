var key = require('../app/assets/javascripts/keys.js');
var LeagueActions = require('../actions/leagueActions');

var LeagueUtil = {

  fetchSummonerInfo: function(summonerName){
    var that = this;
    $.ajax({
      url: "https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/" + summonerName + "?api_key=" + key.league,
      method: "GET",
      success: function(summoner) {
        LeagueUtil.setSummoner(summoner[Object.keys(summoner)[0]]);
      },
      error: function(error) {
        window.alert("Summoner not found");
      }
    });
  },

  setSummoner: function(summoner) {
    LeagueActions.setSummoner(summoner);
    this.fetchGameStats(summoner.id);
    this.fetchSummonerStats(summoner.id);
    this.fetchTopChampions(summoner.id);
    this.fetchRankedInfo(summoner.id);
    this.fetchCurrentGameInfo(summoner.id);
  },

  fetchSummonerStats: function(summonerId) {
    $.ajax({
      url: "https://na.api.pvp.net/api/lol/na/v1.3/stats/by-summoner/" + summonerId + "/summary?season=SEASON2016&api_key=" + key.league,
      method: "GET",
      success: function(stats) {
        LeagueActions.receiveSummaryStats(stats);
      },
      error: function(error) {
        console.log("Summoner Summary Error");
      }
    });
  },

  fetchGameStats: function(summonerId) {
    $.ajax({
      url: "https://na.api.pvp.net/api/lol/na/v1.3/game/by-summoner/" + summonerId + "/recent?api_key=" + key.league,
      method: "GET",
      success: function(data) {
        LeagueActions.receiveGames(data.games);
      },
      error: function(error) {
        console.log("No Games Found");
      }
    })
  },

  fetchRankedInfo: function(summonerId) {
    $.ajax({
      url: "https://na.api.pvp.net/api/lol/na/v2.5/league/by-summoner/" + summonerId + "/entry?api_key=" + key.league,
      method: "GET",
      success: function(data) {
        LeagueActions.receiveRankedData(data);
      },
      error: function(error) {
        LeagueActions.receiveUnrankedData();
      }
    });
  },

  fetchCurrentGameInfo: function(summonerId) {
    $.ajax({
      url: "https://na.api.pvp.net/observer-mode/rest/consumer/getSpectatorGameInfo/NA1/" + summonerId + "?api_key=" + key.league,
      method: "GET",
      success: function(gameData) {
        LeagueActions.receiveCurrentGameData(gameData);
      },
      error: function(error) {
        LeagueActions.noCurrentGameAvailable();
      }
    });
  },

  fetchTopChampions: function(summonerId){
    $.ajax({
      url: "https://na.api.pvp.net/championmastery/location/NA1/player/" + summonerId + "/topchampions?api_key=" + key.league,
      method: "GET",
      success: function(champions) {
        LeagueActions.receiveChampions(champions);
      },
      error: function(error){
        console.log("Champions not found");
      }
    });
  },

  setChampions: function(champions){
    LeagueActions.receiveChampions(champions);
  },

}



module.exports = LeagueUtil;
