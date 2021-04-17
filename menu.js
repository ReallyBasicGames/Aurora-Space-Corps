let cnv;

function setup()
{
  cnv = createCanvas(600, 200);
  cnv.style('display', 'block');
  var x = (windowWidth - width) / 2;
  var y = 500;
  cnv.position(x, y);
  background(0);
}

function windowResized() {
  var x = (windowWidth - width) / 2;
  var y = 500;
  cnv.position(x, y);
}

function play()
{
  window.location.href="game.html";
}

var displayingControls = false;

function getControls()
{
  background(0);
  if(!displayingControls)
  {
    displayingControls = true;

    // show the controls for the game
    textSize(16);
    fill(255);
    text("Use the arrow-keys or WASD to move your factory ship. Press 1, 2, 3 or 4 to build small, medium, large and boss ships (respectively). \n\nYou may also purchase upgrades by pressing keys 8, 9, or 0. Pressing 8 will increase your damage by 1 (additive). Pressing 9 will increase overall health of your fleet by 1.2 (multiplicative). Pressing 0 will increase you maximum power, as well as increase you power regeneration.", 20, 20, width - 30, height - 20);
  }
  else {
    displayingControls = false;
  }
  displayingStrats = false;
  displayingStats = false;

}

var displayingStrats = false;

function getStrats()
{
  background(0);
  if(!displayingStrats)
  {
    displayingStrats = true;
    // show the controls for the game
    textSize(16);
    fill(255);
    text("Try to increase your power as quickly as possible. It's OK to take some damage at the start of the game to get more expensive ships later. \n\nBuild some small ships to start, but try to work your way up to larger ships. They deal more damage and last longer.\n\nMake sure you upgrade damage and health, or your fleet will soon be destroyed!", 20, 20, width-20, height-20);
  }
  else {
    displayingStrats = false;
  }
  displayingControls = false;
  displayingStats = false;
}

var displayingStats = false;

function getStats()
{
  loadStats();
  background(0);
  if(!displayingStrats)
  {
    displayingStats = false;
    // show the controls for the game
    textSize(16);
    fill(255);
    text("Win / Game Ratio: " + wins.toString() + " / " + gamesPlayed.toString()+"\nTies: " + ties.toString() + "\nTime Played: " + timeToString(), 20, 20, width-20, height-20);
  }
  else {
    displayingStats = false;
  }
  displayingControls = false;
  displayingStrats = false;
}

function clearStats()
{
  console.log("stats cleared");
  storeItem("timePlayed", 0);
  storeItem("wins", 0);
  storeItem("gamesPlayed", 0);
  storeItem("ties", 0);
  loadStats();
}

function loadStats()
{
  wins = getItem('wins');
  if(wins == null) {
    wins = 0;
    storeItem("wins", wins);
  }
  gamesPlayed = getItem('gamesPlayed');
  if(gamesPlayed == null) {
    gamesPlayed = 0;
    storeItem("gamesPlayed", gamesPlayed);
  }
  ties = getItem('ties');
  if(ties == null) {
    ties = 0;
    storeItem("ties", ties);
  }
  timePlayed = getItem('timePlayed');
  if(timePlayed == null) {
    timePlayed = 0;
    storeItem("timePlayed", timePlayed);
  }
}

function timeToString()
{
  var milliseconds;
  var seconds;
  var minutes;
  var hours;

  milliseconds = timePlayed % 1000;
  timePlayed = floor(timePlayed / 1000);
  seconds = timePlayed % 60;
  timePlayed = floor(timePlayed / 60);
  minutes = timePlayed % 60;
  timePlayed = floor(timePlayed / 60);
  hours = timePlayed;

  return hours.toString() + " hours, " + minutes.toString() + " minutes and " + seconds.toString() + " seconds";
}

function goToGithub()
{
  window.location.href="https://github.com/ReallyBasicGames/Space-Blast";
}
