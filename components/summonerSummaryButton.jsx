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

  getClassname: function() {
    return this.state.toggledOn ? "summaryButtonOn" : "summaryButtonOff"
  },

  render: function() {
    var toggled = this.getClassname();

    return (
      <div className={toggled} onClick={this.click}>
        {GAME_MODES[this.props.summaryType]}
      </div>
    );
  }
});

module.exports = SummonerSummaryButton;
