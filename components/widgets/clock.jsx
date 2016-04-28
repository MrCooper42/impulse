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
    this.timer = setInterval(function(){
      that.setState({time: new Date()});
    } , 5000 )
  },

  componentWillUnmount: function() {
    clearInterval(this.timer);
  },

  minutes: function() {
    var minutes = this.state.time.getMinutes()
    if (String(minutes).length == 1) {
      minutes = "0" + String(minutes);
    }
    return minutes
  },

  hours: function() {
    return this.state.time.getHours()
  },

  period: function() {
    return this.state.time.getHours() >= 12 ? "PM" : "AM";
  },

  render: function() {
    return(
      <div className="clock">
      {this.hours()}:{this.minutes()}
      </div>
    );
  }

});



module.exports = Clock;
