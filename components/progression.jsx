var React = require('react');
var GameStore = require('../stores/gameStore');
var SummonerStore = require('../stores/summonerStore');
var LeagueUtil = require('../util/leagueUtil');

var REC = require("react-easy-chart");
var LineChart = REC.LineChart;


var Progression = React.createClass({
  getInitialState: function(){
    return {
      recentGame: GameStore.lastGame(),
      otherGames: GameStore.allGames().slice(1),
      allGames: GameStore.allGames()
    };
  },

  componentDidMount: function(){
    this.gameListener = GameStore.addListener(this.update);
    if (localStorage['leagueGames']) {
    var games = JSON.parse(localStorage['leagueGames']);
    this.setState({
      recentGame: games.length === 0 ? {} : games[0],
      otherGames: games.slice(1),
      allGames: games
    });
  }
  },

  componentWillUnmount: function(){
    this.gameListener.remove();
  },

  update: function(){
    this.setState({
      recentGame: GameStore.lastGame(),
      otherGames: GameStore.allGames().slice(1),
      allGames: GameStore.allGames()
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
      var playTime = gameStats.timePlayed/60;
      var averages = this.calcAverages();
      var displayStats = {}

      displayStats.championsKilled = gameStats.championsKilled ? gameStats.championsKilled : 0;
      displayStats.numDeaths = gameStats.numDeaths ? gameStats.numDeaths : 0;
      displayStats.assists = gameStats.assists ? gameStats.assists : 0;
      displayStats.goldEarned = gameStats.goldEarned ? (gameStats.goldEarned/playTime).toFixed(2) : 0;
      displayStats.minionsKilled = gameStats.minionsKilled ? (gameStats.minionsKilled/playTime).toFixed(2) : 0;
      displayStats.totalDamageDealtToChampions = gameStats.totalDamageDealtToChampions ? (gameStats.totalDamageDealtToChampions/playTime).toFixed(2) : 0;

      return (
        <ul>
           <li>Kills: {displayStats.championsKilled} {this.killCompare(averages)} ({averages.killAvg})</li>
           <li>Deaths: {displayStats.numDeaths} {this.deathCompare(averages)} ({averages.deathAvg})</li>
           <li>Assists: {displayStats.assists} {this.assistCompare(averages)} ({averages.assistAvg})</li>
           <li>Gold/min: {displayStats.goldEarned} {this.goldCompare(averages)} ({averages.goldAvg})</li>
           <li>CS/min: {displayStats.minionsKilled} {this.CSCompare(averages)} ({averages.minionAvg})</li>
           <li>Dmg/min: {displayStats.totalDamageDealtToChampions} {this.dmgCompare(averages)} ({averages.damageAvg})</li>
        </ul>
      )
    } else {
      return (
        <div/>
      )
    }
  },

  killCompare: function(averages){
    var gameStats = this.state.recentGame.stats;
    if(gameStats.championsKilled < averages.killAvg){
      return "↓";
    } else {
      return "↑";
    }
  },

  deathCompare: function(averages){
    var gameStats = this.state.recentGame.stats;
    if(gameStats.numDeaths < averages.deathAvg){
      return "↓";
    } else {
      return "↑";
    }
  },

  assistCompare: function(averages){
    var gameStats = this.state.recentGame.stats;
    if(gameStats.assists < averages.assistAvg){
      return "↓";
    } else {
      return "↑";
    }
  },

  goldCompare: function(averages){
    var gameStats = this.state.recentGame.stats;
    var playTime = gameStats.timePlayed/60;
    if(gameStats.goldEarned/playTime < averages.goldAvg){
      return "↓";
    } else {
      return "↑";
    }
  },

  CSCompare: function(averages){
    var gameStats = this.state.recentGame.stats;
    var playTime = gameStats.timePlayed/60;
    if(gameStats.minionsKilled/playTime < averages.minionAvg){
      return "↓";
    } else {
      return "↑";
    }
  },

  dmgCompare: function(averages){
    var gameStats = this.state.recentGame.stats;
    var playTime = gameStats.timePlayed/60;
    if(gameStats.totalDamageDealtToChampions/playTime < averages.damageAvg){
      return "↓";
    } else {
      return "↑";
    }
  },

  getData: function(){

    if (this.state.allGames) {
      
      
      console.log(this.state.allGames)

    } else {
      console.log("nope")
    }

    return [
            [{x: '1-Jan-15', y: 20}, {x: '1-Feb-15', y: 10}, {x: '1-Mar-15', y: 33}, {x: '1-Apr-15', y: 45}, {x: '1-May-15', y: 15}],

            [{x: '1-Jan-15', y: 10}, {x: '1-Feb-15', y: 15}, {x: '1-Mar-15', y: 13}, {x: '1-Apr-15', y: 15}, {x: '1-May-15', y: 10}]
    ];
  },

  render: function(){


    return (
      <div className="progression">
        {this.generateStats()}

        <LineChart
          xType={'time'}
          axes
          grid
          verticalGrid
          interpolate={'cardinal'}
          lineColors={['red', 'blue']}
          width={750}
          height={250}
          data={this.getData()}
        />
        
      

      </div>
    )
  }

});

module.exports = Progression;
