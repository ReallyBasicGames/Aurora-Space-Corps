// module aliases
var Engine = Matter.Engine,
    // Render = Matter.Render, // I am using P5's renderer system, so I commented this out
    World = Matter.World,
    Bodies = Matter.Bodies;

var engine;
var world;
var ships = [];
var teams = ["red", "yellow", "green", "blue"];
var shipHandler;
var bulletHandler;

var debugging = false;

var bulletTime = 0;
var countBulletInc = 1000;

var player;

var ending = false;

var bgMusic;

function preload() {
  // load small fighters
  for(var i = 0; i < 4; i++)
  {
    smallFighterImg.push(loadImage('/images/small_' + i.toString() + '.png'));
  }
  // load medium fighters
  for(var i = 0; i < 4; i++)
  {
    medFighterImg.push(loadImage("/images/medium_" + i.toString() + ".png"));
  }
  // load large fighters
  for(var i = 0; i < 4; i++)
  {
    largeFighterImg.push(loadImage("/images/large_" + i.toString() + ".png"));
  }
  // load boss fighters
  for(var i = 0; i < 4; i++)
  {
    bossFighterImg.push(loadImage("/images/boss_" + i.toString() + ".png"));
  }

  bgMusic = loadSound("sounds/Space_Ambient_Music.mp3");
}

function loadOptions() {
    var x = document.getElementById("graphicsButton");
    graphicsLevel = getItem('graphicsLevel');
    if (graphicsLevel == null) {
        graphicsLevel = 0;
        storeItem("graphicsLevel", graphicsLevel);
    }
    var y = document.getElementById("soundButton");
    soundLevel = getItem('soundLevel');
    if (soundLevel == null) {
        soundLevel = 0;
        storeItem("soundLevel", soundLevel);
    }
}

function setup() {
  createCanvas(windowWidth-40, windowHeight-40);
  gamesPlayed ++;
  engine = Engine.create();
  world = engine.world;
  engine.world.gravity.y = 0;
  Engine.run(engine);
  shipHandler = new ShipHandler();
  bulletHandler = new BulletHandler();
  loadOptions();
  //startDebugGame();
  //startUnfair();
  //createFactoryShips();
  testImages();
  if(soundLevel == 1) bgMusic.play();
}

function gameEnd()
{
  if(ending) return;
  if(currentFactories > 1) return;
  ending = true;
  timePlayed = getItem("timePlayed");
  timePlayed += millis();
  storeItem("timePlayed", timePlayed);
  gamesPlayed = getItem("gamesPlayed");
  gamesPlayed ++;
  storeItem("gamesPlayed", gamesPlayed);
  wins = getItem("wins");
  ties = getItem("ties");
  shipsBuilt += getItem("shipsBuilt");
  shipsDestroyed += getItem("shipsDestroyed");
  storeItem("shipsBuilt", shipsBuilt);
  storeItem("shipsDestroyed", shipsDestroyed);
  if(player != null)
  {
    if(wins == null) storeItem("wins", 1);
    else {
      wins ++;
      storeItem("wins", wins);
    }
  }
  if(currentFactories == 0) {
    ties ++;
    storeItem("ties", ties);
  }
  else {
    if(ties == null) storeItem("ties", 0);
    else storeItem("ties", ties);
  }
  window.location.href="main_menu.html";
}

function draw() {
  gameEnd();
  update();
  background(51);
  // draw bullets below ships
  bulletHandler.draw();
  // draw ships
  shipHandler.draw();

  drawPrices();
}

function update() {
  shipHandler.update();
  bulletHandler.update();
  if(debugging && millis() - bulletTime > countBulletInc)
  {
    bulletTime = millis();
    bulletHandler.debugBulletCount();
  }
}

function stopGame()
{
  // breaks the game for debugging purposes
  world = null;
}

function startDebugGame()
{
  var xPos = 20;
  var yPos = 20;
  var changeInPos = 25;
  var xArr = [changeInPos, width - changeInPos - (changeInPos * 5), changeInPos, width - changeInPos - (changeInPos * 5)];
  var yArr = [changeInPos, height - changeInPos - (changeInPos * 5), height - changeInPos - (changeInPos * 5), changeInPos];
  for(var c = 0; c < teams.length; c++)
  {
    xPos = xArr[c];
    yPos = yArr[c];
    for(var i = 0; i < 5; i++)
    {
      for(var j = 0; j < 5; j++)
      {
        if(i == j)
        {
          if(i == 1 || i == 3)
          {
            shipHandler.makeShip("large", teams[c], xPos + i * changeInPos, yPos + j * changeInPos);
          }
          else if (i == 0 || i == 4){
            shipHandler.makeShip("medium", teams[c], xPos + i * changeInPos, yPos + j * changeInPos);
          }
          else {
            shipHandler.makeShip("boss", teams[c], xPos + i * changeInPos, yPos + j * changeInPos);
          }
        }
        else {
          shipHandler.makeShip("small", teams[c], xPos + i * changeInPos, yPos + j * changeInPos);
        }
      }
    }
  }
}

function startUnfair()
{
  let gridSizeX = 2;
  let gridSizeY = 5;

  // red team, consisting of only small ships. about 60-70 hits to kill boss
  for(var i = 0; i < gridSizeX; i++)
  {
    for(var j = 0; j < gridSizeY; j++)
    {
      shipHandler.makeShip("small", teams[0], 20 + i * 25, height/2 - 200 + (20 + j * 100));
    }
  }

  // blue team, only 1 boss ship. each bullet from the boss ship kills small ships instantly

  shipHandler.makeShip("large", teams[2], width - 100, height/2);
  shipHandler.makeShip("large", teams[2], width - 200, height/2);

}

function createFactoryShips()
{
  shipHandler.makeShip("factory", teams[0], 100, height/2, true);
  shipHandler.makeShip("factory", teams[3], width-100, height/2, false);
  setPlayerColor();
}

function testImages()
{
    currentFactories = 2;
    //function(shipType, team, x, y, isPlayer, damageBonus, healthBonus, image)
    shipHandler.makeShip('default', teams[0], 100, 100, false, 0, 1, smallFighterImg[0]);
    shipHandler.makeShip('small', teams[0], 200, 100, false, 0, 1, smallFighterImg[0]);
    shipHandler.makeShip('medium', teams[0], 300, 100, false, 0, 1, medFighterImg[0]);
    shipHandler.makeShip('large', teams[0], 400, 100, false, 0, 1, largeFighterImg[0]);
    shipHandler.makeShip('boss', teams[0], 500, 100, false, 0, 1, bossFighterImg[0]);
    shipHandler.makeShip("factory", teams[0], 600, height/2, true, 0, 1, bossFighterImg[0]);
}


function drawPrices()
{
  // UI background
  fill(180);
  strokeWeight(0);
  rect(0,height-60, width, 60);

  // power bar background
  fill(150);
  rect(10, height-50, (width-20), 40);
  // power bar
  fill(255);
  rect(10, height-50, (width-20) * (player.getPower() / player.getMaxPower()), 40);

  // display ship costs
  for(var i = 0; i < player.getPricesShips().length; i++)
  {
    if(player.getMaxPower() >= player.getPricesShips()[i])
    {
      fill(playerColor.r, playerColor.g, playerColor.b, 150);
      rect(10, height-50, (width-20) * (player.getPricesShips()[i] / player.getMaxPower()), 20);
    }
  }

  // display time to purchase next ship
  for(var i = 0; i < player.getPricesShips().length; i++)
  {
    if(player.getPower() < player.getPricesShips()[i])
    {
      textSize(16);
      fill(0,0,0,255);
      textAlign(CENTER);
      if(player.getMaxPower() < player.getPricesShips()[i])
      {
        text("UPGRADE POWER TO PURCHASE NEXT SHIP", width/2, height - 34);
      }
      else {
        var timeToShip = round((player.getPricesShips()[i] - player.getPower()) / player.getPowerRegen()/10)/10;
        text("NEXT SHIP IN " + timeToShip.toString() + " SECONDS", width/2, height - 34);
      }
      break;
    }
    else if(i == player.getPricesShips().length-1)
    {
      textSize(16);
      fill(0,0,0,255);
      textAlign(CENTER);
      if(player.getMaxPower() == player.getPower()){
        text("MAX POWER", width/2, height - 34);
      }
      else {
        textSize(16);
        fill(0,0,0,255);
        textAlign(CENTER);
        var timeToMax = round((player.getMaxPower() - player.getPower()) / player.getPowerRegen()/10)/10;
        text("MAX POWER IN " + timeToMax.toString() + " SECONDS", width/2, height - 34);
        break;
      }
      break;
    }
  }
  /*
  // display upgrade costs
  for(var i = 0; i < player.getPricesShips().length; i++)
  {
    if(player.getMaxPower() >= player.getPricesShips()[i])
    {
      fill(playerColor.r, playerColor.g, playerColor.b, 100);
      rect(10, height-50, (width-20) * (player.getPricesShips()[i] / player.getMaxPower()), 20);
    }
  }

  // display time to purchase upgrade
  for(var i = 0; i < player.getPricesShips().length; i++)
  {
    if(player.getPower() < player.getPricesShips()[i])
    {
      var timeToShip = round((player.getPricesShips()[i] - player.getPower()) / player.getPowerRegen()/10)/10;
      textSize(16);
      fill(0,0,0,255);
      textAlign(CENTER);
      text("NEXT SHIP IN " + timeToShip.toString() + " SECONDS", width/2, height - 34);
      break;
    }
  }
  */
}

let playerColor = {
  r: 0,
  g: 0,
  b: 0
}

function setPlayerColor()
{
  switch (player.getTeam()) {
    case "red":
      playerColor = {
        r: 255,
        g: 105,
        b: 97
      }
      break;
    case "green":
      playerColor = {
        r: 119,
        g: 221,
        b: 119
      }
      break;
    case "yellow":
      playerColor = {
        r: 253,
        g: 253,
        b: 150
      }
      break;
    case "blue":
      playerColor = {
        r: 128,
        g: 206,
        b: 255
      }
      break;
    default:
      fill(255,0,0);
      stroke(0,0,0);
  }
}
