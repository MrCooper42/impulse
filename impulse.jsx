// REACT
var React = require('react');
var ReactDOM = require('react-dom');
var bgUrls = require('./app/assets/images/bgUrls.js')

var App = React.createClass({


  getUrl: function(){
    var idx = Math.random() * bgUrls.urls.length;
    idx = Math.floor(idx);
    return bgUrls.urls[idx];
  },
  render: function() {
    return (
      <div>
        <img src={this.getUrl()}/>
      </div>
    )
  }
})

document.addEventListener("DOMContentLoaded", function() {
  var root = document.querySelector("#root");
  ReactDOM.render(<App />, root);
});
