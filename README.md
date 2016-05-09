# Impulse
impulse is a new-tab chrome extension that allows League of Legend (LoL) users to quickly search (via LoL username) and look up various statistics on opponent and allies alike. impulse is built with Google Chrome Extensions, React.js, Flux, Javascript, and D3.js. 

## Installation
Download Available on the [Chrome Web Store](https://google.com/)

## Widgets/Features
* Summoner Search
* Summoner Summary (Season Stats)
* Recent Game Build/Stats
* Recent Game Statistics vs Averages
* Progression Chart (Last 10 Games)
  * Kill/Death/Assist 
  * Time Played
  * Total/Per Minute
    * Gold
    * Creep Score
    * Damage Dealt
* Rank Badge and Division
* Live game information (Allies/Enemies)
* Top 3 Champions By Mastery 
* 24-hour League Background
  * Hide Button - saves settings and hides all other widgets
  * Lock Button - holds background until user changes it 
  * Change Button - changes background 
* 24-hour Clock 
* LoL-inspired Quote
* Live Weather & Location 

## Challenges
* Efficiently Using API Calls
  * Limited API calls to only when absolutely necessary
  * Utilized browsers local storage to cache data from api calls
  * Organized flux architecture to control flow of data

API CALLS
```javascript
  fetchSummonerInfo: function(summonerName){
    $.ajax({
      url: "https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/" + summonerName + "?api_key=" + key.league,
      method: "GET",
      success: function(summoner) {
        LeagueUtil.setSummoner(summoner[Object.keys(summoner)[0]]);
      },
      error: function(error) {
        window.alert("Summoner not found");
      }
    });
  },

  setSummoner: function(summoner) {
    LeagueActions.setSummoner(summoner);
    this.fetchGameStats(summoner.id);
    this.fetchSummonerStats(summoner.id);
    this.fetchTopChampions(summoner.id);
    this.fetchRankedInfo(summoner.id);
    this.fetchCurrentGameInfo(summoner.id);
  },
```

SUMMONER SEARCHED (SUBMIT)
```javascript 
  _onSubmit: function(e){
    e.preventDefault();
    if (this.state.inputText === "") {
      localStorage.removeItem('summoner');
      localStorage.removeItem('summaryStats');
      localStorage.removeItem('summonerRank');
      location.reload();
    } else {
      LeagueUtil.fetchSummonerInfo(this.state.inputText);
    }
  },
```

Whenever a summoner was searched, the application makes a request to the API for the relevant information. It was designed to limit API calls to only when a new summoner is searched. Otherwise, API calls would have to be made everytime a widget was opened. By front loading all the API calls, we limit the call rate and allow settings management without excess API calls.


## Team
* [Arjun Dutta](https://github.com/adutta91)
* [Matthew Shen](https://github.com/mattyshen)

### Disclaimer
This chrome extension was created for the 2016 League of Legends API challenge by Matthew Shen and Arjun Dutta. The Authors do not reflect the views or opinions of Riot Games. All images used are property of Riot Games.
