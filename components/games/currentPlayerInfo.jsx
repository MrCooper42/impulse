var React = require('react');


var CurrentPlayerInfo = React.createClass({
  render: function() {
    var summoner = this.props.summoner;
    return (
      <div key={summoner.summonerId} className={summoner.teamId === 100 ? "blueTeam" : "redTeam"}>
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
