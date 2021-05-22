let cnv;
let viewportWidth;
let mapSelectedImg;
let mapUnselectedImg;

function preload()
{
    console.log("loading music...");
    bgMusic = loadSound("sounds/Space_Ambient_Music.mp3");
    clickEffect = loadSound("sounds/click1.ogg");
    console.log("loading images...");
    mapSelectedImg = loadImage("images/map_selected.png");
    mapUnselectedImg = loadImage("images/map_unselected.png");
    //loadImage('/images/small_' + i.toString() + '.png')
}

function setup() {
    cnv = createCanvas(windowWidth-20, 200);
    cnv.style('display', 'block');
    cnv.parent("canvasDIV");
    // var x = (windowWidth - width) / 2;
    // cnv.position(x, cnv.position.y);
    background(0);
    loadOptions();
    viewportWidth = windowWidth;
    loadStats();

    if(window.location.pathname == "/aurora_space_corps/missionRoom.html") 
    {
        loadMissions();
    }
}

function draw()
{
    if(!bgMusic.isPlaying() && soundLevel == 1) bgMusic.play();
    if(window.location.pathname == "/aurora_space_corps/missionRoom.html") displayMission();
}

function goToMenu()
{
    if(soundLevel == 1) clickEffect.play();
    window.location.href = "main_menu.html";
}

function goToMissionRoom()
{
    if(soundLevel == 1) clickEffect.play();
    window.location.href = "missionRoom.html";
}

function windowResized() {
    var x = (viewportWidth - width) / 2;
    var y = 500;
    resizeCanvas(width, 600);
}

function play() {
    if(soundLevel == 1) clickEffect.play();
    storeItem("currentMission", missionSelected);
    while(getItem("currentMission") == "null"){}
    window.location.href = "game.html";
}

var displayingControls = false;

function getControls() {
    if(soundLevel == 1) clickEffect.play();
    background(0);
    if (!displayingControls) {
        displayingControls = true;

        // show the controls for the game
        textSize(16);
        fill(255);
        text("Use the arrow-keys or WASD to move your factory ship. Press 1, 2, 3 or 4 to build small, medium, large and boss ships (respectively). \n\nYou may also purchase upgrades by pressing keys 8, 9, or 0. Pressing 8 will increase your damage by 1 (additive). Pressing 9 will increase overall health of your fleet by 1.2 (multiplicative). Pressing 0 will increase you maximum power, as well as increase your power regeneration.", 20, 20, width - 30, height - 20);
    }
    else {
        displayingControls = false;
    }
    displayingStrats = false;
    displayingStats = false;
    displayingCredits = false;

}
var displayingCredits = false;

function getCredits()
{
    background(0);
    if(displayingCredits)
    {
        displayingCredits = false;
    }
    else {
        displayingCredits = true;
        // show the credits for the game
        textSize(16);
        fill(255);
        text("CREDITS:\n'Space Ambient Music' - ReallyBasicGames\nGraphics - ReallyBasicGames\nSound Effects: - Kenney (visit at https://www.kenney.nl/assets)", 20, 20, width - 30, height - 20);
    }
    displayingControls = false;
    displayingStats = false;
    displayingStrats = false;
}


var displayingStrats = false;

function getStrats() {
    if(soundLevel == 1) clickEffect.play();
    background(0);
    if (!displayingStrats) {
        displayingStrats = true;
        // show the controls for the game
        textSize(16);
        fill(255);
        text("Try to increase your power as quickly as possible. It's OK to take some damage at the start of the game to get more expensive ships later. \n\nBuild some small ships to start, but try to work your way up to larger ships. They deal more damage and last longer.\n\nMake sure you upgrade damage and health, or your fleet will soon be destroyed!", 20, 20, width - 20, height - 20);
    }
    else {
        displayingStrats = false;
    }
    displayingControls = false;
    displayingStats = false;
    displayingCredits = false;
}

var displayingStats = false;

function getStats() {
    if(soundLevel == 1) clickEffect.play();
    loadStats();
    background(0);
    if (!displayingStats) {
        displayingStats = true;
        // show the controls for the game
        textSize(16);
        fill(255);
        text("Win / Game Ratio: " + wins.toString() + " / " + gamesPlayed.toString() + "\nTies: " + ties.toString() + "\nTime Played: " + timeToString() + "\nShips Destroyed: " + shipsDestroyed.toString() + "\nShips Built: " + shipsBuilt.toString(), 20, 20, width - 20, height - 20);
    }
    else {
        displayingStats = false;
    }
    displayingControls = false;
    displayingStrats = false;
    displayingCredits = false;
}

function clearStats() {
    console.log("stats cleared");
    storeItem("timePlayed", 0);
    storeItem("wins", 0);
    storeItem("gamesPlayed", 0);
    storeItem("ties", 0);
    storeItem("shipsBuilt", 0);
    storeItem("shipsDestroyed", 0);
    storeItem("missionsBeaten", 0);
    loadStats();
}

function loadStats() {
    wins = getItem('wins');
    if (wins == null) {
        wins = 0;
        storeItem("wins", wins);
    }
    gamesPlayed = getItem('gamesPlayed');
    if (gamesPlayed == null) {
        gamesPlayed = 0;
        storeItem("gamesPlayed", gamesPlayed);
    }
    ties = getItem('ties');
    if (ties == null) {
        ties = 0;
        storeItem("ties", ties);
    }
    timePlayed = getItem('timePlayed');
    if (timePlayed == null) {
        timePlayed = 0;
        storeItem("timePlayed", timePlayed);
    }
    shipsDestroyed = getItem('shipsDestroyed');
    if (shipsDestroyed == null) {
        shipsDestroyed = 0;
        storeItem("shipsDestroyed", shipsDestroyed);
    }
    shipsBuilt = getItem('shipsBuilt');
    if (shipsBuilt == null) {
        shipsBuilt = 0;
        storeItem("shipsBuilt", shipsBuilt);
    }

    missionsBeaten = getItem('missionsBeaten');
    if (missionsBeaten == null) {
        missionsBeaten = 0;
        storeItem("missionsBeaten", missionsBeaten);
    }

}

function timeToString() {
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

function goToGithub() {
    if(soundLevel == 1) clickEffect.play();
    window.open("https://github.com/ReallyBasicGames/Space-Blast", '_blank');
}

function loadOptions() {
    graphicsLevel = getItem('graphicsLevel');
    if (graphicsLevel == null) {
        graphicsLevel = 0;
        storeItem("graphicsLevel", graphicsLevel);
    }
    soundLevel = getItem('soundLevel');
    if (soundLevel == null) {
        soundLevel = 1;
        storeItem("soundLevel", soundLevel);
    }

    if(soundLevel == 1) bgMusic.play();
    loadOptionText();
}

function loadOptionText()
{
    // updating text
    if (graphicsLevel == 0) {
        document.getElementById("graphicsButton").innerHTML = "GRAPHICS OFF";
    }
    else {
        document.getElementById("graphicsButton").innerHTML = "GRAPHICS ON";
    }
    if (soundLevel == 0) {
        document.getElementById("soundButton").innerHTML = "SOUND OFF";
    }
    else {
        document.getElementById("soundButton").innerHTML = "SOUND ON";
    }
}

function saveOptions()
{
    storeItem("graphicsLevel", graphicsLevel);
    storeItem("soundLevel", soundLevel);
}

function graphics() {
    if(soundLevel == 1) clickEffect.play();
    if (graphicsLevel == 0) {
        graphicsLevel = 1;
        document.getElementById("graphicsButton").innerHTML = "GRAPHICS ON";
    }
    else if(graphicsLevel == 1){
        graphicsLevel = 0;
        document.getElementById("graphicsButton").innerHTML = "GRAPHICS OFF";
    }
    else
    {
        graphicsLevel = 1;
        document.getElementById("graphicsButton").innerHTML = "GRAPHICS ON";
    }
    saveOptions();
}

function sound() {
    if (soundLevel == 0) {
        soundLevel = 1;
        clickEffect.play();
        if(!bgMusic.isPlaying()) bgMusic.play();
        document.getElementById("soundButton").innerHTML = "SOUND ON";
    }
    else {
        bgMusic.stop();
        document.getElementById("soundButton").innerHTML = "SOUND OFF";
        soundLevel = 0;
    }
    saveOptions();
}

function goToTest()
{
    window.location.href = "test.html";
}

function clearCookies()
{
    clearStats();
    removeItem('graphicsLevel');
    removeItem('soundLevel');
    window.location.href = "test.html";
}

function goToTrello()
{
    if(soundLevel == 1) clickEffect.play();
    window.open("https://trello.com/b/q7f7LnAK", '_blank');
}

function goToDiscord()
{
    if(soundLevel == 1) clickEffect.play();
    window.open("https://discord.gg/CYV2jYBGJf", '_blank');
}






/*

---------------- MISSIONS

*/



function loadMissions()
{
    totalMissions = 3;
    for(var i = 0; i < totalMissions; i++)
    {
        var mission;
        if(missionsBeaten >= i) mission = new ButtonMission(50+i*200, 50, 100, 100, mapSelectedImg, i, false);
        else mission = new ButtonMission(50+i*200, 50, 100, 100, mapSelectedImg, i, true);
        //mission = new ButtonMission(50+i*200, 50, 100, 100, mapSelectedImg, i+1, true);
        missionButtons.push(mission);
    }
    missions.push(new MissionOne());
    missions.push(new MissionTwo());
    missions.push(new MissionThree());
    console.log("missions loaded");
}

// display the missions on the canvas
function displayMission(mission)
{
    // clear the bg
    background(0);
    // display each button
    for(var i = 0; i < missionButtons.length; i++)
    {
        missionButtons[i].display();
    }
    if(mission == -1) document.getElementById("play").disabled = true;
    else document.getElementById("play").disabled = false;
    document.getElementById("details").innerHTML = missionDetailText;
}

function missionText()
{
    //console.log("mission selected: " + missionSelected.toString());
    missionDetailText += missions[missionSelected].showMission();
    missionDetailText += missions[missionSelected].showDifficulty();
    missionDetailText += "<br>Completing this mission will unlock " + missions[missionSelected].unlock() + ".";
    document.getElementById("details").innerHTML = missionDetailText;
}

// mission text variables
let missionDetailText = "Select a mission below...";
let missionSelected = -1;
let missionButtons = [];

function mouseClicked()
{
    for(var i = 0; i < missionButtons.length; i++)
    {
        if(missionButtons[i].over())
        {
            if(soundLevel == 1) clickEffect.play();
            if(missionButtons[i].locked){
                missionDetailText = "Details for mission " + (i+1).toString() + ":";
                missionDetailText += "<br>This mission is locked. Complete prior missions to unlock this mission.<br><br><br><br><br><br>";
                document.getElementById("details").innerHTML = missionDetailText;
            }
            else
            {
                missionSelected = missionButtons[i].clicked();
                missionDetailText = "Details for mission " + (i+1).toString() + ":";
                missionText();
            }
            break;
        }
    }
    //missionDetailText = mouseX.toString() + ", " + mouseY.toString();
}


// BUTTON CLASS

class ButtonMission {
  
  constructor(inX, inY, inW, inH, inImg, inMission, locked) {
    this.x = inX;
    this.y = inY;
    this.img = inImg;
    this.w = inW;
    this.h = inH;
    this.mission = inMission;
    this.locked = locked;
  }
  
  display() {
    stroke(0);
    
    // tint the image on mouse hover
    if (this.over()) {
        noTint();
    } else {
        tint(100,100,100);
    }
    
    image(this.img, this.x, this.y, this.w, this.h);
  }

  clicked()
  {
      return this.mission;
  }

  over() {
      
    if(mouseX > this.x && (mouseX < this.x + this.w))
    {
        //console.log((this.x + this.w).toString());
        if(mouseY > this.y && (mouseY < this.y + this.h))
        {
            //console.log((this.y + this.h).toString());
            return true;
        }
    }
    return false;
  }
}