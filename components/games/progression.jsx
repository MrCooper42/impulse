var React = require('react');
var GameStore = require('../../stores/gameStore');
var SummonerStore = require('../../stores/summonerStore');
var LeagueUtil = require('../../util/leagueUtil');

var REC = require("react-easy-chart");
var LineChart = REC.LineChart;


var Progression = React.createClass({
  getInitialState: function(){
    return {
      recentGame: GameStore.lastGame(),
      otherGames: GameStore.allGames().slice(1),
      allGames: GameStore.allGames(),
      KDAdisplay: [true, true, true],
      lineColors: ["#F9BA32", "#426E86" , "#2F3131"],
      KDA: true,
      Gold: false,
      CS: false,
      Dmg: false,
      KDAoptions: true
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



  getAllData: function(){

    if (this.state.allGames.length > 0) {
      var killDates = [];
      var deathDates = [];
      var assistDates = [];
      var goldDates = [];
      var CSDates = [];
      var DmgDates = [];
      var allGames = this.state.allGames;

      allGames.forEach(function(game, idx){
        killDates.push({x: 10-idx, y: (game.stats.championsKilled ? game.stats.championsKilled : 0)})
      });
      allGames.forEach(function(game, idx){
        deathDates.push({x: 10-idx, y: (game.stats.numDeaths ? game.stats.numDeaths : 0)})
      });
      allGames.forEach(function(game, idx){
        assistDates.push({x: 10-idx, y: (game.stats.assists ? game.stats.assists : 0)})
      });

      allGames.forEach(function(game, idx){
        goldDates.push({x:10-idx, y: (game.stats.goldEarned ? game.stats.goldEarned : 0)})
      });

      allGames.forEach(function(game, idx){
        CSDates.push({x:10-idx, y: (game.stats.minionsKilled ? game.stats.minionsKilled : 0)})
      });   

      allGames.forEach(function(game, idx){
        DmgDates.push({x:10-idx, y: (game.stats.totalDamageDealtToChampions ? game.stats.totalDamageDealtToChampions : 0)})
      });


      var result = [];

      if(this.state.Gold){
        result.push(goldDates)
      } 
      else if(this.state.CS){
        result.push(CSDates)
      }
      else if(this.state.Dmg){
        result.push(DmgDates)
      }
      else if(this.state.KDA){
          if (this.state.KDAdisplay[0]){
            result.push(killDates);
          }

          if(this.state.KDAdisplay[1]){
            result.push(deathDates);
          }

          if(this.state.KDAdisplay[2]){
            result.push(assistDates)
          }
      }

      return result.length === 0 ? [[{x: 0, y:0}]] : result

    } else {
        return [
          [{x: 0, y:0}]
        ];
    }
  },

  showK: function(){
    var oldDisplay = this.state.KDAdisplay
    var newDisplay = [!oldDisplay[0], oldDisplay[1], oldDisplay[2]];
    this.setState({
      KDAdisplay: newDisplay
    });
  },

  showD: function(){
    var oldDisplay = this.state.KDAdisplay
    var newDisplay = [oldDisplay[0], !oldDisplay[1], oldDisplay[2]];
    this.setState({
      KDAdisplay: newDisplay
    });
  },

  showA: function(){
    var oldDisplay = this.state.KDAdisplay
    var newDisplay = [oldDisplay[0], oldDisplay[1], !oldDisplay[2]];
    this.setState({
      KDAdisplay: newDisplay
    });
  },

  showKDA: function(){
    this.setState({KDA: true, Gold: false, CS: false, Dmg: false})
    this.setState({KDAdisplay: [true, true, true]})
    this.setState({KDAoptions: true})
  },

  showGold: function(){
    this.setState({KDA: false, Gold: true, CS: false, Dmg: false});
    this.setState({KDAoptions: false})
  },

  showMinions: function(){
    this.setState({KDA: false, Gold: false, CS: true, Dmg: false});
    this.setState({KDAoptions: false})
  },

  showDmg: function(){
    this.setState({KDA: false, Gold: false, CS: false, Dmg: true});
    this.setState({KDAoptions: false})
  },

  getLineColors: function(){

    var colors = [];
    var that = this;
    this.state.KDAdisplay.forEach(function(el, idx){
      if(el){
        colors.push(that.state.lineColors[idx]);
      }
    });
    return colors


  },

  render: function(){

    var KDAoptions;

    if(this.state.KDAoptions){
      KDAoptions = "showKDAoptions";
    } else {
      KDAoptions = "hideKDAoptions";
    }

    return (
      <div className="progression">
        <LineChart 
          axes
          axisLabels={{x: 'Game (most recent)', y: ''}}
          dataPoints
          grid
          xTicks={5}
          verticalGrid
          interpolate={'linear'}
          xDomainRange={[1,10]}
          lineColors={this.getLineColors()}
          width={500}
          height={250}
          data={this.getAllData()}/>

        <div id="KDAoptions" className={KDAoptions}>    
          <span onClick={this.showK}>Kill</span>
          <span onClick={this.showD}>Death</span>
          <span onClick={this.showA}>Assist</span>
        </div>

        <div id="progressionOptions">
          <span onClick={this.showKDA}>KDA</span>
          <span onClick={this.showGold}>Gold</span>
          <span onClick={this.showMinions}>CS</span>
          <span onClick={this.showDmg}>Damage</span>
        </div>


      </div>
    )
  }

});

module.exports = Progression;
