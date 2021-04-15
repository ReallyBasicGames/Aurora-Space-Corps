class Bullet
{
  constructor(x, y, angle, team)
  {
    if(debugging)
    {
      this.damage = 50;
    }
    else {
      this.damage = 1;
    }
    this.damage = 1;
    this.team = team;

    this.w = 12;
    this.h = 2;
    var options = {
      mass: 10,
      friction: 0, // (0, 1)
      restitution: .6,// bounciness (0, 1)
      isSensor: true,
      frictionAir: 0
    }
    this.body = Bodies.rectangle(x,y,this.w,this.h, options);

    World.add(world, this.body);
    Matter.Body.setAngle(this.body, angle);
    Matter.Body.applyForce(this.body, this.body.position, {
      x: cos(this.body.angle) * 0.5,
      y: sin(this.body.angle) * 0.5
    });

    this.id = 0;
    this.destroyed = false;
  }

  setID(id)
  {
    this.id = id;
  }

  getID()
  {
    return this.id;
  }

  getTeam()
  {
    return this.team;
  }

  draw()
  {
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
    strokeWeight(1);
    var pos = this.body.position;
    push();
    translate(pos.x,pos.y);
    rotate(this.body.angle);
    rectMode(CENTER);
    rect(0, -this.h/2,this.w,this.h);
    pop();
  }

  update()
  {
    this.isOutsideScreen();
    if(shipHandler.IsBulletColliding(this, this.team))
    {
      this.destroyBullet();
    }
  }

  getPos()
  {
    return this.body.position;
  }

  getSize()
  {
    return this.w;
  }

  getDamage()
  {
    return this.damage;
  }

  isOutsideScreen()
  {
    var pos = this.body.position;

    // I used a 50 px border for this to make sure the bullet doesn't vanish on the edge of the screen
    if(pos.x <= -50 || pos.x >= width+50)
    {
      if(pos.y >= -50 && pos.y <= height+50)
      {
        //console.log("a bullet was outside the screen!");
        this.destroyBullet();
      }
    }
  }

  destroyBullet()
  {
    bulletHandler.removebullet(this);
    Matter.Composite.remove(world, this.body);
    this.destroyed = true;
  }
}
