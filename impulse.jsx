// REACT
var React = require('react');
var ReactDOM = require('react-dom');
var bgUrls = require('./app/assets/images/bgUrls.js');
var league = require('./util/leagueApi.js')
var Clock = require('./components/clock.jsx');
var Search = require('./components/searchSummoner.jsx')

var App = React.createClass({

  getUrl: function(){

    var idx = Math.random() * bgUrls.urls.length;
    idx = Math.floor(idx);
    return bgUrls.urls[idx];
  },

  componentDidMount: function(){
    league.fetchSummonerInfo();
  },

  render: function() {
    var divStyle = {
        height: '100%',
        width: '100%',
        backgroundImage: 'url(' + this.getUrl() + ')',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundSize: 'cover'
    }

    return (
      <div style={divStyle}>
        <Search />
        <Clock />
      </div>
    )
  }
})

document.addEventListener("DOMContentLoaded", function() {
  var root = document.querySelector("#root");
  ReactDOM.render(<App />, root);
});
