var React = require('react');
var SummonerStore = require('../stores/summonerStore');
var LeagueUtil = require('../util/leagueUtil');

var SummonerSummary = React.createClass({

  getInitialState: function() {
    return ({
      stats: SummonerStore.stats()
    })
  },

  componentDidMount: function() {
    this.summonerListener = SummonerStore.addListener(this.update);
    LeagueUtil.fetchSummonerStats(SummonerStore.summoner().id);
  },

  componentWillUnmount: function() {
    this.summonerListener.remove();
  },

  update: function() {
    this.setState({ stats: SummonerStore.stats() });
  },

  getStats: function() {
    var result = (<div/>);
    if (this.state.stats.playerStatSummaries) {
      var stats = this.state.stats.playerStatSummaries[6].aggregatedStats;
      result = (
        <ul>
          <h3>Unranked 5v5 stats</h3>
          <li>{this.state.stats.playerStatSummaries[6].wins} Wins</li>
          <li>{stats.totalChampionKills} Kills</li>
          <li>{stats.totalAssists} Assists</li>
          <li>{stats.totalMinionKills} CS</li>
          <li>{stats.totalTurretsKilled} Turret takedowns</li>
        </ul>
      )
    }
    return result;
  },

  render: function() {
    return (
      <div className="summonerSummary">
        {this.getStats()}
      </div>
    )
  }
});

module.exports = SummonerSummary;
