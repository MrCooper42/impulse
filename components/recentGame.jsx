var React = require('react');
var LeagueUtil = require('../util/leagueUtil');
var SummonerStore = require('../stores/summonerStore');
var GameStore = require('../stores/gameStore');

var CHAMPIONS = require('../app/assets/maps/champions.js');
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
    if (this.state.game.stats) {
      var kill = this.state.game.stats.championsKilled ? this.state.game.stats.championsKilled : 0;
      var death = this.state.game.stats.numDeaths ? this.state.game.stats.numDeaths : 0;
      var assist = this.state.game.stats.assists ? this.state.game.stats.assists : 0;

      stats = (
        <div>
          <div>{CHAMPIONS[this.state.game.championId]}</div>
          <div>{kill}/{death}/{assist}</div>
          <div>Damage: {this.state.game.stats.totalDamageDealtToChampions}</div>
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
