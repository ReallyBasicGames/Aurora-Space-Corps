class MediumBullet extends Bullet
{
  constructor(x, y, angle, team)
  {
    super(x,y,angle,team);
    this.damage = 5;

    this.w = 12;
    this.h = 4;

    this.speed = 15; 
  }
}
