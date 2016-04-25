var React = require('react');

var StatsStore = require('../stores/statsStore');
var SettingsUtil = require('../util/settingsUtil');

var GAME_MODES = require('../app/assets/objects/gameModes');

var SummonerSummaryButton = React.createClass({

  getInitialState: function() {
    return ({
      toggledOn: false
    });
  },

  componentDidMount: function() {
    this.update();
    this.statsListener = StatsStore.addListener(this.update);
  },

  componentWillUnmount: function() {
    this.statsListener.remove();
  },

  update: function() {
    if (StatsStore.summaryType() === this.props.summaryType) {
      this.setState( {toggledOn: true} );
    } else {
      this.setState( {toggledOn: false} );
    }
  },

  click: function() {
    SettingsUtil.setSummaryType(this.props.summaryType);
  },

  render: function() {
    return (
      <div onClick={this.click}>
        {GAME_MODES[this.props.summaryType]} - {this.state.toggledOn ? "ON" : "OFF"}
      </div>
    );
  }
});

module.exports = SummonerSummaryButton;
