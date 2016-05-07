var React = require('react');

// OBJECTS
var CHAMPION_SQUARES = require('../../app/assets/images/squares');
var CHAMPIONS = require('../../app/assets/objects/championsMap');
var SUMMONER_SPELLS = require('../../app/assets/images/summonerSpells');

var CurrentPlayerInfo = React.createClass({

  searchSummoner: function() {
    LeagueUtil.setSummoner(this.props.summoner.summonerId);
    location.reload();
  },

  render: function() {
    var summoner = this.props.summoner;
    return (
      <div onClick={this.searchSummoner} key={summoner.summonerId} className={summoner.teamId === 100 ? "blueTeam" : "redTeam"}>
        <h2>{summoner.summonerName}</h2>
        <div><img className="currentGameImg" src={CHAMPION_SQUARES[CHAMPIONS[summoner.championId]]}/></div>
        <div className="currentGameSpells">
          <img className="icon" src={SUMMONER_SPELLS[summoner.spell1Id].url}/>
          <img className="icon" src={SUMMONER_SPELLS[summoner.spell2Id].url}/>
        </div>
      </div>
    );
  }
});

module.exports = CurrentPlayerInfo;
