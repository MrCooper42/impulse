var React = require('react');

var Clock = require('../../../components/clock.jsx');
var Weather = require('../../../components/weather.jsx');
var RecentGame = require('../../../components/recentGame.jsx');
var CompareStats = require('../../../components/compareStats.jsx');
var Quote = require('../../../components/quotes.jsx');
var Progression = require('../../../components/progression.jsx');
var SummonerSummary = require('../../../components/summonerSummary.jsx');
var SearchSummoner = require('../../../components/searchSummoner.jsx');

module.exports = {
  "Search": < SearchSummoner key="search" />,
  "SummonerSummary": < SummonerSummary key="summonerSummary"/>,
  "RecentGame": < RecentGame key="recentGame"/>,
  "CompareStats": < CompareStats key="compareStats"/>,
  "Progression": < Progression key="progression"/>,
  "Clock": < Clock key="clock"/>,
  "Quote": < Quote key="quote"/>,
  "Weather": < Weather key="weather"/>
}
