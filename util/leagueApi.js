var key = require('../app/assets/javascripts/keys.js'); 

var LeagueUtil = {

  fetchSummonerInfo: function(){
    $.ajax({
      // TODO: add key
      url: "https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/" + localStorage["summoner"] + "?api_key=" + key.league,
      method: "GET",
      success: function(data) {
        window.testValue = data;
      },
      error: function(error) {
        window.testValue = "poop";
      }
    });
  }
}


module.exports = LeagueUtil;


