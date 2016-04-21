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

  render: function() {
    return (
      <div className="summonerSummary">
      </div>
    )
  }
});

module.exports = SummonerSummary;
