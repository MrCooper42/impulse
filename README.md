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
1. Efficiently Using API Calls
  * AD:
  * MS:

2. Live Game Information
```javascript


```
3. Progression Chart
```javascript

getAllData: function(){
  if (this.state.allGames.length > 0) {
    var killDates = [];
    var allGames = this.state.allGames;
    var result = [];

    allGames.forEach(function(game, idx){
      killDates.push({x: 10-idx, y: (game.stats.championsKilled ? game.stats.championsKilled : 0)})
    });

    if(this.state.KDA){
        if (this.state.KDAdisplay[0]){
          result.push(killDates);
        }
    }
    return result.length === 0 ? [[{x: 0, y:0}]] : result
  }
}

```

4. Recent Game Build/Stats 
```javascript


```


## Team
* [Arjun Dutta](https://github.com/adutta91)
* [Matthew Shen](https://github.com/mattyshen)

### Disclaimer
This chrome extension was created for the 2016 League of Legends API challenge by Matthew Shen and Arjun Dutta. The Authors do not reflect the views or opinions of Riot Games. All images used are property of Riot Games.
