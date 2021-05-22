class Fast extends Ship
{
  constructor(x, y, team, image, imageLights)
  {
    super(x, y, team, image, imageLights);
    this.health = 20; 
    this.maxHealth = 20;

    this.accel = 0.02;
    this.angleAccel = 0.1; 

    this.w = 16;
    this.h = 16;

    this.shotCooldown = 1000;
    this.maxBullets = 1;
    this.regenBulletTime = 900;

    this.shotWeight = 1;
  }
}