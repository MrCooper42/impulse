var React = require('react');

// FLUX
var LeagueUtil = require('../../util/leagueUtil');

// STORES
var GameStore = require('../../stores/gameStore');

// OBJECTS
var CHAMPIONS = require('../../app/assets/objects/championsMap');
var GAME_MODES = require('../../app/assets/objects/gameModes');

// IMAGE URLS
var CHAMP_SQUARES = require('../../app/assets/images/squares');
var SUMMONER_SPELLS = require('../../app/assets/images/summonerSpells');
var ITEMS = require('../../app/assets/images/items');
var ICONS = require('../../app/assets/images/icons');


var RecentGameInfo = React.createClass({

  getInitialState: function() {
    return ({
      game: GameStore.lastGame()
    });
  },

  componentDidMount: function() {
    this.gameListener = GameStore.addListener(this.update);
  },

  componentWillUnmount: function() {
    this.gameListener.remove();
  },

  update: function() {
    this.setState({ game: GameStore.lastGame() })
  },

  getStats: function() {
    var stats = (
      <div>
        NO STATS
      </div>
    );
    var gameStats = this.state.game.stats;
    if (gameStats) {
      var kill = gameStats.championsKilled ? gameStats.championsKilled : 0;
      var death = gameStats.numDeaths ? gameStats.numDeaths : 0;
      var assist = gameStats.assists ? gameStats.assists : 0;
      var date = new Date(this.state.game.createDate);
      var subType = GAME_MODES[this.state.game.subType]
      if (subType) {
        subType = "(" + subType + ")";
      }
      stats = (
        <div className="recentGameInfo">
          <h2>{gameStats.win ? "VICTORY" : "DEFEAT"}</h2>
          <div className="statsCreate">
            {GAME_MODES[this.state.game.gameMode]} {GAME_MODES[this.state.game.gameType]} {subType}
          </div>
          {this.getSummaryStats()}
          {this.getSpells()}
          {this.getItems()}
          <div className="statsCreate">{date.toString().slice(3,15)}</div>
        </div>
      )
    }
    return stats;
  },

  getSummaryStats: function() {
    var gameStats = this.state.game.stats;
    var timeParts = (gameStats.timePlayed/60).toFixed(2).split('.')
    timeParts[1] = (Math.round(60/parseInt(timeParts[1])) * 10).toString();
    var time = timeParts.join(":");
    return (
      <div className="gameStatsSummary">
        <div className="statModule"><img src={ICONS["gold"]} className="icon"/>{this.parseNumber(gameStats.goldEarned)}</div>
        <div className="statModule"><img src={ICONS["minion"]} className="icon"/>{gameStats.minionsKilled}</div>
        <div className="statModule"><img src={ICONS["clock"]} className="icon"/>{time}</div>
      </div>
    );
  },

  parseNumber: function(num) {
    var numString = num.toString().split('');
    var i = numString.length - 3;
    while (i > 0) {
       numString.splice(i, 0, ",");
       i -= 3;
    }
    return numString.join('');
  },

  getSpells: function() {
    return (
      <div>
        <img src={SUMMONER_SPELLS[this.state.game.spell1].url} className="icon"/>
        <img src={SUMMONER_SPELLS[this.state.game.spell2].url} className="icon"/>
      </div>
    );
  },

  getItems: function() {
    return (
      <div className="itemsList">
        <img src={ITEMS["default"]} className="icon"/>
        <img src={ITEMS["default"]} className="icon"/>
        <img src={ITEMS["default"]} className="icon"/>
        <img src={ITEMS["default"]} className="icon"/>
        <img src={ITEMS["default"]} className="icon"/>
        <img src={ITEMS["default"]} className="icon"/>
        <img src={ITEMS["trinket-default"]} className="icon"/>
      </div>
    )
  },

  render: function() {
    return (
      <div>
        {this.getStats()}
      </div>
    )
  }
});

module.exports = RecentGameInfo;
