function ShipHandler()
{
  this.redShips = [];
  this.yellowShips = [];
  this.greenShips = [];
  this.blueShips = [];

  this.makeShip = function(shipType, team, x, y, isPlayer, damageBonus, healthBonus, image, imageLights)
  {
    switch(shipType)
    {
    case "boss":
        var tempShip = new Boss(x,y,team, image);
        this.addShip(tempShip);
        tempShip.changeHealth(healthBonus);
        tempShip.changeDamage(damageBonus);
        break;
    case "factory":
        var tempShip = new FactoryShip(x,y,team, image)
        this.addShip(tempShip);
        tempShip.setPlayerControlled(isPlayer);
        if(isPlayer) player = tempShip;
        break;
    case "chaos":
        var tempShip = new Chaos(x,y,team, image, imageLights)
        this.addShip(tempShip);
        tempShip.changeHealth(healthBonus);
        tempShip.changeDamage(damageBonus);
        break;
    case "eclipse":
        var tempShip = new Eclipse(x,y,team, image, imageLights)
        this.addShip(tempShip);
        tempShip.changeHealth(healthBonus);
        tempShip.changeDamage(damageBonus);
        break;
    case "nebula":
        var tempShip = new Nebula(x,y,team, image, imageLights)
        this.addShip(tempShip);
        tempShip.changeHealth(healthBonus);
        tempShip.changeDamage(damageBonus);
        break;
    case "bolide":
        var tempShip = new Bolide(x,y,team, image, imageLights)
        this.addShip(tempShip);
        tempShip.changeHealth(healthBonus);
        tempShip.changeDamage(damageBonus);
        break;
    default:
        var image = smallFighterImg[0];
        this.addShip(new Ship(x,y,team, image));
        break;
    }
  }

  this.addShip = function(ship)
  {
    switch(ship.getTeam())
    {
      case 0:
        for(var i = 0; i < this.redShips.length; i++)
        {
          if(this.redShips[i] == null)
          {
            this.redShips[i] = ship;
            ship.setID(i);
            return;
          }
        }
        this.redShips.push(ship);
        ship.setID(this.redShips.length-1);
        break;
      case 1:
        for(var i = 0; i < this.yellowShips.length; i++)
        {
          if(this.yellowShips[i] == null)
          {
            this.yellowShips[i] = ship;
            ship.setID(i);
            return;
          }
        }
        this.yellowShips.push(ship);
        ship.setID(this.yellowShips.length-1);
        break;
      case 2:
        for(var i = 0; i < this.greenShips.length; i++)
        {
          if(this.greenShips[i] == null)
          {
            this.greenShips[i] = ship;
            ship.setID(i);
            return;
          }
        }
        this.greenShips.push(ship);
        ship.setID(this.greenShips.length-1);
        break;
      case 3:
        for(var i = 0; i < this.blueShips.length; i++)
        {
          if(this.blueShips[i] == null)
          {
            this.blueShips[i] = ship;
            ship.setID(i);
            return;
          }
        }
        this.blueShips.push(ship);
        ship.setID(this.blueShips.length-1);
        break;
    }
  }

  this.removeShip = function(ship)
  {

    switch(ship.getTeam())
    {
      case 0:
        this.redShips[ship.getID()] = null;
        break;
      case 1:
        this.yellowShips[ship.getID()] = null;
        break;
      case 2:
        this.greenShips[ship.getID()] = null;
        break;
      case 3:
        this.blueShips[ship.getID()] = null;
        break;
    }
    if(player.getTeam() != ship.getTeam()) shipsDestroyed ++;
  }

  this.getEnemies = function(team)
  {
    var toReturn = [];

    if(team != 0)
    {
      for(var i = 0; i < this.redShips.length; i++)
      {
        if(this.redShips[i] == null) continue;
        toReturn.push(this.redShips[i]);
      }
    }
    if(team != 1)
    {
      for(var i = 0; i < this.yellowShips.length; i++)
      {
        if(this.yellowShips[i] == null) continue;
        toReturn.push(this.yellowShips[i]);
      }
    }
    if(team != 2)
    {
      for(var i = 0; i < this.greenShips.length; i++)
      {
        if(this.greenShips[i] == null) continue;
        toReturn.push(this.greenShips[i]);
      }
    }
    if(team != 3)
    {
      for(var i = 0; i < this.blueShips.length; i++)
      {
        if(this.blueShips[i] == null) continue;
        toReturn.push(this.blueShips[i]);
      }
    }
    return toReturn;
  }

  this.update = function()
  {
    for(var i = 0; i < this.redShips.length; i++)
    {
      if(this.redShips[i] == null) continue;
      this.redShips[i].update();
    }
    for(var i = 0; i < this.yellowShips.length; i++)
    {
      if(this.yellowShips[i] == null) continue;
      this.yellowShips[i].update();
    }
    for(var i = 0; i < this.greenShips.length; i++)
    {
      if(this.greenShips[i] == null) continue;
      this.greenShips[i].update();
    }
    for(var i = 0; i < this.blueShips.length; i++)
    {
      if(this.blueShips[i] == null) continue;
      this.blueShips[i].update();
    }
  }

  this.draw = function()
  {
    for(var i = 0; i < this.redShips.length; i++)
    {
      if(this.redShips[i] == null) continue;
      this.redShips[i].draw();
    }
    for(var i = 0; i < this.yellowShips.length; i++)
    {
      if(this.yellowShips[i] == null) continue;
      this.yellowShips[i].draw();
    }
    for(var i = 0; i < this.greenShips.length; i++)
    {
      if(this.greenShips[i] == null) continue;
      this.greenShips[i].draw();
    }
    for(var i = 0; i < this.blueShips.length; i++)
    {
      if(this.blueShips[i] == null) continue;
      this.blueShips[i].draw();
    }
  }
}
