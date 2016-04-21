var React = require('react');
var SummonerStore = require('../stores/summonerStore');

var SummonerSummary = React.createClass({

  getInitialState: function() {
    return ({
      summoner: SummonerStore.summoner()
    })
  },

  componentDidMount: function() {
    this.summonerListener = SummonerStore.addListener(this.update);
  },

  componentWillUnmount: function() {
    this.summonerListener.remove();
  },

  update: function() {
    this.setState({summoner: SummonerStore.summoner()});
  },

  render: function() {
    return (
      <div className="summonerSummary">
        {this.state.summoner.id}
      </div>
    )
  }
});

module.exports = SummonerSummary;
