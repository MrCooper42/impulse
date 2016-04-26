var React = require('react');

var SummonerStore = require('../stores/summonerStore');
var StatsStore = require('../stores/statsStore');

var LeagueUtil = require('../util/leagueUtil');

var SummonerSummaryButton = require('./summonerSummaryButton');

var SummonerSummary = React.createClass({

  getInitialState: function() {
    return ({
      stats: SummonerStore.stats(),
      summaryType: StatsStore.summaryType()
    })
  },

  componentDidMount: function() {
    this.summonerListener = SummonerStore.addListener(this.updateStats);
    this.statsListener = StatsStore.addListener(this.updateSummaryType);
    // TODO: check for summoner in localStorage
  },

  componentWillUnmount: function() {
    this.summonerListener.remove();
    this.statsListener.remove();
  },

  updateStats: function() {
    this.setState({ stats: SummonerStore.stats() });
  },

  updateSummaryType: function() {
    this.setState({ summaryType: StatsStore.summaryType() });
  },

  getStats: function() {
    var result = (<div/>);
    if (this.state.stats.playerStatSummaries) {
      var unrankedIdx = this.getIdx(this.state.summaryType);
      var stats = this.state.stats.playerStatSummaries[unrankedIdx].aggregatedStats;
      result = (
        <ul>
          <li>{this.state.stats.playerStatSummaries[unrankedIdx].wins} Wins</li>
          <li>{stats.totalChampionKills} Kills</li>
          <li>{stats.totalAssists} Assists</li>
          <li>{stats.totalMinionKills} CS</li>
          <li>{stats.totalTurretsKilled} Turret takedowns</li>
        </ul>
      )
    }
    return result;
  },

  getIdx: function(mode) {
    var index = -1;
    this.state.stats.playerStatSummaries.forEach(function(gameMode, idx) {
      if (gameMode.playerStatSummaryType === mode) {
        index = idx
      }
    });
    return index;
  },

  render: function() {
    return (
      <div className="summonerSummary">
        <div className="summaryButtons">
          <SummonerSummaryButton summaryType="CoopVsAI" />
          <SummonerSummaryButton summaryType="Unranked" />
          <SummonerSummaryButton summaryType="AramUnranked5x5" />
          <SummonerSummaryButton summaryType="RankedSolo5x5" />
        </div>
        {this.getStats()}
      </div>
    )
  }
});

module.exports = SummonerSummary;
