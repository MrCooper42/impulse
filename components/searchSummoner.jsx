var React = require('react');

var SearchSummoner = React.createClass({

  getInitialState: function(){
    return {
      name: ""
    }
  },

  componentDidMount: function(){
    if (localStorage["summoner"]){
      this.setState({name: localStorage["summoner"]})
    } 
  },


  _onChange: function(e){
    e.preventDefault();
    this.setState({
      name: e.target.value
    });
  },

  _onSubmit: function(e){
    //TODO: fetchSummonerName on submit, aka make a new ajax call
    e.preventDefault();
    localStorage["summoner"] = this.state.name;

  },

  render: function(){
    return(
      <div className="searchDiv">
        <form onSubmit={this._onSubmit}>
          <input id="searching" type="text"
          value={this.state.name}
          onChange={this._onChange}/>

          <input type="submit" value="search"/>
        </form>
      </div>
    );
  }

});



module.exports = SearchSummoner;