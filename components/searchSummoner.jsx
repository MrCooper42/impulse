var React = require('react');
var LeagueUtil = require('../util/leagueUtil');
var SummonerStore = require('../stores/summonerStore');

// ---------------CLASS DEFINITION ------------------------------------*****
var SearchSummoner = React.createClass({

  getInitialState: function(){
    return {
      summoner: {}
    }
  },

  componentDidMount: function(){
    this.leagueListener = SummonerStore.addListener(this.updateSummoner);
    if (localStorage["summoner"]){
      this.setState({summoner: localStorage["summoner"]})
    }
  },

  componentWillUnmount: function() {
    this.leagueListener.remove();
  },

  _onChange: function(e){
    e.preventDefault();
    this.setState({
      summoner: e.target.value
    });
  },

  _onSubmit: function(e){
    e.preventDefault();
    LeagueUtil.fetchSummonerInfo();
  },

  render: function(){
    var summonerName = Object.keys(JSON.parse(localStorage["summoner"]))[0]
    return(
      <div className="searchDiv">
        <form onSubmit={this._onSubmit}>
          <input id="searching" type="text"
          value={summonerName}
          onChange={this._onChange}/>

          <input type="submit" value="search"/>
        </form>
      </div>
    );
  }

});



module.exports = SearchSummoner;
