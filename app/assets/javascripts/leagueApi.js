$.ajax({
  // TODO: add key
  url: "https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/adutta?api_key=bd9c0a96-b497-4619-adb8-1965df5bb4a7",
  method: "GET",
  success: function(data) {
    window.testValue = data;
  },
  error: function(error) {
    window.testValue = "poop";
  }
});
