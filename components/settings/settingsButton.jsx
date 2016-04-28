var React = require('react');

var SettingsMenu = require('./settingsMenu');

var SettingsButton = React.createClass({

  getInitialState: function() {
    return ({
      displayMenu: false
    });
  },

  showMenu: function() {
    this.setState({displayMenu: !this.state.displayMenu});
  },

  display: function() {
    var display = <div/>;

    if (this.state.displayMenu) {
      display = <SettingsMenu />
    };

    return display;
  },

  render: function() {
    return (
      <div>
        {this.display()}
        <div className="settingsIcon" onClick={this.showMenu}>
          Settings
        </div>
      </div>
    )
  }
});

module.exports = SettingsButton;
