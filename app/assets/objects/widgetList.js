var React = require('react');

var Clock = require('../../../components/widgets/clock.jsx');
var Weather = require('../../../components/widgets/weather.jsx');
var RecentGame = require('../../../components/games/recentGame.jsx');
var CompareStats = require('../../../components/games/compareStats.jsx');
var Quote = require('../../../components/widgets/quotes.jsx');
var Progression = require('../../../components/summoner/progression.jsx');
var SummonerSummary = require('../../../components/summoner/summonerSummary.jsx');
var SearchSummoner = require('../../../components/summoner/searchSummoner.jsx');

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
