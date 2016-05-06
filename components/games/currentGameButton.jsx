var React = require('react');

// STORES
var GameStore = require('../../stores/gameStore');
var SummonerStore = require('../../stores/summonerStore');

// MODAL
var Modal = require('boron/OutlineModal');
var CurrentGameInfo = require('./currentGameInfo');

var CurrentGameButton = React.createClass({

  getInitialState: function() {
    return ({
      toggled: false
    });
  },

  componentDidMount: function() {
    this.gameListener = GameStore.addListener(this.update);
    this.summonerListener = SummonerStore.addListener(this.update);
    this.update();
  },

  componentWillUnmount: function() {
    this.gameListener.remove();
    this.summonerListener.remove();
  },

  showModal: function() {
    if (GameStore.currentGame().gameId !== 0) {
      this.refs.modal.show();
    }
  },

  hideModal: function() {
    this.refs.modal.hide();
  },

  update: function() {
    var toggled = GameStore.currentGame().gameId === 0 ? false : true;
    this.setState({
      toggled : toggled
    });
  },

  getImageUrl: function() {
    var currentGame = GameStore.currentGame();
    if (currentGame['gameId'] === 0) {
      return "http://res.cloudinary.com/dzyfczxnr/image/upload/c_scale,w_32/v1462395632/Impulse/red.png";
    } else {
      return "http://res.cloudinary.com/dzyfczxnr/image/upload/c_scale,w_32/v1462395632/Impulse/green.png";
    }
  },

  render: function() {
    return (
      <div className="" onClick={this.showModal}>
        <img className="currentGameButton" src={this.getImageUrl()} />
        <Modal className="modalWindow" ref="modal">
          <CurrentGameInfo modalCallback={this.hideModal}/>
        </Modal>
      </div>
    );
  }
});

module.exports = CurrentGameButton;
