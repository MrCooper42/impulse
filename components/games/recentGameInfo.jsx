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
          <div className="statsName">{CHAMPIONS[this.state.game.championId]}</div>
          <div className="statsCreate">
            {GAME_MODES[this.state.game.gameMode]} {GAME_MODES[this.state.game.gameType]} {subType}
          </div>
          <div>
            <img src={SUMMONER_SPELLS[this.state.game.spell1].url} className="spell"/>
            <img src={SUMMONER_SPELLS[this.state.game.spell2].url} className="spell"/>
          </div>
          <div className="itemsList">
            <img src={ITEMS["default"]} className="item"/>
            <img src={ITEMS["default"]} className="item"/>
            <img src={ITEMS["default"]} className="item"/>
            <img src={ITEMS["default"]} className="item"/>
            <img src={ITEMS["default"]} className="item"/>
            <img src={ITEMS["default"]} className="item"/>
            <img src={ITEMS["trinket-default"]} className="item"/>
          </div>
          <div className="statsCreate">{date.toString().slice(3,15)}</div>
        </div>
      )
    }
    return stats;
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
