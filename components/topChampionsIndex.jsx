var React = require('react');
var LeagueUtil = require('../util/leagueUtil');
var SummonerStore = require('../stores/summonerStore');
var ChampionStore = require('../stores/championStore');


var TopChampionsIndex = React.createClass({

  getInitialState: function(){
    return { 
      champions: [] 
    }
  },

  componentDidMount: function(){
    this.leagueListener = ChampionStore.addListener(this.updateChampions);

    if (localStorage["champions"]){
      var champions = JSON.parse(localStorage["champions"]);
      this.setState({
        champions: champions
      })
      LeagueUtil.setChampions(champions)
    } else {
      var summoner = SummonerStore.summoner();
      LeagueUtil.fetchTopChampions(summoner[Object.keys(summoner)[0]].id)
    }
  },

  componentWillUnmount: function(){
    this.leagueListener.remove();
  },

  champions: function(){
    return this.state.champions.map(function(champ, idx){
      return (
        <li key={idx}>
          {champ.championId}
        </li>
      )
    });
  },

  render: function(){
    return (
      <div>
        <ul>
          { this.champions() }
        </ul>
      </div>
    )
  }


});


module.exports = TopChampionsIndex;