var React = require('react');

// COMPONENTS
var RecentGameInfo = require('./recentGameInfo');
var CompareStats = require('./compareStats');

// OBJECTS
var ICONS = require('../../app/assets/images/icons');

var RecentGameInfoButton = React.createClass({

  getInitialState: function() {
    return ({
      showInfo: false
    });
  },

  toggleInfo: function() {
    this.setState({ showInfo: !this.state.showInfo });
  },

  showInfo: function() {
    return (
      <div>
        <RecentGameInfo />
        <CompareStats />
      </div>
    );
  },

  render: function() {
    return (
      <div className="infoButton">
        <img src={ICONS["info"]}
             onClick={this.toggleInfo}/>
        {this.state.showInfo ? this.showInfo() : <div/>}
      </div>
    )
  }
});

module.exports = RecentGameInfoButton;
