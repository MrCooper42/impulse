var React = require('react');

var GameStore = require('../../stores/gameStore');

var PastGame = React.createClass({

  getInitialState: function() {
    return ({
      game : GameStore.allGames()[this.props.gameIdx]
    });
  },

  componentDidMount: function() {
    this.gamesListener = GameStore.addListener(this.update);
  },

  componentWillUnmount: function() {
    this.gamesListener.remove();
  },

  update: function() {
    this.setState({ game: GameStore.allGames()[this.props.gameIdx] });
  },

  render: function() {
    return (
      <div>
        [Recent game info]
      </div>
    );
  }
});

module.exports = PastGame;
