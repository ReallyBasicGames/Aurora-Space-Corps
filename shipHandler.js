function ShipHandler()
{
  this.redShips = [];
  this.yellowShips = [];
  this.greenShips = [];
  this.blueShips = [];
  this.teams = ["red", "yellow", "green", "blue"];

  this.makeShip = function(shipType, team, x, y, isPlayer, damageBonus, healthBonus)
  {
    switch(shipType)
    {
      case "small":
        var tempShip = new Small(x,y,team);
        this.addShip(tempShip);
        tempShip.changeHealth(healthBonus);
        tempShip.changeDamage(damageBonus);
        break;
      case "medium":
        var tempShip = new Medium(x,y,team);
        this.addShip(tempShip);
        tempShip.changeHealth(healthBonus);
        tempShip.changeDamage(damageBonus);
        break;
      case "large":
        var tempShip = new Large(x,y,team);
        this.addShip(tempShip);
        tempShip.changeHealth(healthBonus);
        tempShip.changeDamage(damageBonus);
        break;
      case "boss":
        var tempShip = new Boss(x,y,team);
        this.addShip(tempShip);
        tempShip.changeHealth(healthBonus);
        tempShip.changeDamage(damageBonus);
        break;
      case "factory":
        var tempShip = new FactoryShip(x,y,team)
        this.addShip(tempShip);
        tempShip.setPlayerControlled(isPlayer);
        if(isPlayer) player = tempShip;
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
      case "red":
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
      case "yellow":
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
      case "green":
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
      case "blue":
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
      case "red":
        this.redShips[ship.getID()] = null;
        break;
      case "yellow":
        this.yellowShips[ship.getID()] = null;
        break;
      case "green":
        this.greenShips[ship.getID()] = null;
        break;
      case "blue":
        this.blueShips[ship.getID()] = null;
        break;
    }
    if(player.getTeam() != ship.getTeam()) shipsDestroyed ++;
  }

  this.getEnemies = function(team)
  {
    var toReturn = [];

    if(team != "red")
    {
      for(var i = 0; i < this.redShips.length; i++)
      {
        if(this.redShips[i] == null) continue;
        toReturn.push(this.redShips[i]);
      }
    }
    if(team != "blue")
    {
      for(var i = 0; i < this.blueShips.length; i++)
      {
        if(this.blueShips[i] == null) continue;
        toReturn.push(this.blueShips[i]);
      }
    }
    if(team != "yellow")
    {
      for(var i = 0; i < this.yellowShips.length; i++)
      {
        if(this.yellowShips[i] == null) continue;
        toReturn.push(this.yellowShips[i]);
      }
    }
    if(team != "green")
    {
      for(var i = 0; i < this.greenShips.length; i++)
      {
        if(this.greenShips[i] == null) continue;
        toReturn.push(this.greenShips[i]);
      }
    }
    return toReturn;
  }

  this.update = function()
  {
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
    for(var i = 0; i < this.redShips.length; i++)
    {
      if(this.redShips[i] == null) continue;
      this.redShips[i].update();
    }
  }

  this.draw = function()
  {
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
    for(var i = 0; i < this.redShips.length; i++)
    {
      if(this.redShips[i] == null) continue;
      this.redShips[i].draw();
    }
  }

  this.IsBulletColliding = function(bullet, team)
  {
    if(team != "red")
    {
      for(var i = 0; i < this.redShips.length; i++)
      {
        if(this.redShips[i] == null) continue;
        if(dist(this.redShips[i].getPos().x, this.redShips[i].getPos().y, bullet.getPos().x, bullet.getPos().y) < bullet.getSize()/2 + this.redShips[i].getSize()/2)
        {
          this.redShips[i].damageShip(bullet.getDamage());
          return true;
        }
      }

    }
    if(team != "blue")
    {
      for(var i = 0; i < this.blueShips.length; i++)
      {
        if(this.blueShips[i] == null) continue;
        if(dist(this.blueShips[i].getPos().x, this.blueShips[i].getPos().y, bullet.getPos().x, bullet.getPos().y) < bullet.getSize()/2 + this.blueShips[i].getSize()/2)
        {
          this.blueShips[i].damageShip(bullet.getDamage());
          return true;
        }
      }

    }
    if(team != "yellow")
    {
      for(var i = 0; i < this.yellowShips.length; i++)
      {
        if(this.yellowShips[i] == null) continue;
        if(dist(this.yellowShips[i].getPos().x, this.yellowShips[i].getPos().y, bullet.getPos().x, bullet.getPos().y) < bullet.getSize()/2 + this.yellowShips[i].getSize()/2)
        {
          this.yellowShips[i].damageShip(bullet.getDamage());
          return true;
        }
      }

    }
    if(team != "green")
    {
      for(var i = 0; i < this.greenShips.length; i++)
      {
        if(this.greenShips[i] == null) continue;
        if(dist(this.greenShips[i].getPos().x, this.greenShips[i].getPos().y, bullet.getPos().x, bullet.getPos().y) < bullet.getSize()/2 + this.greenShips[i].getSize()/2)
        {
          this.greenShips[i].damageShip(bullet.getDamage());
          return true;
        }
      }

    }
  }
}
