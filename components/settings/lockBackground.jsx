var React = require('react');
var SettingsUtil = require('../../util/settingsUtil');

var LockBackground = React.createClass({

  getInitialState: function() {
    var locked = false;
    if (localStorage['bgLocked']) {
      locked = localStorage['bgLocked'] === 'true' ? true : false;
    }
    return ({
      locked: locked
    });
  },

  componentDidMount: function() {
    localStorage['bgLocked'] = this.state.locked
  },

  toggleLock: function() {
    SettingsUtil.refresh();
    localStorage['bgLocked'] = !this.state.locked;
    this.setState({ locked: !this.state.locked });
  },

  buttonValue: function() {
    return this.state.locked ? "locked" : "unlocked"
  },

  render: function() {
    return (
      <div className="lockBackground" onClick={this.toggleLock}>
        {this.buttonValue()}
      </div>
    );
  }
});

module.exports = LockBackground;
