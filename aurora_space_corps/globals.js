// the images that are stored upon loading
let smallFighterImg = [];
let medFighterImg = [];
let largeFighterImg = [];
let bossFighterImg = [];


// -------- figher images -------- 
let chaosFighterImg;
let chaosLightsImg = [];
let eclipseFighterImg;
let eclipseLightsImg = [];
let nebulaFighterImg;
let nebulaLightsImg = [];
let bolideFighterImg;
let bolideLightsImg = [];
// let azimuthFighterImg = [];
// let umbraFighterImg = [];



// stats
let wins = 0;
let gamesPlayed = 0;
let timePlayed = 0;
let ties = 0;
let shipsDestroyed = 0;
let shipsBuilt = 0;


// the amount of factory ships currently in play
// if this number becomes 1 or less, the game is over
// and the player is taken back to the menu screen
let currentFactories = 0;

// graphics level, 0 for low graphics, 1 for high graphics
let graphicsLevel = 1;
// sound level, 0 for no sounds, 1 for all sounds
let soundLevel = 0;


// -------- sounds ---------------

let bgMusic;


// effects MENU
let clickEffect;


// effects GAME
let bulletEffect;
let bulletSize = [0.2, 0.4, 0.6, 0.6];
let explosionEffect;
let explosionSize = [0.2, 0.4, 0.6, 0.8, 1];
let engineEffect;


let missionsBeaten = 0;


let missions = [];

let aiCanUseSmall = true;
let aiCanUseMedium = false;
let aiCanUseLarge = false;
let aiCanUseBoss = false;

let playerCanUseSmall = true;
let playerCanUseMedium = false;
let playerCanUseLarge = false;
let playerCanUseBoss = false;





// test images
let testShipOne;
let testShipOneLights;