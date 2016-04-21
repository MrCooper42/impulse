var React = require('react');
var GameStore = require('../stores/gameStore');
var SummonerStore = require('../stores/summonerStore');
var LeagueUtil = require('../util/leagueUtil')

var CHAMPIONS = require('../app/assets/objects/championsMap.js');



var CompareStats = React.createClass({
  getInitialState: function(){
    return {
      recentGame: GameStore.lastGame(),
      otherGames: GameStore.allGames().slice(1)
    };
  },

  componentDidMount: function(){
    this.gameListener = GameStore.addListener(this.update);
  },

  componentWillUnmount: function(){
    this.gameListener.remove();
  },

  update: function(){
    this.setState({
      recentGame: GameStore.lastGame(),
      otherGames: GameStore.allGames().slice(1)
    })
  },

  calcAverages: function(){
    var killSum = 0;
    var deathSum = 0;
    var assistSum = 0;
    var goldSum = 0;
    var minionSum = 0;
    var damageSum = 0;
    var gameTimeSum = 0;
    var numGames = this.state.otherGames.length;
    var recentGameLength = Math.floor(this.state.recentGame.stats.timePlayed/60);

    this.state.otherGames.forEach(function(game, idx){
      var stats = game.stats;
      killSum = stats.championsKilled ? killSum + stats.championsKilled : killSum;
      deathSum = stats.numDeaths ? deathSum + stats.numDeaths : deathSum;
      assistSum = stats.assists ? assistSum + stats.assists : assistSum;
      goldSum = stats.goldEarned ? goldSum + stats.goldEarned : goldSum;
      minionSum = stats.minionsKilled ? minionSum + stats.minionsKilled : minionSum;
      damageSum = stats.totalDamageDealtToChampions ? damageSum + stats.totalDamageDealtToChampions : damageSum;
      gameTimeSum = stats.timePlayed ? gameTimeSum + stats.timePlayed : gameTimeSum;
    });
    var avgGameTimeMin = Math.floor((gameTimeSum/numGames)/60);
    return {
      killAvg: (killSum/numGames).toFixed(2),
      deathAvg: (deathSum/numGames).toFixed(2),
      assistAvg: (assistSum/numGames).toFixed(2),
      goldAvg: ((goldSum/numGames)/avgGameTimeMin).toFixed(2),
      minionAvg: ((minionSum/numGames)/avgGameTimeMin).toFixed(2),
      damageAvg: ((damageSum/numGames)/avgGameTimeMin).toFixed(2)
    }
  },

  generateStats: function() {
    if (this.state.recentGame.stats) {
      var gameStats = this.state.recentGame.stats;
      var averages = this.calcAverages();
      var playTime = gameStats.timePlayed/60;

      gameStats.championsKilled = gameStats.championsKilled ? gameStats.championsKilled : 0;
      gameStats.numDeaths = gameStats.numDeaths ? gameStats.numDeaths : 0;
      gameStats.assists = gameStats.assists ? gameStats.assists : 0;
      gameStats.minionsKilled = gameStats.minionsKilled ? (gameStats.minionsKilled/playTime).toFixed(2) : 0;
      gameStats.totalDamageDealtToChampions = gameStats.totalDamageDealtToChampions ? (gameStats.totalDamageDealtToChampions/playTime).toFixed(2) : 0;


      return (
        <ul>
           <li>Kills: {gameStats.championsKilled} {this.killCompare()} ({averages.killAvg})</li>
           <li>Deaths: {gameStats.numDeaths} {this.deathCompare()} ({averages.deathAvg})</li>
           <li>Assists: {gameStats.assists} {this.assistCompare()} ({averages.assistAvg})</li>
           <li>Gold/min: {(gameStats.goldEarned/playTime).toFixed(2)} {this.goldCompare()} ({averages.goldAvg})</li>
           <li>CS/min: {gameStats.minionsKilled} {this.CSCompare()} ({averages.minionAvg})</li>
           <li>Dmg/min: {gameStats.totalDamageDealtToChampions} {this.dmgCompare()} ({averages.damageAvg})</li>
        </ul>
      )
    } else {
      return (
        <div/>
      )
    }
  },

  killCompare: function(){
    var gameStats = this.state.recentGame.stats;
    var averages = this.calcAverages();
    if(gameStats.championsKilled < averages.killAvg){
      return "↓";
    } else {
      return "↑";
    }
  },

  deathCompare: function(){
    var gameStats = this.state.recentGame.stats;
    var averages = this.calcAverages();
    if(gameStats.numDeaths < averages.deathAvg){
      return "↓";
    } else {
      return "↑";
    }
  },

  assistCompare: function(){
    var gameStats = this.state.recentGame.stats;
    var averages = this.calcAverages();
    if(gameStats.assists < averages.assistAvg){
      return "↓";
    } else {
      return "↑";
    }
  },

  goldCompare: function(){
    var gameStats = this.state.recentGame.stats;
    var averages = this.calcAverages();
    var playTime = gameStats.timePlayed/60;
    if(gameStats.goldEarned/playTime < averages.goldAvg){
      return "↓";
    } else {
      return "↑";
    }
  },

  CSCompare: function(){
    var gameStats = this.state.recentGame.stats;
    var averages = this.calcAverages();
    var playTime = gameStats.timePlayed/60;
    if(gameStats.minionsKilled < averages.minionAvg){
      return "↓";
    } else {
      return "↑";
    }
  },

  dmgCompare: function(){
    var gameStats = this.state.recentGame.stats;
    var averages = this.calcAverages();
    var playTime = gameStats.timePlayed/60;
    if(gameStats.totalDamageDealtToChampions < averages.damageAvg){
      return "↓";
    } else {
      return "↑";
    }
  },

  render: function(){
    return (
      <div className="compareStats">
        {this.generateStats()}
      </div>
    )
  }

});

module.exports = CompareStats;
