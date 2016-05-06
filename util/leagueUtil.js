var key = require('../app/assets/javascripts/keys.js');
var LeagueActions = require('../actions/leagueActions');

var LeagueUtil = {

  fetchSummonerInfo: function(summonerName){
    var that = this;
    $.ajax({
      url: "https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/" + summonerName + "?api_key=" + key.league,
      method: "GET",
      success: function(summoner) {
        that.fetchGameStats(summoner[Object.keys(summoner)[0]].id);
        that.fetchSummonerStats(summoner[Object.keys(summoner)[0]].id);
        that.fetchRankedInfo(summoner[Object.keys(summoner)[0]].id);
        that.fetchTopChampions(summoner[Object.keys(summoner)[0]].id);
        that.fetchCurrentGameInfo(summoner[Object.keys(summoner)[0]].id);
        LeagueActions.receiveSummoner(summoner);
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
    this.fetchCurrentGameInfo(summoner.id);
    this.fetchTopChampions(summoner.id);
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

        var team = gameData.participants.map(function(summoner) {
          return summoner.summonerId
        });

        LeagueUtil.fetchTeamData(team);
      },
      error: function(a, b, c) {
        LeagueActions.noCurrentGameAvailable();
      }
    });
  },

  fetchTeamData: function(summonerIds) {
    $.ajax({
      url: "https://na.api.pvp.net/api/lol/na/v1.4/summoner/" + summonerIds.join(",") + "?api_key=" + key.league,
      method: "GET",
      success: function(summonersInfo) {
        LeagueActions.receiveTeamData(summonersInfo);
      },
      error: function() {
        console.log("Teammates not found");
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
