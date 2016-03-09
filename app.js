// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    
    this.xRange = [-150, 707];
    this.possibleY = [60, 140, 220, 300];
    this.speedRange = [100, 800];
    this.sprite = 'images/enemy-bug.png';
    this.reset();

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    var maxPos = this.xRange[1];
    this.x += this.speed * dt;

    if (this.x > maxPos) {
        this.reset();
    }
};

// reset for enemy
Enemy.prototype.reset = function() {
    var startPos = this.xRange[0];

    this.x = startPos;
    this.y = this.getRandomY();
    this.speed = this.getRandomSpeed();
};
// random enemy's row position
Enemy.prototype.getRandomY = function() {
    return this.possibleY[Math.floor(Math.random() * this.possibleY.length)];
};
// random enemy's speed between min and max
Enemy.prototype.getRandomSpeed = function() {
    var minSpeed = this.speedRange[0],
        maxSpeed = this.speedRange[1];

    return Math.floor(Math.random() * (maxSpeed - minSpeed)) + minSpeed;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


var gems_icon = ['images/Gem Blue.png',
        'images/Gem Green.png',
        'images/Gem Orange.png']; //possible gems style
var Gems = function(x,y) {
    this.possibleX = [101, 202, 303, 404, 505, 606];
    this.possibleY = [60, 140, 220, 300];
    this.reset();
};


// reset for gem
Gems.prototype.reset = function() {
    

    this.x = this.getRandomX();
    this.y = this.getRandomY();
    this.sprite = gems_icon[Math.floor(Math.random() * gems_icon.length)];
    
};

Gems.prototype.getRandomX = function() {
    return this.possibleX[Math.floor(Math.random() * this.possibleX.length)];
};

Gems.prototype.getRandomY = function() {
    return this.possibleY[Math.floor(Math.random() * this.possibleY.length)];
};
Gems.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
//heart class
var Heart = function(x,y) {
    this.possibleX = [101, 202, 303, 404, 505, 606];
    this.possibleY = [60, 140, 220, 300];
    this.sprite = 'images/Heart.png';
    this.reset();
};


// reset for enemy
Heart.prototype.reset = function() {
    this.x = this.getRandomX();
    this.y = this.getRandomY();
};

Heart.prototype.getRandomX = function() {
    return this.possibleX[Math.floor(Math.random() * this.possibleX.length)];
};

Heart.prototype.getRandomY = function() {
    return this.possibleY[Math.floor(Math.random() * this.possibleY.length)];
};
Heart.prototype.render = function() {
    if (life == 1) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};

var player_icon = ['images/char-boy.png',
        'images/char-cat-girl.png',
        'images/char-horn-girl.png',
        'images/char-pink-girl.png',
        'images/char-princess-girl.png']; //variety of player_icons
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.xRange = [-2, 606]; //possible X coordinate
    this.yRange = [-20, 460]; // possible Y coordinate
    
    this.reset(); //reset to default pos
};

Player.prototype.update = function() {
    this.checkCollisions();
    this.pickGems();
    this.pickHeart();
};
//check for collisions function
Player.prototype.checkCollisions = function() {
    if (this.y == -20) {
        // player on water, reset
        this.reset();
        success_count++;
        
        
    } else if (this.y >= 60 && this.y <= 380) {
        var self = this;
        // when player is on the stones check for collision with each bug
        allEnemies.forEach(function(enemy) {
            // if the bug on the same row
            if (enemy.y == self.y) {
                // if the bug collide with player
                if (enemy.x >= player.x - 60 && enemy.x <= player.x + 60) {
                    self.reset();
                    collision_count++;
                    life--;
                    
                }
            }
        });
    }
};
Player.prototype.pickGems = function() {//pick Gems
    if (this.x == gem.x && this.y == gem.y) {
        
        gem.reset();
        gems_count++;
        
    } 
};
Player.prototype.pickHeart = function() { //pickHearts-lives
    if (this.x == heart.x && this.y == heart.y) {
        
        heart.reset();
        life++;
        
    } 
};


Player.prototype.reset = function() {
    //initial player position X and Y
    this.x = 303; //center of the field
    this.y = 380;
    this.sprite = player_icon[Math.floor(Math.random() * player_icon.length)]; // Randomly selected player icon
    
};


//move the player on the board by input from keyboard
Player.prototype.handleInput = function(key) {
    if (key === 'left') {
        this.x -= (this.x - 101 < this.xRange[0]) ? 0 : 101;
    } else if (key === 'right') {
        this.x += (this.x + 101 > this.xRange[1]) ? 0 : 101;
    } else if (key === 'up') {
        this.y -= (this.y - 80 < this.yRange[0]) ? 0 : 80;
    } else if (key === 'down') {
        this.y += (this.y + 80 > this.yRange[1]) ? 0 : 80;
    }
};
// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Now instantiate your objects.

var enemy1 = new Enemy();
var enemy2 = new Enemy();
var enemy3 = new Enemy();
var enemy4 = new Enemy();
var enemy5 = new Enemy();
// Place all enemy objects in an array called allEnemies
var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5];
// Place the player object in a variable called player
var player = new Player();

var gem = new Gems();
var heart = new Heart();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//counters for collisions and successes, lifes and collectables
var success_count = 0;
var collision_count = 0;
var gems_count = 0;
var life = 5;

 









