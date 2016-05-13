var React = require('react');
var GameStore = require('../../stores/gameStore');
var SummonerStore = require('../../stores/summonerStore');
var LeagueUtil = require('../../util/leagueUtil');

var REC = require("react-easy-chart");
var LineChart = REC.LineChart;

// COMPONENTS
var ProgressionToolTip = require('./progressionToolTip');
var PastGame = require('./pastGame');

// MODAL
var Modal = require('boron/OutlineModal');

// MODAL STYLE
var modalStyle = {
};

var backdropStyle = {
};

var contentStyle = {
};

var Progression = React.createClass({
  getInitialState: function(){
    return {
      recentGame: GameStore.lastGame(),
      otherGames: GameStore.allGames().slice(1),
      allGames: GameStore.allGames(),
      KDAdisplay: [true, true, true],
      GoldDisplay: [true, false],
      CSDisplay: [true, false],
      DmgDisplay: [true, false],
      lineColors: ["#EAA732", "#A01D26" , "#C3C2BE"],
      KDA: true,
      Gold: false,
      CS: false,
      Dmg: false,
      Time: false,
      KDAoptions: true,
      goldOptions: false,
      CSOptions: false,
      DmgOptions: false,


      showToolTip: false,
      top: "",
      left: "",
      x:0,
      y:0,

      selectedGame: 0
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

  showModal: function(){
    this.refs.modal.show();
  },

  hideModal: function(){
    this.refs.modal.hide();
  },

  getAllData: function(){

    if (this.state.allGames.length > 0) {
      var killDates = [];
      var deathDates = [];
      var assistDates = [];

      var goldDates = [];
      var goldAvg = [];

      var CSDates = [];
      var CSAvg = [];

      var DmgDates = [];
      var DmgAvg = [];

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
        goldDates.push({x:10-idx, y: (game.stats.goldEarned ? Math.floor(game.stats.goldEarned/1000) : 0)})
      });

      allGames.forEach(function(game, idx){
        goldAvg.push({x:10-idx, y: (game.stats.goldEarned/game.stats.timePlayed ? (game.stats.goldEarned/(game.stats.timePlayed/60)).toFixed(2): 0)})
      });


      allGames.forEach(function(game, idx){
        CSDates.push({x:10-idx, y: (game.stats.minionsKilled ? game.stats.minionsKilled : 0)})
      });

      allGames.forEach(function(game, idx){
        CSAvg.push({x:10-idx, y: (game.stats.minionsKilled/game.stats.timePlayed ? parseInt((game.stats.minionsKilled/(game.stats.timePlayed/60)).toFixed(2)): 0)})
      });


      allGames.forEach(function(game, idx){
        DmgDates.push({x:10-idx, y: (game.stats.totalDamageDealtToChampions ? Math.floor(game.stats.totalDamageDealtToChampions/1000) : 0)})
      });

      allGames.forEach(function(game, idx){
        DmgAvg.push({x:10-idx, y: (game.stats.totalDamageDealtToChampions ? parseInt(((game.stats.totalDamageDealtToChampions)/(game.stats.timePlayed/60)).toFixed(2)): 0)})
      });


      allGames.forEach(function(game, idx){
        TimeDates.push({x:10-idx, y: (game.stats.timePlayed ? Math.floor(game.stats.timePlayed/60) : 0)})
      });

      var result = [];

      if(this.state.Gold){
        if(this.state.GoldDisplay[0]){
          result.push(goldDates);
        }

        if(this.state.GoldDisplay[1]){
          result.push(goldAvg);
        }
      }
      else if(this.state.CS){
        if(this.state.CSDisplay[0]){
          result.push(CSDates);
        }

        if(this.state.CSDisplay[1]){
          result.push(CSAvg);
        }
      }
      else if(this.state.Dmg){
        if(this.state.DmgDisplay[0]){
          result.push(DmgDates);
        }

        if(this.state.DmgDisplay[1]){
          result.push(DmgAvg);
        }
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

  showTotalGold: function(){
    var oldDisplay = this.state.GoldDisplay
    var newDisplay = [true, false];
    this.setState({
      GoldDisplay: newDisplay
    });
  },

  showAvgGold: function(){
    var oldDisplay = this.state.GoldDisplay
    var newDisplay = [false, true];
    this.setState({
      GoldDisplay: newDisplay
    });
  },

  showTotalCS: function(){
    var oldDisplay = this.state.CSDisplay
    var newDisplay = [true, false];
    this.setState({
      CSDisplay: newDisplay
    });
  },

  showAvgCS: function(){
    var oldDisplay = this.state.CSDisplay
    var newDisplay = [false, true];
    this.setState({
      CSDisplay: newDisplay
    });
  },

  showTotalDmg: function(){
    var oldDisplay = this.state.DmgDisplay
    var newDisplay = [true, false];
    this.setState({
      DmgDisplay: newDisplay
    });
  },

  showAvgDmg: function(){
    var oldDisplay = this.state.DmgDisplay
    var newDisplay = [false, true];
    this.setState({
      DmgDisplay: newDisplay
    });
  },

  showKDA: function(){
    this.setState({KDA: true, Gold: false, CS: false, Dmg: false, Time: false})
    this.setState({KDAdisplay: [true, true, true]})
    this.setState({KDAoptions: true})
    this.setState({goldOptions: false})
    this.setState({CSOptions: false})
    this.setState({DmgOptions: false})
  },

  showGold: function(){
    this.setState({KDA: false, Gold: true, CS: false, Dmg: false, Time: false});
    this.setState({GoldDisplay: [true, false]})
    this.setState({KDAoptions: false})
    this.setState({goldOptions: true})
    this.setState({CSOptions: false})
    this.setState({DmgOptions: false})
  },

  showMinions: function(){
    this.setState({KDA: false, Gold: false, CS: true, Dmg: false, Time: false});
    this.setState({KDAoptions: false})
    this.setState({goldOptions: false})
    this.setState({CSOptions: true})
    this.setState({DmgOptions: false})
  },

  showDmg: function(){
    this.setState({KDA: false, Gold: false, CS: false, Dmg: true, Time: false});
    this.setState({KDAoptions: false})
    this.setState({goldOptions: false})
    this.setState({CSOptions: false})
    this.setState({DmgOptions: true})
  },

  showTime: function(){
    this.setState({KDA: false, Gold: false, CS: false, Dmg: false, Time: true});
    this.setState({KDAoptions: false})
    this.setState({goldOptions: false})
    this.setState({CSOptions: false})
    this.setState({DmgOptions: false})
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
        if(this.state.GoldDisplay[0])
          return {x: 'Game (most recent)', y: 'Gold (1000\'s\)' };
        else{
          return {x: 'Game (most recent)', y: 'Gold/min'};
        }
    } else if(states[2] && states[0] === false && states[1] === false && states[3] === false && states[4] === false){
        if(this.state.CSDisplay[0])
          return {x: 'Game (most recent)', y: 'CS'};
        else{
          return {x: 'Game (most recent)', y: 'CS/min'};
        }
    } else if(states[3] && states[0] === false && states[1] === false && states[2] === false && states[4] === false){
        if(this.state.DmgDisplay[0])
         return {x: 'Game (most recent)', y: 'Dmg to Champ (1000\'s\)'};
        else{
          return {x: 'Game (most recent)', y: 'Dmg/min'};
        }
    } else {
      return {x: 'Game (most recent)', y: 'Time (min)'};
    }


  },

  mouseOverHandler: function(d, e) {
    this.setState({
      showToolTip: true,
      top: (e.offsetY + 5) + "px",
      left: (e.offsetX + 5) + "px",
      y: d.y,
      x: d.x});
  },


  mouseOutHandler: function() {
    this.setState({showToolTip: false});
  },

  clickHandler: function(d, e) {
    this.setState({ selectedGame : d.x - 1})
    this.showModal()
  },

  getToolTipValue: function(){
    if(this.state.Gold){
      if(this.state.GoldDisplay[0])
        return this.state.y + "K Gold"
      else{
        return this.state.y + " Gold/minute"
      }
    } else if(this.state.CS){
        if(this.state.CSDisplay[0])
          return this.state.y + " Minions"
        else{
          return this.state.y + " Minions/minute"
        }
    } else if(this.state.Dmg){
        if(this.state.DmgDisplay[0])
          return this.state.y + "K Damage"
        else{
          return this.state.y + " Damage/minute"
        }
    } else if(this.state.Time){
        return this.state.y + " minutes played"
    } else{
      return this.state.y
    }
  },


  render: function(){


    if(this.state.KDAoptions){
      KDAoptions = "showKDAoptions";
    } else {
      KDAoptions = "hideKDAoptions";
    }

    if(this.state.goldOptions){
      goldOptions = "showGoldOptions";
    } else {
      goldOptions = "hideGoldOptions";
    }

    if(this.state.CSOptions){
      CSOptions = "showCSOptions";
    } else {
      CSOptions = "hideCSOptions";
    }

    if(this.state.DmgOptions){
      DmgOptions = "showDmgOptions";
    } else {
      DmgOptions = "hideDmgOptions";
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

    if (this.state.GoldDisplay[0]){
      onToggleGoldTotal = "onToggleGoldTotal"
    } else {
      onToggleGoldTotal = ""
    }

    if (this.state.GoldDisplay[1]){
      onToggleGoldAvg = "onToggleGoldAvg"
    } else {
      onToggleGoldAvg = ""
    }

    if (this.state.CSDisplay[0]){
      onToggleCSTotal = "onToggleCSTotal"
    } else {
      onToggleCSTotal = ""
    }

    if (this.state.CSDisplay[1]){
      onToggleCSAvg = "onToggleCSAvg"
    } else {
      onToggleCSAvg = ""
    }

    if (this.state.DmgDisplay[0]){
      onToggleDmgTotal = "onToggleDmgTotal"
    } else {
      onToggleDmgTotal = ""
    }

    if (this.state.DmgDisplay[1]){
      onToggleDmgAvg = "onToggleDmgAvg"
    } else {
      onToggleDmgAvg = ""
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

        <Modal className="modalWindow"
               ref="modal"
               contentStyle={contentStyle}
               modalStyle={modalStyle}
               backdropStyle={backdropStyle} >
          <PastGame gameIdx={this.state.selectedGame} modalCallback={this.hideModal}/>
        </Modal>

        <div>
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
            clickHandler={this.clickHandler}
            lineColors={this.getLineColors()}
            width={500}
            height={200}
            data={this.getAllData()}/>

          {this.state.showToolTip ?
            <ProgressionToolTip top={this.state.top} left={this.state.left} value={this.getToolTipValue()} /> : <div/>
          }
        </div>

        <div id="KDAoptions" className={KDAoptions}>
          <span className={onToggleKill} onClick={this.showK}>Kill</span>
          <span className={onToggleDeath} onClick={this.showD}>Death</span>
          <span className={onToggleAssist} onClick={this.showA}>Assist</span>
        </div>

        <div id="goldOptions" className={goldOptions}>
          <span className={onToggleGoldTotal} onClick={this.showTotalGold}>Total</span>
          <span className={onToggleGoldAvg} onClick={this.showAvgGold}>Per Minute</span>
        </div>

        <div id="CSOptions" className={CSOptions}>
          <span className={onToggleCSTotal} onClick={this.showTotalCS}>Total</span>
          <span className={onToggleCSAvg} onClick={this.showAvgCS}>Per Minute</span>
        </div>

        <div id="DmgOptions" className={DmgOptions}>
          <span className={onToggleDmgTotal} onClick={this.showTotalDmg}>Total</span>
          <span className={onToggleDmgAvg} onClick={this.showAvgDmg}>Per Minute</span>
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
