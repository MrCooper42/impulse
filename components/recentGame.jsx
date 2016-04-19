var React = require('react');
var LeagueUtil = require('../util/leagueUtil');
var SummonerStore = require('../stores/summonerStore');
var GameStore = require('../stores/gameStore');

var CHAMPIONS = require('../app/assets/objects/championsMap.js');
var CHAMP_SQUARES = require('../app/assets/images/squares.js');

var RecentGame = React.createClass({

  getInitialState: function() {
    return ({
      game: {}
    });
  },

  componentDidMount: function() {
    this.gameListener = GameStore.addListener(this.updateGames);
    this.summonerListener = SummonerStore.addListener(this.newSummoner);
    LeagueUtil.fetchGameStats(SummonerStore.summoner().id);
  },

  componentWillUnmount: function() {
    this.gameListener.remove();
    this.summonerListener.remove();
  },

  updateGames: function() {
    this.setState( { game: GameStore.lastGame() } );
  },

  newSummoner: function() {
    LeagueUtil.fetchGameStats(SummonerStore.summoner().id);
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
      stats = (
        <div>
          <div>{date.toString()}</div>
          <div>{CHAMPIONS[this.state.game.championId]}</div>
          <div>{kill}/{death}/{assist}</div>
          <div>Spells: {this.state.game.spell1}, {this.state.game.spell2}</div>
          <div>{this.state.game.gameMode.toLowerCase()} {this.state.game.gameType.toLowerCase()}</div>
        </div>
      )
    }
    return stats;
  },

  getImage: function() {
    var champ = CHAMPIONS[this.state.game.championId];
    var url = CHAMP_SQUARES[champ];

    return (
      <img src={url}/>
    );
  },

  render: function() {
    return (
      <div className="recentGame">
        <h1>Recent Game</h1>
        {this.getImage()}
        {this.getStats()}
      </div>
    );
  }
});

module.exports = RecentGame;
