// Enemies our player must avoid
var Enemy = function () {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = -101;
    this.y = (83 - 35);
    this.speed = 0;
    this.setEnemySpawn();
    this.width = 90;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.setEnemySpawn = function () {
    var rnd = Math.round(Math.random() * 100);
    this.x = -110;
    if (rnd % 3 == 1) {
        this.y = (83 - 35);
        this.speed = 150;
    } else if (rnd % 3 == 2) {
        this.y = (83 - 35) + 83;
        this.speed = 100;
    } else {
        this.y = (83 - 35) + (83 * 2);
        this.speed = 50;
    }
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    e = this;
    this.x += this.speed * dt;
    if (this.x > 505) {
        this.setEnemySpawn();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    /* ctx.beginPath();
    ctx.rect(this.x, this.y + 83, 90, 90);
    ctx.stroke(); */
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var player = function () {
    this.x = 0 + (101 * 2);
    this.y = 380;
    this.width = 80;
    this.left = this.x + 10;
    this.right = this.x + 10 + this.width;
    this.sprite = 'images/char-boy.png';
}
player.prototype.update = function (dt) {
    //console.log(this.left, this.right)
    if (this.y == -35) {
        this.resetPlayer();
    }
};

player.prototype.resetPlayer = function() {
    this.y = 380;
    this.x = 202;
}

player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    /* ctx.beginPath();
    ctx.rect(this.x + 10, this.y + 93, 80, 70);
    ctx.stroke(); */

};

player.prototype.handleInput = function (keyCode) {
    switch (keyCode) {
        case "left":
            this.x = (this.x - 101) >= 0 ? this.x - 101 : this.x - 0;
            break;
        case "right":
            this.x = (this.x +101) < 505 ? this.x + 101 : this.x + 0;
            break;
        case "up":
            this.y -= 83;
            break;
        case "down":
            this.y = this.y + 83 <= 380 ? this.y + 83 : this.y + 0;
            break;
        default:
            break;
    }
    this.left = this.x + 10;
    this.right = this.x + 10 + this.width;
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy()];
var player = new player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});