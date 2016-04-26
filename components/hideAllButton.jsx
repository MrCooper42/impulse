var React = require('react');

var HideAllButton = React.createClass({

  getInitialState: function() {
    return ({
      hidden: localStorage['hideAll']
    });
  },

  toggleHide: function() {
    localStorage['hideAll'] = localStorage['hideAll'] === 'true' ? 'false' : 'true'
    location.reload()
  },

  render: function() {
    return (
      <div className="hideAllButton" onClick={this.toggleHide}>
        Hide All
      </div>
    )
  }
});

module.exports = HideAllButton;
