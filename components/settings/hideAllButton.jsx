var React = require('react');
var SettingsUtil = require('../../util/settingsUtil');

var HideAllButton = React.createClass({

  getInitialState: function() {
    return ({
      hidden: localStorage['hideAll']
    });
  },

  toggleHide: function() {
    localStorage['hideAll'] = localStorage['hideAll'] === 'true' ? 'false' : 'true'
    SettingsUtil.refresh();
  },

  render: function() {
    return (
      <div className="hideAllButton" onClick={this.toggleHide}>
        Hide
      </div>
    )
  }
});

module.exports = HideAllButton;
