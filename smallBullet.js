class SmallBullet extends Bullet
{
  constructor(x, y, angle, team)
  {
    super(x,y,angle,team);
    this.damage = 1;

    this.w = 12;
    this.h = 2;

    this.speed = 17; 
  }
}
