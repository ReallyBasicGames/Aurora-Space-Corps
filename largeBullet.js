class LargeBullet extends Bullet
{
  constructor(x, y, angle, team)
  {
    super(x,y,angle,team);
    this.damage = 7;

    this.w = 16;
    this.h = 6;

    this.speed = 0.35; // 0.5 should be the the fastest speed
  }
}
