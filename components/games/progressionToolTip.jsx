var React = require('react');


var ProgressionToolTip = React.createClass({
  getInitialState: function(){
    return ({
      top: this.props.top,
      left: this.props.left,
      value: this.props.value
    })
  },

  getValues: function(){
      return(
        <div>
          {this.state.value}
        </div>
      )
  },

  render: function(){

    var divStyle = {
      position:"fixed",
      top: this.state.top,
      left: this.state.left
    }

    return (
      <div style={divStyle} className="tooltip">
        {this.getValues()}
      </div>
    )
  }

});

module.exports = ProgressionToolTip;