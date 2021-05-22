class Chaos extends Fighter
{
  constructor(x, y, team, image, imageLights)
  {
    super(x, y, team, image, imageLights);
    this.health = 150; // how much health this has. Standard bullets deal 1 damage
    this.maxHealth = 150;

    // fighters should be relativly fast
    this.accel = 0.01;
    this.angleAccel = 0.075; // how fast this object accelerates rotationally

    this.w = 16;
    this.h = 16;

    this.shotCooldown = 50;
    this.maxBullets = 2;
    this.regenBulletTime = 100;
    this.shotWeight = 1;
    this.damage = 0;
    this.shotTime = 50; // how long it takes to fire
  }
}
