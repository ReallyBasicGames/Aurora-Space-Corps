class FactoryShip extends Ship {
    constructor(x, y, team, image) {
        super(x, y, team, image);
        this.health = 1000; // how much health this has. Standard bullets deal 1 damage
        this.accel = 0.0001; // how fast this objcet accelerates
        this.angleAccel = 0.001; // how fast this object accelerates rotationally
        this.w = 96;
        this.h = 80;
        this.maxVelocity = 1;

        this.shotCooldown = 100;
        this.maxBullets = 6;
        // make sure this ship can't shoot
        this.regenBulletTime = Number.MAX_SAFE_INTEGER;

        this.power = 0;
        this.maxPower = 10000;
        this.powerRegen = 25; // how much power is restored per tick
        this.spendDelay = 500;
        this.lastSpent = 0;

        // small, medium, large, boss
        this.pricesShips = [5000, 10000, 25000, 100000];
        // damage boost, health boost, power boost
        this.pricesUpgrades = [5000, 5000, 10000];
        /*
        damage boost- increases the damage of all ships by 1
        health boost - multiplies the health of all ships by 1.1
        power boost - increases max power by 10000, doubles power regen
        */

        this.isPlayerControlled = false;

        this.shipsBuilt = [0, 0, 0, 0];
        this.upgradesGotten = [0, 0, 0];

        this.extraDamage = 0; // additive
        this.extraHealth = 1; // multiplative

        this.priceMulti = 2.5;

        currentFactories++;
    }

    getPricesShips() {
        return this.pricesShips;
    }

    setPlayerControlled(bool) {
        this.isPlayerControlled = bool;
    }

    getPlayerControlled() {
        return this.isPlayerControlled;
    }

    shipDestroy() {
        super.shipDestroy();
        currentFactories--;
    }

    update() {
        // this ship has been destroyed
        if (this.health <= 0) {
            this.shipDestroy();
            return; // ignore everything else
        }
        // prioritize moving onto the screen
        if (this.isOutsideScreen()) {
            this.updateTowardPos(windowWidth / 2, windowHeight / 2);
        }


        // power

        if (millis() - this.lastSpent > this.spendDelay) {
            this.power += this.powerRegen;
        }
        if (this.power >= this.maxPower) {
            this.power = this.maxPower;
        }

        // AI
        if (!this.isPlayerControlled) {
            super.update();
            if (this.shipsBuilt[0] / 2 <= this.shipsBuilt[1]) {
                if(!aiCanUseSmall) this.shipsBuilt[0] ++;
                else this.buy("small");
                //if(!this.isPlayerControlled) console.log("buying small");
            }
            else if (this.shipsBuilt[1] / 4 <= this.shipsBuilt[2]) {
                if (this.upgradesGotten[0] * 6 < this.shipsBuilt[1]) {
                    this.upgrade("damage");
                    //if(!this.isPlayerControlled) console.log("upgrade damage");
                }
                else {

                    if(!aiCanUseMedium) this.shipsBuilt[1] ++;
                    else this.buy("medium");
                    //if(!this.isPlayerControlled) console.log("buying medium");
                }
            }
            else if (this.shipsBuilt[2] <= this.shipsBuilt[3] * 4) {
                if (this.upgradesGotten[2] < 1) {
                    this.upgrade("power");
                    //if(!this.isPlayerControlled) console.log("upgrading power");
                }
                else if (this.shipsBuilt[2] > this.upgradesGotten[1]) {
                    this.upgrade("health");
                    //if(!this.isPlayerControlled) console.log("upgrading health");
                }
                else {
                    if(!aiCanUseLarge) this.shipsBuilt[2] ++;
                    else this.buy("large");
                    //if(!this.isPlayerControlled) console.log("buying large");
                }
            }
            else {
                if (this.upgradesGotten[2] < 3 || this.upgradesGotten < this.shipsBuilt[3] * 2) {
                    this.upgrade("power");
                    //if(!this.isPlayerControlled) console.log("upgrading power");
                }
                else {
                    if(!aiCanUseBoss) this.shipsBuilt[3] ++;
                    else this.buy("boss");
                    //if(!this.isPlayerControlled) console.log("buying boss");
                }
            }

            return;
        }

        // ----   all player controls   ----
        // moving
        var tempSpeed = 0;
        var angularSpeed = 0;
        if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) angularSpeed = -this.angleAccel;
        if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) angularSpeed = this.angleAccel;
        if (keyIsDown(UP_ARROW) || keyIsDown(87)) tempSpeed = this.accel;
        if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) tempSpeed = -this.accel;
        if (tempSpeed != 0) this.move(tempSpeed, angularSpeed);
    }

    move(vect, ang) {
        Matter.Body.setAngle(this.body, this.body.angle + ang);
        // apply the movement force based on this angle
        Matter.Body.applyForce(this.body, this.body.position, {
            x: cos(this.body.angle) * this.accel,
            y: sin(this.body.angle) * this.accel
        });

        // limit the velocity
        var velocity = this.body.velocity;
        if (velocity.x < -this.maxVelocity) {
            Matter.Body.setVelocity(this.body, {
                x: -this.maxVelocity,
                y: this.body.velocity.y
            });
        }
        if (velocity.x > this.maxVelocity) {
            Matter.Body.setVelocity(this.body, {
                x: this.maxVelocity,
                y: this.body.velocity.y
            });
        }
        if (velocity.y < -this.maxVelocity) {
            Matter.Body.setVelocity(this.body, {
                x: this.body.velocity.x,
                y: -this.maxVelocity
            });
        }
        if (velocity.y > this.maxVelocity) {
            Matter.Body.setVelocity(this.body, {
                x: this.body.velocity.x,
                y: this.maxVelocity
            });
        }
    }

    upgrade(u) {
        switch (u) {
            case "damage":
                if (this.power >= this.pricesUpgrades[0]) {
                    this.extraDamage++;
                    this.power -= this.pricesUpgrades[0];
                    this.upgradesGotten[0]++;
                    this.pricesUpgrades[0] *= this.priceMulti;
                    //if(!this.isPlayerControlled) console.log("upgrade damage");
                }
                break;
            case "health":
                if (this.power >= this.pricesUpgrades[1]) {
                    this.extraHealth *= 1.2;
                    this.power -= this.pricesUpgrades[1];
                    this.upgradesGotten[1]++;
                    this.pricesUpgrades[1] *= this.priceMulti;
                    //if(!this.isPlayerControlled) console.log("upgrade health");
                }
                break;
            case "power":
                if (this.power >= this.pricesUpgrades[2]) {
                    this.powerRegen *= 2;
                    this.maxPower *= this.priceMulti;
                    this.power -= this.pricesUpgrades[2];
                    this.upgradesGotten[2]++;
                    this.pricesUpgrades[2] *= this.priceMulti;
                    //if(!this.isPlayerControlled) console.log("upgrade power");

                }
                break;
        }
    }

    getPower() {
        return this.power;
    }

    getMaxPower() {
        return this.maxPower;
    }

    getPowerRegen() {
        return this.powerRegen;
    }

    buy(s) {
        //shipHandler.makeShip("fighter", color, mouseX, mouseY);
        //this.makeShip = function(shipType, team, x, y, isPlayer, damageBonus, healthBonus, image)
        var teamNum = 0;

        if (this.team == "red") teamNum = 0;
        else if (this.team == "green") teamNum = 1;
        else if (this.team == "yellow") teamNum = 2;
        else teamNum = 3;

        switch (s) {
            case "small":
                if (this.power >= this.pricesShips[0]) {
                    this.power -= this.pricesShips[0];
                    shipHandler.makeShip("small", this.team, this.body.position.x, this.body.position.y, false, this.extraDamage, this.extraHealth, smallFighterImg[teamNum]);
                    this.lastSpent = millis();
                    this.shipsBuilt[0]++;
                    if (this.isPlayerControlled) shipsBuilt++;
                }
                break;
            case "medium":
                if (this.power >= this.pricesShips[1]) {
                    this.power -= this.pricesShips[1];
                    shipHandler.makeShip("medium", this.team, this.body.position.x, this.body.position.y, false, this.extraDamage, this.extraHealth, medFighterImg[teamNum]);
                    this.lastSpent = millis();
                    this.shipsBuilt[1]++;
                    if (this.isPlayerControlled) shipsBuilt++;
                }
                break;
            case "large":
                if (this.power >= this.pricesShips[2]) {
                    this.power -= this.pricesShips[2];
                    shipHandler.makeShip("large", this.team, this.body.position.x, this.body.position.y, false, this.extraDamage, this.extraHealth, largeFighterImg[teamNum]);
                    this.lastSpent = millis();
                    this.shipsBuilt[2]++;
                    if (this.isPlayerControlled) shipsBuilt++;
                }
                break;
            case "boss":
                if (this.power >= this.pricesShips[3]) {
                    this.power -= this.pricesShips[3];
                    shipHandler.makeShip("boss", this.team, this.body.position.x, this.body.position.y, false, this.extraDamage, this.extraHealth, bossFighterImg[teamNum]);
                    this.lastSpent = millis();
                    this.shipsBuilt[3]++;
                    if (this.isPlayerControlled) shipsBuilt++;
                }
                break;

        }
    }
    draw() {
        switch (this.team) {
            case "red":
                fill(255, 105, 97);
                stroke(255, 105, 97);
                break;
            case "green":
                fill(119, 221, 119);
                stroke(119, 221, 119);
                break;
            case "yellow":
                fill(253, 253, 150);
                stroke(253, 253, 150);
                break;
            case "blue":
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
        if (graphicsLevel == 1) image(this.image, -this.w / 2, -this.h / 2, this.w, this.h);
        else {
            rectMode(CENTER);
            rect(0, 0, this.w, this.h);
        }
        pop();
    }
}

function keyPressed() {
    // buy ships
    if (keyIsDown(49) && playerCanUseSmall) player.buy("small");
    if (keyIsDown(50) && playerCanUseMedium) player.buy("medium");
    if (keyIsDown(51) && playerCanUseLarge) player.buy("large");
    if (keyIsDown(52) && playerCanUseBoss) player.buy("boss");
    // buy upgrades, see constructor for what each do
    if (keyIsDown(56)) player.upgrade("damage");
    if (keyIsDown(57)) player.upgrade("health");
    if (keyIsDown(48)) player.upgrade("power");
}


