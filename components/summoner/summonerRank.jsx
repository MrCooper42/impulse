var React = require('react');

var SummonerStore = require('../../stores/summonerStore');

var RANKS = require('../../app/assets/images/rankBadges');

var SummonerRank = React.createClass({

  getInitialState: function() {
    return ({
      rank: SummonerStore.rank()
    });
  },

  componentDidMount: function() {
    this.summonerListener = SummonerStore.addListener(this.update);
  },

  componentWillUnmount: function() {
    this.summonerListener.remove();
  },

  update: function() {
    this.setState({ rank: SummonerStore.rank() })
  },

  render: function() {
    return (
      <div className="summonerRank">
        <img src={RANKS[this.state.rank.split(" ")[0]]} />
        <span className="division">{this.state.rank.split(" ")[1]}</span>
      </div>
    );
  }
});

module.exports = SummonerRank;
