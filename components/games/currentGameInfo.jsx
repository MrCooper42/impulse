var React = require('react');

// STORES
var GameStore = require('../../stores/gameStore');
var SummonerStore = require('../../stores/summonerStore');


var CurrentGameInfo = React.createClass({

  getInitialState: function() {
    return ({
      game : GameStore.currentGame(),
      summoner : SummonerStore.summoner()
    });
  },

  componentDidMount: function() {
    this.gameListener = GameStore.addListener(this.update);
    this.summonerListener = SummonerStore.addListener(this.update);
  },

  componentWillUnmount: function() {
    this.gameListener.remove();
    this.summonerListener.remove();
  },

  update: function() {
    this.setState({
      game : GameStore.currentGame(),
      summoner : SummonerStore.summoner()
    })
  },

  getParticipants: function() {

  },

  render: function() {
    return (
      <div>
        {this.state.game.gameMode} {this.state.game.gameType}
        {this.getParticipants()}
      </div>
    );
  }
});

module.exports = CurrentGameInfo;
