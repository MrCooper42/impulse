var React = require('react');

var SummonerStore = require('../../stores/summonerStore');

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
        {this.state.rank}
      </div>
    );
  }
});

module.exports = SummonerRank;
