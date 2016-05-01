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
      lineColors: ["#A01D26", "#20232A" , "#ACBEBE"],
      KDA: true,
      Gold: false,
      CS: false,
      Dmg: false,
      Time: false,
      KDAoptions: true,
      showToolTip: false,
      top: '',
      left:'',
      x:0,
      y:0
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
      var TimeDates = [];
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

      allGames.forEach(function(game, idx){
        TimeDates.push({x:10-idx, y: (game.stats.timePlayed ? game.stats.timePlayed : 0)})
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
      else if(this.state.Time){
        result.push(TimeDates)
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
    this.setState({KDA: true, Gold: false, CS: false, Dmg: false, Time: false})
    this.setState({KDAdisplay: [true, true, true]})
    this.setState({KDAoptions: true})
  },

  showGold: function(){
    this.setState({KDA: false, Gold: true, CS: false, Dmg: false, Time: false});
    this.setState({KDAoptions: false})
  },

  showMinions: function(){
    this.setState({KDA: false, Gold: false, CS: true, Dmg: false, Time: false});
    this.setState({KDAoptions: false})
  },

  showDmg: function(){
    this.setState({KDA: false, Gold: false, CS: false, Dmg: true, Time: false});
    this.setState({KDAoptions: false})
  },

  showTime: function(){
    this.setState({KDA: false, Gold: false, CS: false, Dmg: false, Time: true});
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

  getLabels: function(){
    states = [this.state.KDA, this.state.Gold, this.state.CS, this.state.Dmg, this.state.Time];
    
    if(states[0] && states[1] === false && states[2] === false && states[3] === false && states[4] === false){
      return {x: 'Game (most recent)', y: 'Stats'};
    } else if(states[1] && states[0] === false && states[2] === false && states[3] === false && states[4] === false){
      return {x: 'Game (most recent)', y: 'Gold'};
    } else if(states[2] && states[0] === false && states[1] === false && states[3] === false && states[4] === false){
      return {x: 'Game (most recent)', y: 'CS'};
    } else if(states[3] && states[0] === false && states[1] === false && states[2] === false && states[4] === false){
      return {x: 'Game (most recent)', y: 'Dmg to Champ'};
    } else {
      return {x: 'Game (most recent)', y: 'Time (s)'};
    }


  },

  mouseOverHandler: function(d, e) {
    this.setState({
      showToolTip: true,
      y: d.y,
      x: d.x});
    console.log(d.x + " game " + d.y + " kills");
  },

  mouseMoveHandler: function(e) {
    if (this.state.showToolTip) {
      this.setState({top: `${e.y - 10}px`, left: `${e.x + 10}px`});
    }
  },

  mouseOutHandler: function() {
    this.setState({showToolTip: false});
  },


  render: function(){

    
    if(this.state.KDAoptions){
      KDAoptions = "showKDAoptions";
    } else {
      KDAoptions = "hideKDAoptions";
    }

    if(this.state.KDAdisplay[0]){
      onToggleKill = "onToggleKill"
    } else {
      onToggleKill = ""
    }

    if(this.state.KDAdisplay[1]){
      onToggleDeath = "onToggleDeath"
    } else {
      onToggleDeath = ""
    }

    if(this.state.KDAdisplay[2]){
      onToggleAssist = "onToggleAssist"
    } else {
      onToggleAssist = ""
    }

    if(this.state.KDAoptions){
      toggleKDAoptions = "toggleKDAoptions"
    } else {
      toggleKDAoptions = ""
    }

    if(this.state.Gold){
      toggleGold = "toggleGold"
    } else {
      toggleGold = ""
    }


    if(this.state.CS){
      toggleCS = "toggleCS"
    } else {
      toggleCS = ""
    }

    if(this.state.Dmg){
      toggleDmg = "toggleDmg"
    } else {
      toggleDmg = ""
    }

    if(this.state.Time){
      toggleTime = "toggleTime"
    } else {
      toggleTime = ""
    }

    return (
      <div className="progression">

        <LineChart 
          axes
          axisLabels={this.getLabels()}
          dataPoints
          grid
          xTicks={5}
          yTicks={8}
          verticalGrid
          interpolate={'linear'}
          xDomainRange={[1,10]}
          mouseOverHandler={this.mouseOverHandler}
          mouseOutHandler={this.mouseOutHandler}
          mouseMoveHandler={this.mouseMoveHandler}
          lineColors={this.getLineColors()}
          width={500}
          height={250}
          data={this.getAllData()}/>

        <a className="xAndY">{this.state.x} {this.state.y}</a>

        <div id="KDAoptions" className={KDAoptions}>    
          <span className={onToggleKill} onClick={this.showK}>Kill</span>
          <span className={onToggleDeath} onClick={this.showD}>Death</span>
          <span className={onToggleAssist} onClick={this.showA}>Assist</span>
        </div>

        <div id="progressionOptions">
          <span className={toggleKDAoptions} onClick={this.showKDA}>KDA</span>
          <span className={toggleGold} onClick={this.showGold}>Gold</span>
          <span className={toggleCS} onClick={this.showMinions}>CS</span>
          <span className={toggleDmg} onClick={this.showDmg}>Damage</span>
          <span className={toggleTime} onClick={this.showTime}>Time</span>
        </div>


      </div>
    )
  }

});

module.exports = Progression;
