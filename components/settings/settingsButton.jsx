var React = require('react');

// MODAL
var Modal = require('boron/OutlineModal');
var SettingsMenu = require('./settingsMenu');

// MODAL STYLE
var modalStyle = {
  transform : 'inherit'
};

var backdropStyle = {
    backgroundColor: ''
};

var contentStyle = {
    height: '100%'
};

var SettingsButton = React.createClass({

  getInitialState: function() {
    return ({
      displayMenu: false
    });
  },

  showModal: function(){
    this.refs.modal.show();
  },

  hideModal: function(){
    this.refs.modal.hide();
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
        <div className="settingsIcon" onClick={this.showModal} >
          Settings
        </div>
        <Modal className="modalWindow"
               ref="modal"
               contentStyle={contentStyle}
               modalStyle={modalStyle}
               backdropStyle={backdropStyle} >
          <SettingsMenu modalCallback={this.hideModal}/>
        </Modal>
      </div>
    )
  }
});

module.exports = SettingsButton;
