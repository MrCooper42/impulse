var React = require('react');


var Clock = React.createClass({

  getInitialState: function(){
    return {
      time: new Date()
    }
  },

  componentDidMount: function(){
    var that = this;
    setInterval(function(){
      that.setState({time: new Date()})
    } , 1000 )
  },

  render: function(){
    return(
      <div>
      {this.state.time.toString()}
      </div>
    );
  }

});



module.exports = Clock;