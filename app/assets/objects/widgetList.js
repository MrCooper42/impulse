var React = require('react');

var Clock = require('../../../components/widgets/clock');
var Weather = require('../../../components/widgets/weather');
var RecentGame = require('../../../components/games/recentGame');
var Quote = require('../../../components/widgets/quotes');
var Progression = require('../../../components/games/progression');
var SummonerSummary = require('../../../components/summoner/summonerSummary');
var SearchSummoner = require('../../../components/summoner/searchSummoner');
var CurrentGameButton = require('../../../components/games/currentGameButton');
var TopChampions = require('../../../components/summoner/topChampionsIndex');

module.exports = {
  "Search": < SearchSummoner key="search" />,
  "SummonerSummary": < SummonerSummary key="summonerSummary"/>,
  "RecentGame": < RecentGame key="recentGame"/>,
  "Progression": < Progression key="progression"/>,
  "CurrentGame": < CurrentGameButton key="currentGameButton"/>,
  "TopChampions": < TopChampions key="topChampionsIndex"/>,
  "Clock": < Clock key="clock"/>,
  "Quote": < Quote key="quote"/>,
  "Weather": < Weather key="weather"/>
};
