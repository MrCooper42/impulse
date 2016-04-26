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
           <li>Kills: {gameStats.championsKilled} --> {averages.killAvg}</li>
           <li>Deaths: {gameStats.numDeaths} --> {averages.deathAvg}</li>
           <li>Assists: {gameStats.assists} --> {averages.assistAvg}</li>
           <li>Gold/min: {(gameStats.goldEarned/playTime).toFixed(2)} --> {averages.goldAvg}</li>
           <li>CS/min: {gameStats.minionsKilled} --> {averages.minionAvg}</li>
           <li>Dmg/min: {gameStats.totalDamageDealtToChampions} --> {averages.damageAvg}</li>
        </ul>
      )
    } else {
      return (
        <div/>
      )
    }
  },


  render: function(){
        var lineData = [
          {
            name: "series1",
            values: [ { x: 0, y: 20 }, { x: 24, y: 10 } ],
            strokeWidth: 3,
            strokeDashArray: "5,5"
          }
        ];

    return (
      <div className="progression">
        {this.generateStats()}

        <LineChart
          xType={'time'}
          axes
          grid
          verticalGrid
          interpolate={'cardinal'}
          lineColors={['yellow', 'cyan']}
          width={750}
          height={250}
          data={[
            [{x: '1-Jan-15', y: 20}, {x: '1-Feb-15', y: 10}, {x: '1-Mar-15', y: 33}, {x: '1-Apr-15', y: 45}, {x: '1-May-15', y: 15}],
            [{x: '1-Jan-15', y: 10}, {x: '1-Feb-15', y: 15}, {x: '1-Mar-15', y: 13}, {x: '1-Apr-15', y: 15}, {x: '1-May-15', y: 10}]
          ]}
        />
        
      

      </div>
    )
  }

});

module.exports = Progression;
