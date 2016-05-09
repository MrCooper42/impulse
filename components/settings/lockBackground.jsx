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

  imgUrl: function() {
    return this.state.locked ? "http://res.cloudinary.com/dzyfczxnr/image/upload/c_scale,w_32/v1462819758/Impulse/lock.png" : "http://res.cloudinary.com/dzyfczxnr/image/upload/c_scale,w_32/v1462819757/Impulse/unlock.png"
  },

  render: function() {
    return (
      <img className="lockBackground" src={this.imgUrl()} onClick={this.toggleLock}/>
    );
  }
});

module.exports = LockBackground;
