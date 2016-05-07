var React = require('react');

// STORES
var GameStore = require('../../stores/gameStore');
var SummonerStore = require('../../stores/summonerStore');

// COMPONENTS
var CurrentPlayerInfo = require('./currentPlayerInfo');

// OBJECTS
var CHAMPION_SQUARES = require('../../app/assets/images/squares');
var CHAMPIONS = require('../../app/assets/objects/championsMap');
var SUMMONER_SPELLS = require('../../app/assets/images/summonerSpells');

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
    debugger;
    return this.state.game.participants.map(function(summoner) {
      return (
        < CurrentPlayerInfo summoner={summoner} />
      );
    });
  },

  render: function() {
    return (
      <div className="currentGameInfo">
        <h3 className="currentGameHeader">{this.state.game.gameMode} {this.state.game.gameType}</h3>
        {this.getParticipants()}
      </div>
    );
  }
});

module.exports = CurrentGameInfo;
