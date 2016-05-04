var React = require('react');

// MODAL
var Modal = require('boron/OutlineModal');
var CurrentGameInfo = require('./currentGameInfo');

var CurrentGameButton = React.createClass({

  showModal: function(){
    this.refs.modal.show();
  },

  hideModal: function(){
    this.refs.modal.hide();
  },

  render: function() {
    return (
      <div className="currentGameButton" onClick={this.showModal}>
        <img src="http://res.cloudinary.com/dzyfczxnr/image/upload/c_scale,w_32/v1462395632/Impulse/green.png" />
        <Modal className="modalWindow" ref="modal">
          <CurrentGameInfo modalCallback={this.hideModal}/>
        </Modal>
      </div>
    );
  }
});

module.exports = CurrentGameButton;
