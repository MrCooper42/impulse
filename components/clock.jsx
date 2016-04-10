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
  render: function(){
    return(
      <div className="clock">
      {this.state.time.getHours()}:{this.state.time.getMinutes()}
      </div>
    );
  }

});



module.exports = Clock;
