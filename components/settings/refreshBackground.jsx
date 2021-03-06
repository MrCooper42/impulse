var React = require('react');

var RefreshBackground = React.createClass({

  refreshBackground: function() {
    localStorage.removeItem('bgUrl');
    location.reload();
  },

  render: function() {
    return (
      <div onClick={this.refreshBackground} className="refreshBackground">
        Change
      </div>
    );
  }
});

module.exports = RefreshBackground;
