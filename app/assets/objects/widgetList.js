var React = require('react');

var Clock = require('../../../components/clock.jsx');
var Weather = require('../../../components/weather.jsx');
var RecentGame = require('../../../components/recentGame.jsx');
var CompareStats = require('../../../components/compareStats.jsx');
var Quote = require('../../../components/quotes.jsx');

module.exports = {
  "Weather": < Weather key="weather"/>,
  "RecentGame": < RecentGame key="recentGame"/>,
  "CompareStats": < CompareStats key="compareStats"/>,
  "Clock": < Clock key="clock"/>,
  "Quote": < Quote key="quote"/>
}
