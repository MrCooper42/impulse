var React = require('react');

// ---------------CLASS DEFINITION ------------------------------------*****
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
    } , 60000 )
  },

  minutes: function() {
    var minutes = this.state.time.getMinutes()
    if (minutes.length == 1) {
      minutes = "0" + minutes;
    }
    return minutes
  },

  hours: function() {
    return this.state.time.getHours()
  },

  render: function(){
    debugger;
    return(
      <div className="clock">
      {this.hours()}:{this.minutes()}
      </div>
    );
  }

});



module.exports = Clock;
