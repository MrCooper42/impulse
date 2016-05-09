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
var GAME_MODES = require('../../app/assets/objects/gameModes');

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
    var callback = this.props.modalCallback;
    return this.state.game.participants.map(function(summoner) {
      if (summoner.teamId === teamId) {
        return (
          < CurrentPlayerInfo key={summoner.summonerId} summoner={summoner} modalCallback={callback}/>
        );
      }
    });
  },


  render: function() {
    return (
      <div className="currentGameInfo">
        <h3 className="currentGameHeader">  {GAME_MODES[this.state.game.gameMode]} {GAME_MODES[this.state.game.gameType]}</h3>
        <div className="currentGameWrapper">
          <div>{this.getParticipants(100)}</div>
          <div><h1>VS</h1></div>
          <div>{this.getParticipants(200)}</div>
        </div>
      </div>
    );
  }
});

module.exports = CurrentGameInfo;
