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

  getParticipants: function(teamId) {
    return this.state.game.participants.map(function(summoner) {
      if (summoner.teamId === teamId) {
        return (
          < CurrentPlayerInfo key={summoner.summonerId} summoner={summoner} />
        );
      }
    });
  },


  render: function() {
    return (
      <div className="currentGameInfo">
        <h3 className="currentGameHeader">{this.state.game.gameMode} {this.state.game.gameType}</h3>
        <span>{this.getParticipants(100)}</span>
        <span>{this.getParticipants(200)}</span>
      </div>
    );
  }
});

module.exports = CurrentGameInfo;
