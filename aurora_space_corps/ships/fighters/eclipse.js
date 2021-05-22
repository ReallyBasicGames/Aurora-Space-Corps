class Eclipse extends Fighter
{
  constructor(x, y, team, image, imageLights)
  {
    super(x, y, team, image, imageLights);
    this.health = 250; // how much health this has. Standard bullets deal 1 damage
    this.maxHealth = 250;

    // fighters should be relativly fast
    this.accel = 0.007;
    this.angleAccel = 0.065; // how fast this object accelerates rotationally

    this.w = 24;
    this.h = 24;

    this.shotCooldown = 100;
    this.maxBullets = 6;
    this.regenBulletTime = 500;
    this.shotWeight = 2;
    this.damage = 0;
    this.shotTime = 50;
  }
}
