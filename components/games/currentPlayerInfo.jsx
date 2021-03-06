var React = require('react');

// FLUX
var LeagueUtil = require('../../util/leagueUtil');

// OBJECTS
var CHAMPION_SQUARES = require('../../app/assets/images/squares');
var CHAMPIONS = require('../../app/assets/objects/championsMap');
var SUMMONER_SPELLS = require('../../app/assets/images/summonerSpells');

var CurrentPlayerInfo = React.createClass({

  searchSummoner: function() {
    LeagueUtil.fetchSummonerInfoWithCallback(this.props.summoner.summonerId, this.props.modalCallback);
  },

  getInfo: function() {
    var summoner = this.props.summoner;
    if (summoner.teamId === 100) {
      return (
        <div onClick={this.searchSummoner} key={summoner.summonerId} className={summoner.teamId === 100 ? "blueTeam" : "redTeam"}>
          <h2>{summoner.summonerName}</h2>
          <div><img className="currentGameImg" src={CHAMPION_SQUARES[CHAMPIONS[summoner.championId]]}/></div>
          <div className="currentGameSpells">
            <img className="icon" src={SUMMONER_SPELLS[summoner.spell1Id].url}/>
            <img className="icon" src={SUMMONER_SPELLS[summoner.spell2Id].url}/>
          </div>
        </div>
      )
    } else {
      return (
        <div onClick={this.searchSummoner} key={summoner.summonerId} className={summoner.teamId === 100 ? "blueTeam" : "redTeam"}>
          <div className="currentGameSpells">
            <img className="icon" src={SUMMONER_SPELLS[summoner.spell1Id].url}/>
            <img className="icon" src={SUMMONER_SPELLS[summoner.spell2Id].url}/>
          </div>
          <div><img className="currentGameImg" src={CHAMPION_SQUARES[CHAMPIONS[summoner.championId]]}/></div>
          <h2>{summoner.summonerName}</h2>
        </div>
      )
    }
  },

  render: function() {
    var summoner = this.props.summoner;
    return (
      <div>
        {this.getInfo()}
      </div>
    );
  }
});

module.exports = CurrentPlayerInfo;
