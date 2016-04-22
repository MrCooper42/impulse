var React = require('react');

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
    localStorage['bgLocked'] = !this.state.locked;
    this.setState({ locked: !this.state.locked });
  },

  buttonValue: function() {
    return this.state.locked ? "background locked" : "background unlocked"
  },

  className: function() {
    return this.state.locked ? "lockBackgroundOn" : "lockBackgroundOff"
  },

  render: function() {
    return (
      <div className={this.className()} onClick={this.toggleLock}>
        {this.buttonValue()}
      </div>
    );
  }
});

module.exports = LockBackground;
