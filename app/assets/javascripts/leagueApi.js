$.ajax({
  // TODO: add key
  url: "https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/adutta?api_key=",
  method: "GET",
  success: function(data) {
    window.testValue = data;
  },
  error: function(error) {
    window.testValue = "poop";
  }
});
