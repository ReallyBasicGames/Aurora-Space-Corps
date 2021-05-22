class Fighter extends Ship {
    constructor(x, y, team, image, imageLights) {
        super(x, y, team, image, imageLights);
        this.health = 20; // how much health this has. Standard bullets deal 1 damage
        this.maxHealth = 20;

        // fighters should be relativly fast
        this.accel = 0.01;
        this.angleAccel = 0.075; // how fast this object accelerates rotationally

        this.w = 16;
        this.h = 16;

        this.shotCooldown = 1000;
        this.maxBullets = 2;
        this.regenBulletTime = 1333;

        this.shotWeight = 1;
    }

}