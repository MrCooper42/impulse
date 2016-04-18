var React = require('react');
var LeagueUtil = require('../util/leagueUtil');
var SummonerStore = require('../stores/summonerStore');
var GameStore = require('../stores/gameStore');

var CHAMPIONS = require('../app/assets/maps/champions.js');

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
      stats = (
        <div>
          <div>Champion Played: {CHAMPIONS[this.state.game.championId]}</div>
          <div>KDA: {this.state.game.stats.championsKilled}/{this.state.game.stats.numDeaths}/{this.state.game.stats.assists}</div>
          <div>Damage dealt to Champions: {this.state.game.stats.totalDamageDealtToChampions}</div>
        </div>
      )
    }
    return stats;
  },

  render: function() {
    this.getStats();
    return (
      <div>
        {this.getStats()}
      </div>
    );
  }
});

module.exports = RecentGame;
