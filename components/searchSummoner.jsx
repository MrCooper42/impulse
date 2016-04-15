var React = require('react');
var LeagueUtil = require('../util/leagueUtil');
var SummonerStore = require('../stores/summonerStore');

// ---------------CLASS DEFINITION ------------------------------------*****
var SearchSummoner = React.createClass({

  getInitialState: function(){
    return {
      summoner: {},
      inputText: ""
    }
  },

  componentDidMount: function(){
    this.leagueListener = SummonerStore.addListener(this.updateSummoner);
    if (localStorage["summoner"]){
      var summoner = JSON.parse(localStorage["summoner"]);
      this.setState( {
        summoner: summoner,
        inputText: summoner.name
      });
      LeagueUtil.setSummoner(summoner)
    }
  },

  componentWillUnmount: function() {
    this.leagueListener.remove();
  },

  _onChange: function(e){
    e.preventDefault();
    this.setState({
      inputText: e.target.value
    });
  },

  _onSubmit: function(e){
    e.preventDefault();
    LeagueUtil.fetchSummonerInfo(this.state.inputText);
  },

  updateSummoner: function() {
    this.setState({summoner: SummonerStore.summoner()});
  },

  render: function(){
    var summonerName = this.state.summoner.name
    return(
      <div className="searchDiv">
        <form onSubmit={this._onSubmit}>
          <input id="searching" type="text"
          value={this.state.inputText}
          onChange={this._onChange}/>

          <input type="submit" value="search"/>
        </form>
      </div>
    );
  }

});



module.exports = SearchSummoner;
