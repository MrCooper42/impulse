var React = require('react');
var quotes = require('../../app/assets/objects/quotes.js');


var Quotes = React.createClass({
  getQuote: function(){
    var idx = Math.random() * quotes.quotes.length;
    idx = Math.floor(idx);
    return quotes.quotes[idx];
  },

  render: function(){
    return (
      <div className="quotes">
        {this.getQuote()}
      </div>
    )
  }
});


module.exports = Quotes;
