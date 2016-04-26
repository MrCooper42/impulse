var React = require('react');
var LeagueUtil = require('../util/leagueUtil');
var SummonerStore = require('../stores/summonerStore');
var GameStore = require('../stores/gameStore');

var CHAMPIONS = require('../app/assets/objects/championsMap');
var CHAMP_SQUARES = require('../app/assets/images/squares');
var SUMMONER_SPELLS = require('../app/assets/images/summonerSpells');
var GAME_MODES = require('../app/assets/objects/gameModes');

var rd3 = require('react-d3');
var PieChart = rd3.PieChart;

var RecentGame = React.createClass({

  getInitialState: function() {
    return ({
      game: GameStore.lastGame()
    });
  },

  componentDidMount: function() {
    this.gameListener = GameStore.addListener(this.updateGames);
    this.summonerListener = SummonerStore.addListener(this.updateGames);
    if (localStorage['leagueGames']) {
      var games = JSON.parse(localStorage['leagueGames']);
      this.setState({
        game: games.length === 0 ? {} : games[0]
      });
    }
  },

  componentWillUnmount: function() {
    this.gameListener.remove();
    this.summonerListener.remove();
  },

  updateGames: function() {
    this.setState( { game: GameStore.lastGame() } );
  },

  getStats: function() {
    var stats = (
      <div>
        NO STATS
      </div>
    );
    var gameStats = this.state.game.stats;
    if (gameStats) {
      var kill = gameStats.championsKilled ? gameStats.championsKilled : 0;
      var death = gameStats.numDeaths ? gameStats.numDeaths : 0;
      var assist = gameStats.assists ? gameStats.assists : 0;
      var date = new Date(this.state.game.createDate);
      var subType = GAME_MODES[this.state.game.subType]
      if (subType) {
        subType = "(" + subType + ")";
      }
      stats = (
        <div>
          <div>
            <img src={SUMMONER_SPELLS[this.state.game.spell1].url} className="spell1"/>
            <img src={SUMMONER_SPELLS[this.state.game.spell2].url} className="spell2"/>
          </div>
          <div className="statsName">{CHAMPIONS[this.state.game.championId]}</div>
          <div className="statsCreate">{date.toString().slice(3,15)}</div>
          <div className="statsCreate">
            {GAME_MODES[this.state.game.gameMode]} {GAME_MODES[this.state.game.gameType]} {subType}
          </div>
        </div>
      )
    }
    return stats;
  },

  getImage: function() {
    var champ = CHAMPIONS[this.state.game.championId];
    var url = CHAMP_SQUARES[champ];

    return (
      <img src={url} className="avatar"/>
    );
  },

  getPieData: function(){
    var gameStats = this.state.game.stats;
    if (gameStats) {
      var kill = gameStats.championsKilled ? gameStats.championsKilled : 0;
      var death = gameStats.numDeaths ? gameStats.numDeaths : 0;
      var assist = gameStats.assists ? gameStats.assists : 0;
      return [
        {label: 'Kills', value: kill},
        {label: 'Deaths', value: death},
        {label: 'Assists', value: assist }
      ];
    }
    else{
      return [
        {label: 'Kills', value: 0.0},
        {label: 'Deaths', value: 0.0},
        {label: 'Assists', value: 0.0 }
      ];
    }
  },


  render: function() {


    return (
      <div className="recentGame">
        <h1>Recent Game</h1>
        <PieChart
          data={this.getPieData()}
          width={400}
          height={400}
          radius={100}
          innerRadius={20}
          sectorBorderColor="white"
          labelTextFill="white"/>
        {this.getImage()}
        {this.getStats()}

      </div>
    );
  }
});

module.exports = RecentGame;
