class Ship {
    constructor(x, y, team, image, imageLights) {
        this.health = 5; // how much health this has. Standard bullets deal 1 damage
        this.maxHealth = 5;
        this.firerate = 1; // shots per second
        this.accel = 0.01; // how fast this objcet accelerates
        this.angleAccel = 0.5; // how fast this object accelerates rotationally
        this.team = team;
        this.w = 6;
        this.h = 4;
        this.target = null;
        // the physics object for this object
        var options = {
            mass: 10,
            friction: .3, // (0, 1)
            restitution: .6,// bounciness (0, 1)
            isSensor: true
        }
        this.body = Bodies.rectangle(x, y, this.w, this.h, options);
        World.add(world, this.body);

        this.lastShotTime = 0; // the time that the laser was last fired
        this.shotCooldown = 250; // time between shots
        this.bullets = 0; // how many bullets this has
        this.maxBullets = 6; // the total amount of bullets this can store (depreciated)
        this.lastTimeRegened = 0; // the last time a bullet was added to the bullets stored
        this.regenBulletTime = 250; // the amount of time to regenerate bullets

        this.id = 0;
        this.destroyed = false;

        this.image = image;
        this.imageLights = imageLights;

        this.damage = 1; // standard damage. used to increase damage without increasing shot weight
        this.shotWeight = 1; // how big the laser is, as well as increases damage.
        this.shotTime = 500; // how long it takes to fire
        this.startedShootingTime = 0;
        this.isShooting = false;
    }

    getID() {
        return this.id;
    }

    setID(id) {
        this.id = id;
    }

    changeHealth(multi) {
        this.health *= multi;
    }

    changeDamage(damage) {
        this.damage += damage;
    }

    shoot() {
        
        if (millis() - this.lastShotTime > this.shotCooldown) {
            if (this.bullets > 0) {
                if(!this.isShooting) {
                    this.isShooting = true;
                    this.startedShootingTime = millis();
                }
                if(millis() - this.startedShootingTime >= this.shotTime) {
                    this.bullets --;
                    this.lastShotTime = millis();
                    this.isShooting = false;
                    return;
                }
                

                this.target.damageShip(this.shotWeight + this.damage);
                //this.bullets -= 1;

                // create a white laser to the enemy ship
                // the outside of the laser
                let pos = this.body.position;
                strokeWeight(this.shotWeight * 3);
                stroke(255, 100);
                fill(255);
                push();
                line(pos.x, pos.y, this.target.body.position.x, this.target.body.position.y);


                strokeWeight(this.shotWeight * 1.5);
                stroke(255, 255);
                fill(255);
                line(pos.x, pos.y, this.target.body.position.x, this.target.body.position.y);
            }
        }
    }

    regenBullets() {
        if (millis() - this.lastTimeRegened > this.regenBulletTime) {
            if (this.bullets < this.maxBullets) {
                this.bullets += 1;
                this.lastTimeRegened = millis();
            }
        }
    }

    draw() {
        if (this.destroyed) return;
        switch (this.team) {
            case 0:
                fill(255, 105, 97);
                stroke(255, 105, 97);

                break;
            case 1:
                fill(253, 253, 150);
                stroke(253, 253, 150);

                break;
            case 2:
                fill(119, 221, 119);
                stroke(119, 221, 119);

                break;
            case 3:
                fill(128, 206, 255);
                stroke(128, 206, 255);

                break;
            default:
                fill(255, 0, 0);
                stroke(0, 0, 0);
        }
        strokeWeight(4);
        var pos = this.body.position;
        push();
        translate(pos.x, pos.y);
        rotate(this.body.angle);
        if (graphicsLevel == 1) {
            noTint()
            image(this.image, -this.w / 2, -this.h / 2, this.w, this.h);


            var alpha;
            //  vary by percent of health; the lower the percent, the bigger the varience
            alpha = Math.cos((millis() / (159) / ((this.health + 50) / this.maxHealth))) * 127 * (1 - this.health / this.maxHealth) + 127 + (127 * this.health / this.maxHealth);
            //console.log("health percentage: " + (this.health/this.maxHealth).toString() + " result alpha: " + alpha.toString());

            switch (this.team) {
                case 0:
                    fill(255, 105, 97);
                    stroke(255, 105, 97);
                    tint(alpha);
                    break;
                case 1:
                    fill(253, 253, 150);
                    stroke(253, 253, 150);
                    tint(alpha);
                    break;
                case 2:
                    fill(119, 221, 119);
                    stroke(119, 221, 119);
                    tint(alpha);
                    break;
                case 3:
                    fill(128, 206, 255);
                    stroke(128, 206, 255);
                    tint(alpha);
                    break;
                default:
                    fill(255, 0, 0);
                    stroke(0, 0, 0);
                    tint(255, 0, 0);
            }
            image(this.imageLights, -this.w / 2, -this.h / 2, this.w, this.h);
            noTint();
        }
        else {
            rectMode(CENTER);
            rect(0, 0, this.w, this.h);
        }
        pop();
    }

    getSize() {
        return this.w;
    }

    getTeam() {
        return this.team;
    }

    shipDestroy() {
        if (this.destroyed) return;
        shipHandler.removeShip(this);
        Matter.Composite.remove(world, this.body);
        this.destroyed = true;
    }

    update() {
        // this ship has been destroyed
        if (this.health <= 0) {
            this.shipDestroy();
            return; // ignore everything else
        }

        this.regenBullets();


        // prioritize moving onto the screen
        if (this.isOutsideScreen()) {
            this.updateTowardPos(windowWidth / 2, windowHeight / 2);
        }
        // the ship currently doesn't have a target
        else if (this.target == null) {
            var enemies = shipHandler.getEnemies(this.team);
            this.target = enemies[int(random(enemies.length))];
            this.updateTowardPos(windowWidth / 2, windowHeight / 2);
        }
        else if (this.target.isOutsideScreen()) // the current target is outside the screen, so pick a different one
        {
            var enemies = shipHandler.getEnemies(this.team);
            this.target = enemies[int(random(enemies.length))];
            this.updateTowardPos(windowWidth / 2, windowHeight / 2);
        }
        else { // the ship has a target
            this.updateTowardPos(this.target.getPos().x, this.target.getPos().y);

            // check if we can shoot at the target
            var targetAngle = Matter.Vector.angle(this.body.position, this.target.getPos());
            targetAngle += 2 * PI;
            targetAngle %= 2 * PI;
            Matter.Body.setAngle(this.body, (this.body.angle + 2 * PI) % (2 * PI));
            var resultAngle = this.body.angle - targetAngle;
            if (resultAngle > -0.5 && resultAngle < 0.5) {
                this.shoot();
            }
        }
    }

    getPos() {
        return this.body.position;
    }

    isOutsideScreen() {
        if (this.destroyed) return true;
        var pos = this.body.position;
        if (pos.x >= 0 && pos.x <= width) {
            if (pos.y >= 0 && pos.y <= height) {
                return false;
            }
        }
        return true;
    }

    updateTowardPos(posX, posY) {
        var targetPos = {
            x: posX,
            y: posY
        };
        var targetAngle = Matter.Vector.angle(this.body.position, targetPos);
        targetAngle += PI * 2;
        targetAngle %= PI * 2;
        Matter.Body.setAngle(this.body, (this.body.angle + 2 * PI) % (2 * PI));

        // don't do anything with angular velocity
        Matter.Body.setAngularVelocity(0);
        // rotate toward the target position

        Matter.Body.setAngle(this.body, this.body.angle + ((targetAngle - this.body.angle) / (1 / this.angleAccel)))
        /*
            Matter.Body.setAngle(this.body, this.body.angle % 2*PI);
            if(this.body.angle < 0) Matter.Body.setAngle(this.body, this.body.angle + 2*PI);
            targetAngle %= 2*PI;
            if(targetAngle < 0) targetAngle += 2*PI;
            var changeInAngle = (targetAngle - this.body.angle);
            if(changeInAngle > PI) changeInAngle -= 2*PI;
            if(changeInAngle > .01) changeInAngle = .01;
            if(changeInAngle < -.01) changeInAngle = -.01;
            Matter.Body.setAngle(this.body, this.body.angle + changeInAngle);
        */
        // apply the movement force based on this angle
        Matter.Body.applyForce(this.body, this.body.position, {
            x: cos(this.body.angle) * this.accel,
            y: sin(this.body.angle) * this.accel
        });

        // limit the velocity
        var velocity = this.body.velocity;
        if (velocity.x < -5) {
            Matter.Body.setVelocity(this.body, {
                x: -5,
                y: this.body.velocity.y
            });
        }
        if (velocity.x > 5) {
            Matter.Body.setVelocity(this.body, {
                x: 5,
                y: this.body.velocity.y
            });
        }
        if (velocity.y < -5) {
            Matter.Body.setVelocity(this.body, {
                x: this.body.velocity.x,
                y: -5
            });
        }
        if (velocity.y > 5) {
            Matter.Body.setVelocity(this.body, {
                x: this.body.velocity.x,
                y: 5
            });
        }
    }

    damageShip(damage) {
        this.health -= damage;
    }
}
