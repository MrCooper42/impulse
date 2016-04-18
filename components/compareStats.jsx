var React = require('react');
var GameStore = require('../stores/gameStore');

var CHAMPIONS = require('../app/assets/maps/champions.js');

var CompareStats = React.createClass({
  getInitialState: function(){
    return {
      recentGame: {},
      otherGames: []
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
    var numGames = this.state.otherGames.length;

    this.state.otherGames.forEach(function(game, idx){
      killSum = game.stats.championsKilled ? killSum + game.stats.championsKilled : killSum;
      deathSum = game.stats.numDeaths ? deathSum + game.stats.numDeaths : deathSum;
      assistSum = game.stats.assists ? assistSum + game.stats.assists : assistSum;
      goldSum = game.stats.goldEarned ? goldSum + game.stats.goldEarned : goldSum;
      minionSum = game.stats.minionsKilled ? minionSum + game.stats.minionsKilled : minionSum;
      damageSum = game.stats.totalDamageDealtToChampions ? damageSum + game.stats.totalDamageDealtToChampions : damageSum;
    });
    return {
      killAvg: (killSum/numGames).toFixed(2),
      deathAvg: (deathSum/numGames).toFixed(2),
      assistAvg: (assistSum/numGames).toFixed(2),
      goldAvg: (goldSum/numGames).toFixed(2),
      minionAvg: (minionSum/numGames).toFixed(2),
      damageAvg: (damageSum/numGames).toFixed(2)
    }
  },

  generateStats: function() {




    if (this.state.recentGame.stats) {
      var gameStats = this.state.recentGame.stats;
      var averages = this.calcAverages();

      gameStats.championsKilled = gameStats.championsKilled ? gameStats.championsKilled : 0;
      gameStats.numDeaths = gameStats.numDeaths ? gameStats.numDeaths : 0;
      gameStats.assists = gameStats.assists ? gameStats.assists : 0;
      gameStats.minionsKilled = gameStats.minionsKilled ? gameStats.minionsKilled : 0;
      gameStats.totalDamageDealtToChampions = gameStats.totalDamageDealtToChampions ? gameStats.totalDamageDealtToChampions : 0;


      return (
        <ul>
           <li>Kills: {gameStats.championsKilled} --> {averages.killAvg}</li>
           <li>Deaths: {gameStats.numDeaths} --> {averages.deathAvg}</li>
           <li>Assists: {gameStats.assists} --> {averages.assistAvg}</li>
           <li>Gold: {gameStats.goldEarned} --> {averages.goldAvg}</li>
           <li>Minions: {gameStats.minionsKilled} --> {averages.minionAvg}</li>
           <li>Damage: {gameStats.totalDamageDealtToChampions} --> {averages.damageAvg}</li>
        </ul>
      )
    } else {
      return (
        <div/>
      )
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