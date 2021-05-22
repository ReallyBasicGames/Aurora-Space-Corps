class Mission {
    constructor()
    {

    }

    startMission(shipHandler, canvasWidth, canvasHeight)
    {
        // create the map to initialize the game (two ships fighting is default)
        shipHandler.makeShip("factory", 0, 100, canvasHeight / 2, true, 0, 1, bossFighterImg[0]);
        shipHandler.makeShip("factory", 3, canvasWidth - 100, canvasHeight / 2, false, 0, 1, bossFighterImg[3]);
        aiCanUseSmall = true;
        aiCanUseMedium = true;
        aiCanUseLarge = true;
        aiCanUseBoss = true;
        playerCanUseSmall = true;
        playerCanUseMedium = true;
        playerCanUseLarge = true;
        playerCanUseBoss = true;
    }

    showMission()
    {
        let toReturn = "";
        // try to keep mission text to a minimum (only use these 5 lines)
        toReturn += "<br>Default mission text.";
        toReturn += "<br>";
        toReturn += "<br>";
        toReturn += "<br>";
        return toReturn;
    }

    showDifficulty()
    {
        // display map statistics
        var difficulty = 0; // can be a number from 0 to 4 (inclusive)
        // switch the difficulty and display the appropriate color
        // white, tan, orange, orangered, red
        // EASY, MEDIUM, HARD, EXTREME, ANNIHILATION
        var posColors = ["white", "tan", "orange", "orangered", "red"];
        var posDetail = ["EASY", "MEDIUM", "HARD", "EXTREME", "ANNIHILATION"];
        var disc = "<br>Difficultly Level:    <span style=color:" + posColors[difficulty] + ";><b>" + posDetail[difficulty] + "</b></span>";
        return disc;
    }

    unlock()
    {
        // returns the item unlocked
        return "large fighters";
    }
}

class MissionTemplate extends Mission{

    startMission(shipHandler, canvasWidth, canvasHeight)
    {
        // create the map to initialize the game (two ships fighting is default)
        shipHandler.makeShip("factory", 0, 100, canvasHeight / 2, true, 0, 1, bossFighterImg[0]);
        shipHandler.makeShip("factory", 3, canvasWidth - 100, canvasHeight / 2, false, 0, 1, bossFighterImg[3]);
        aiCanUseSmall = true;
        aiCanUseMedium = true;
        aiCanUseLarge = false;
        aiCanUseBoss = false;
        playerCanUseSmall = true;
        playerCanUseMedium = false;
        playerCanUseLarge = false;
        playerCanUseBoss = false;
    }

    showMission()
    {
        let toReturn = "";
        // try to keep mission text to a minimum (only use these 5 lines)
        toReturn += "<br>Default mission text.";
        toReturn += "<br>";
        toReturn += "<br>";
        toReturn += "<br>";
        return toReturn;
    }

    showDifficulty()
    {
        // display map statistics
        var difficulty = 0; // can be a number from 0 to 4 (inclusive)
        // switch the difficulty and display the appropriate color
        // white, tan, orange, orangered, red
        // EASY, MEDIUM, HARD, EXTREME, ANNIHILATION
        var posColors = ["white", "tan", "orange", "orangered", "red"];
        var posDetail = ["EASY", "MEDIUM", "HARD", "EXTREME", "ANNIHILATION"];
        var disc = "<br>Difficultly Level:    <span style=color:" + posColors[difficulty] + ";><b>" + posDetail[difficulty] + "</b></span>";
        return disc;
    }

    unlock()
    {
        // returns the item unlocked
        return "large fighters";
    }
}


class MissionOne extends Mission{

    startMission(shipHandler, canvasWidth, canvasHeight)
    {
        // create the map to initialize the game (two ships fighting is default)
        shipHandler.makeShip("factory", 0, 100, canvasHeight / 2, true, 0, 1, bossFighterImg[0]);
        shipHandler.makeShip("factory", 3, canvasWidth - 100, canvasHeight / 2, false, 0, 1, bossFighterImg[3]);
        aiCanUseSmall = true;
        aiCanUseMedium = true;
        aiCanUseLarge = false;
        aiCanUseBoss = false;
        playerCanUseSmall = true;
        playerCanUseMedium = false;
        playerCanUseLarge = false;
        playerCanUseBoss = false;
    }

    showMission()
    {
        let toReturn = "";
        // try to keep mission text to a minimum (only use these 5 lines)
        toReturn += "<br>After recently graduating from Star Acadamy, you find yourself taking a job as the next captain of the ship <em>Miricale Five</em>  for Aurora Star Corps.";
        toReturn += "<br>You realize it wasn't you skill that got you the job, but lack of entries: you are the only person who signed up.";
        toReturn += "<br>You are quickly assigned to the extensive challenge of recapturing the Codix Star System. ";
        toReturn += "<br>Don't worry; for your first mission, your only task is to raid a small research ficility close to planet Taln. Good luck captain.";
        return toReturn;
    }

    showDifficulty()
    {
        // display map statistics
        var difficulty = 0; // can be a number from 0 to 4 (inclusive)
        // switch the difficulty and display the appropriate color
        // white, tan, orange, orangered, red
        // EASY, MEDIUM, HARD, EXTREME, ANNIHILATION
        var posColors = ["white", "tan", "orange", "orangered", "red"];
        var posDetail = ["EASY", "MEDIUM", "HARD", "EXTREME", "ANNIHILATION"];
        var disc = "<br>Difficultly Level:    <span style=color:" + posColors[difficulty] + ";><b>" + posDetail[difficulty] + "</b></span>";
        return disc;
    }

    unlock()
    {
        // returns the item unlocked
        return "eclipse fighters";
    }
}

class MissionTwo extends Mission{

    startMission(shipHandler, canvasWidth, canvasHeight)
    {
        // create the map to initialize the game (two ships fighting is default)
        shipHandler.makeShip("factory", 0, 100, canvasHeight / 2, true, 0, 1, bossFighterImg[0]);
        shipHandler.makeShip("factory", 3, canvasWidth - 100, canvasHeight / 2, false, 0, 1, bossFighterImg[3]);
        aiCanUseSmall = true;
        aiCanUseMedium = true;
        aiCanUseLarge = true;
        aiCanUseBoss = false;
        playerCanUseSmall = true;
        playerCanUseMedium = true;
        playerCanUseLarge = false;
        playerCanUseBoss = false;
    }

    showMission()
    {
        let toReturn = "";
        // try to keep mission text to a minimum (only use these 5 lines)
        toReturn += "<br>Your success was impressive. So impressive, in fact, the Aurora Star Corps wish to test your skill further.";
        toReturn += "<br>Your next mission is to take out a small enemy fleet off of planet Crag. Aurora Star Corps believes they may";
        toReturn += "<br>be holding plans for an even larger Fighter-Class ship. ";
        toReturn += "<br>Don't underestimate them, captain, there is a reason you are in charge of the Miricale <em>Five</em>.";
        return toReturn;
    }

    showDifficulty()
    {
        // display map statistics
        var difficulty = 1; // can be a number from 0 to 4 (inclusive)
        // switch the difficulty and display the appropriate color
        // white, tan, orange, orangered, red
        // EASY, MEDIUM, HARD, EXTREME, ANNIHILATION
        var posColors = ["white", "tan", "orange", "orangered", "red"];
        var posDetail = ["EASY", "MEDIUM", "HARD", "EXTREME", "ANNIHILATION"];
        var disc = "<br>Difficultly Level:    <span style=color:" + posColors[difficulty] + ";><b>" + posDetail[difficulty] + "</b></span>";
        return disc;
    }

    unlock()
    {
        // returns the item unlocked
        return "nebula fighters";
    }
}

class MissionThree extends Mission{

    startMission(shipHandler, canvasWidth, canvasHeight)
    {
        // create the map to initialize the game (two ships fighting is default)
        shipHandler.makeShip("factory", 0, 100, canvasHeight / 2, true, 0, 1, bossFighterImg[0]);
        shipHandler.makeShip("factory", 3, canvasWidth - 100, canvasHeight / 2+100, false, 0, 1, bossFighterImg[3]);
        shipHandler.makeShip("factory", 3, canvasWidth - 100, canvasHeight / 2-100, false, 0, 1, bossFighterImg[3]);
        aiCanUseSmall = true;
        aiCanUseMedium = true;
        aiCanUseLarge = true;
        aiCanUseBoss = false;

        playerCanUseSmall = true;
        playerCanUseMedium = true;
        playerCanUseLarge = true;
        playerCanUseBoss = false;
    }

    showMission()
    {
        let toReturn = "";
        // try to keep mission text to a minimum (only use these 5 lines)
        toReturn += "<br>It appears you are unstoppable. Aurora Star Corps believes so, too, and is now assigning you your next mission.";
        toReturn += "<br>As fun as this has been, you aren't sure how much more of this you can take, and plan on retiring soon.";
        toReturn += "<br>Your final mission: destroy the rebel research outpost by planet Emeryx. They force there is extremely strong, so hit them fast and hard.";
        toReturn += "<br>Good luck captain. See you on the other side.";
        return toReturn;
    }

    showDifficulty()
    {
        // display map statistics
        var difficulty = 3; // can be a number from 0 to 4 (inclusive)
        // switch the difficulty and display the appropriate color
        // white, tan, orange, orangered, red
        // EASY, MEDIUM, HARD, EXTREME, ANNIHILATION
        var posColors = ["white", "tan", "orange", "orangered", "red"];
        var posDetail = ["EASY", "MEDIUM", "HARD", "EXTREME", "ANNIHILATION"];
        var disc = "<br>Difficultly Level:    <span style=color:" + posColors[difficulty] + ";><b>" + posDetail[difficulty] + "</b></span>";
        return disc;
    }

    unlock()
    {
        // returns the item unlocked
        return "???";
    }
}