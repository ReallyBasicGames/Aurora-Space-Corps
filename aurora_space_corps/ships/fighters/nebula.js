class Nebula extends Fighter
{
  constructor(x, y, team, image, imageLights)
  {
    super(x, y, team, image, imageLights);
    this.health = 300; // how much health this has. Standard bullets deal 1 damage
    this.maxHealth = 300;

    // fighters should be relativly fast
    this.accel = 0.005;
    this.angleAccel = 0.055; // how fast this object accelerates rotationally

    this.w = 32;
    this.h = 32;

    this.shotCooldown = 100;
    this.maxBullets = 3;
    this.regenBulletTime = 1000;
    this.shotWeight = 5;
    this.damage = 0;
    this.shotTime = 100; // how long it takes to fire
  }
}