// Enemies our player must avoid
var score = 0;

function updateScore() {
    score += 5;
    console.log(score);
}

var charSprites = [
    "images/char-boy.png", 
    "images/char-cat-girl.png", 
    "images/char-horn-girl.png", 
    "images/char-pink-girl.png"
];

var Enemy = function () {
    this.x = -101;
    this.y = (83 - 35);
    this.speed = 0;
    
    this.setEnemySpawn();

    this.width = 90;
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
    if(player.isAlive) {
        this.x += this.speed * dt;
    }
    if (this.x > 505) {
        this.setEnemySpawn();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var player = function () {
    this.isAlive = true;
    this.x = 0 + (101 * 2);
    this.y = 380;
    this.width = 80;
    this.left = this.x + 10;
    this.right = this.x + 10 + this.width;
    this.num = Math.round((Math.random() * 100) % charSprites.length);
    if (this.num > 3) {
        this.num = 3;
    } else if(this.num < 0) {
        this.num = 0;
    }
    this.sprite = charSprites[this.num];
}
player.prototype.update = function (dt) {
    //console.log(this.left, this.right)
    if (this.y == -35) {
        this.resetPlayer();
        updateScore();
    }
};

player.prototype.resetPlayer = function() {
    this.y = 380;
    this.x = 202;
    this.num = Math.round((Math.random() * 100)) % charSprites.length;
    console.log(this.num);
    this.sprite = charSprites[this.num];
};

player.prototype.Death = function() {
    if(this.isAlive){
        score = (score - 2) < 0 ? 0 : score - 2;
    }
    charSprites.pop();
    if(charSprites.length !== 0) {
        this.resetPlayer();
    } else {
        showModal();
        this.isAlive = false;
    }
}

player.prototype.render = function () {
    if(this.isAlive) {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    ctx.font = "30px Arial";
    ctx.fillText("score: " + score, 202, 40);

};

player.prototype.handleInput = function (keyCode) {
    if(this.isAlive) {
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

$('.reset').click(function() {
    $('.modal').dialog("close");
})


function showModal() {

    $('#score').text(score);

    $('.modal').dialog({
        modal: true,
        maxWidth: 500,
        maxHeight: 500,
        close: function() {
            charSprites = [
                "images/char-boy.png", 
                "images/char-cat-girl.png", 
                "images/char-horn-girl.png", 
                "images/char-pink-girl.png"
            ];
            score = 0;
            allEnemies.forEach(Enemy => {
                Enemy.setEnemySpawn();
            });
            player.resetPlayer();
            player.isAlive = true;
        }
    });
}