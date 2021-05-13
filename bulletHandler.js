function BulletHandler()
{
  this.redBullets = [];
  this.yellowBullets = [];
  this.greenBullets = [];
  this.blueBullets = [];
  this.teams = ["red", "yellow", "green", "blue"];

  this.isRemoving = false;

  this.debugBulletCount = function()
  {
    console.log(this.redBullets.length.toString());
  }

  this.addBullet = function(bullet)
  {
    switch(bullet.getTeam())
    {
      case "red":
        for(var i = 0; i < this.redBullets.length; i++)
        {
          if(this.redBullets[i] == null)
          {
            this.redBullets[i] = bullet;
            return i;
          }
        }
        this.redBullets.push(bullet);
        return this.redBullets.length-1;
      case "yellow":
        for(var i = 0; i < this.yellowBullets.length; i++)
        {
          if(this.yellowBullets[i] == null)
          {
            this.yellowBullets[i] = bullet;
            return i;
          }
        }
        this.yellowBullets.push(bullet);
        return this.yellowBullets.length-1;
      case "green":
        for(var i = 0; i < this.greenBullets.length; i++)
        {
          if(this.greenBullets[i] == null)
          {
            this.greenBullets[i] = bullet;
            return i;
          }
        }
        this.greenBullets.push(bullet);
        return this.greenBullets.length-1;
      case "blue":
        for(var i = 0; i < this.blueBullets.length; i++)
        {
          if(this.blueBullets[i] == null)
          {
            this.blueBullets[i] = bullet;
            return i;
          }
        }
        this.blueBullets.push(bullet);
        return this.blueBullets.length-1;
    }
  }

  this.removebullet = function(bullet)
  {
    this.isRemoving = true;
    switch(bullet.getTeam())
    {
      case "red":
        this.redBullets[bullet.getID()] = null;
        //console.log(this.redBullets.length.toString());
        break;
      case "yellow":
        //console.log(this.yellowBullets.length.toString());
        this.yellowBullets[bullet.getID()] = null;
        break;
      case "green":
        //console.log(this.greenBullets.length.toString());
        this.greenBullets[bullet.getID()] = null;
        break;
      case "blue":
        //console.log(this.blueBullets.length.toString());
        this.blueBullets[bullet.getID()] = null;
        break;
    }
    this.isRemoving = false;
  }

  this.update = function()
  {
    if(this.isRemoving) {
      //console.log("was removing something");
      return;
    }
    for(var i = 0; i < this.yellowBullets.length; i++)
    {
      if(this.yellowBullets[i] == null) continue;
      this.yellowBullets[i].update();
    }
    for(var i = 0; i < this.greenBullets.length; i++)
    {
      if(this.greenBullets[i] == null) continue;
      this.greenBullets[i].update();
    }
    for(var i = 0; i < this.blueBullets.length; i++)
    {
      if(this.blueBullets[i] == null) continue;
      this.blueBullets[i].update();
    }
    for(var i = 0; i < this.redBullets.length; i++)
    {
      if(this.redBullets[i] == null) continue;
      this.redBullets[i].update();
    }
  }

  this.draw = function()
  {
    for(var i = 0; i < this.yellowBullets.length; i++)
    {
      if(this.yellowBullets[i] == null) continue;
      this.yellowBullets[i].draw();
    }
    for(var i = 0; i < this.greenBullets.length; i++)
    {
      if(this.greenBullets[i] == null) continue;
      this.greenBullets[i].draw();
    }
    for(var i = 0; i < this.blueBullets.length; i++)
    {
      if(this.blueBullets[i] == null) continue;
      this.blueBullets[i].draw();
    }
    for(var i = 0; i < this.redBullets.length; i++)
    {
      if(this.redBullets[i] == null) continue;
      this.redBullets[i].draw();
    }
  }
}
