class Large extends Ship
{
  constructor(x, y, team)
  {
    super(x, y, team);
    this.health = 150; // how much health this has. Standard bullets deal 1 damage
    this.accel = 0.0001;
    this.angleAccel = 0.03; // how fast this object accelerates rotationally
    this.w = 32;
    this.h = 24;

    this.shotCooldown = 1750;
    this.maxBullets = 3;
    this.regenBulletTime = 2000;
  }

  draw()
  {
    if(this.destroyed) return;
    switch (this.team) {
      case "red":
        fill(255,105,97);
        stroke(255,105,97);
        break;
      case "green":
        fill(119,221,119);
        stroke(119,221,119);
        break;
      case "yellow":
        fill(253,253,150);
        stroke(253,253,150);
        break;
      case "blue":
        fill(128,206,255);
        stroke(128,206,255);
        break;
      default:
        fill(255,0,0);
        stroke(0,0,0);
    }
    strokeWeight(4);
    var pos = this.body.position;
    push();
    translate(pos.x,pos.y);
    rotate(this.body.angle);
    rectMode(CENTER);
    rect(0, 0,this.w,this.h);
    pop();
  }

  update()
  {
    // this ship has been destroyed
    if(this.health <= 0)
    {
      this.shipDestroy();
      return; // ignore everything else
    }

    this.regenBullets();


    // prioritize moving onto the screen
    if(this.isOutsideScreen())
    {
      this.updateTowardPos(windowWidth/2,windowHeight/2);
    }
    // the ship currently doesn't have a target
    else if(this.target == null){
      var enemies = shipHandler.getEnemies(this.team);
      this.target = enemies[int(random(enemies.length))];
      this.updateTowardPos(windowWidth/2,windowHeight/2);
    }
    else if(this.target.isOutsideScreen()) // the current target is outside the screen, so pick a different one
    {
      var enemies = shipHandler.getEnemies(this.team);
      this.target = enemies[int(random(enemies.length))];
      this.updateTowardPos(windowWidth/2,windowHeight/2);
    }
    else { // the ship has a target
      this.updateTowardPos(this.target.getPos().x, this.target.getPos().y);

      // check if we can shoot at the target
      var targetAngle = Matter.Vector.angle(this.body.position, this.target.getPos());
      targetAngle += 2*PI;
      targetAngle %= 2*PI;
      Matter.Body.setAngle(this.body, (this.body.angle+2*PI)%(2*PI));
      var resultAngle = this.body.angle - targetAngle;
      if(resultAngle > -0.1 && resultAngle < 0.1)
      {
        this.shoot();
      }
    }
  }

  shoot()
  {
    if(millis() - this.lastShotTime > this.shotCooldown)
    {
      if(this.bullets > 0)
      {
        this.bullets -= 1;
        var b = new LargeBullet(this.body.position.x, this.body.position.y, this.body.angle, this.team);
        var id = bulletHandler.addBullet(b);
        b.setID(id);
        this.shotCooldown = millis();
      }
    }
  }


}
