var React = require('react');

// FLUX
var LeagueUtil = require('../../util/leagueUtil');

// STORES
var SummonerStore = require('../../stores/summonerStore');
var ChampionStore = require('../../stores/championStore');

// OBJECTS
var CHAMPION_SQUARES = require('../../app/assets/images/squares');
var CHAMPIONS = require('../../app/assets/objects/championsMap');

var TopChampionsIndex = React.createClass({

  getInitialState: function(){
    return {
      champions: ChampionStore.champions()
    }
  },

  componentDidMount: function(){
    this.leagueListener = ChampionStore.addListener(this.updateChampions);
    this.summonerListener = SummonerStore.addListener(this.updateChampions);
  },

  componentWillUnmount: function(){
    this.leagueListener.remove();
    this.summonerListener.remove();
  },


  champions: function(){

    
    return this.state.champions.map(function(champ, idx){
      var date = new Date(champ.lastPlayTime).toString().slice(4,15);

      return (
        <li key={idx}>
          <div className="champImgContainer">
            <img className="topChampionsImage" src={CHAMPION_SQUARES[CHAMPIONS[champ.championId]]} />
          </div>
          <div className="champInfoContainer">
            <div className="champLevel">Lvl: {champ.championLevel}</div>
            <div className="champPoints">Pts: {champ.championPoints}</div>
            <div className="champDate">{date}</div>
          </div>
        </li>
      )
    });
  },

  updateChampions: function() {
    this.setState({ champions: ChampionStore.champions() });
  },

  render: function(){
    return (
      <div className="topChampionsIndex">
        <ul>
          { this.champions() }
        </ul>
      </div>
    )
  }


});


module.exports = TopChampionsIndex;
