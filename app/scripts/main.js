/* jshint devel:true */

var SPRITE_SIZE = 32;
var COLUMNS = 21;
var ROWS = 25;
var MAP_OFFSET_BEFORE = 126;
var MAP_OFFEST_AFTER = 130;
var FRAME_RATE_DELAY_MS = 300;

var SYMBOL_ALIEN = 'x';
var SYMBOL_FACTORY_MISSILE = 'M';
var SYMBOL_FACTORY_ALIEN = 'X';
var SYMBOL_MISSILE_ALIEN = '|';
var SYMBOL_MISSILE_OPPONENT = 'i';
var SYMBOL_MISSILE_PLAYER = '!';
var SYMBOL_SHIELD = '-';
var SYMBOL_SHIP_OPPONENT = 'V';
var SYMBOL_SHIP_PLAYER = 'A';
var SYMBOL_WALL = '#';

var iteration = 0;
var timeCheck = 0;


var game = new Phaser.Game(SPRITE_SIZE * COLUMNS, SPRITE_SIZE * ROWS, Phaser.CANVAS, 'phaser', {
    preload: preload,
    update: update
});


function preload() {

    loadMaps('example-replay', 52);
    
    game.load.image('alien', 'images/alien.png');
    game.load.image('factory-missile', 'images/factory-missile.png');
    game.load.image('factory-alien', 'images/factory-alien.png');
    game.load.image('missile-alien', 'images/missile-alien.png');
    game.load.image('missile-opponent', 'images/missile-opponent.png');
    game.load.image('missile-player', 'images/missile-player.png');
    game.load.image('shield', 'images/shield.png');
    game.load.image('ship-opponent', 'images/ship-opponent.png');
    game.load.image('ship-player', 'images/ship-player.png');
    game.load.image('wall', 'images/wall.png');
}


function update() {
    
    if (game.time.now - timeCheck > FRAME_RATE_DELAY_MS) {
        game.world.removeAll();
        var map = game.cache.getText('maptext' + iteration);
        generateMap(map);
        iteration += 1;
        timeCheck = game.time.now;
    }
    
}


function loadMaps(replayPath, iterations) {

    for (var i = 0; i < iterations; i++) {
        game.load.text('maptext' + i, replayPath + '/' + zeroFill(i, 3) + '/map.txt');
    }

}


function zeroFill(number, width) {
    
    width -= number.toString().length;
    if (width > 0) {
        return new Array(width + (/\./.test(number) ? 2 : 1)).join('0') + number;
    }
    return number + "";
}


function generateMap(map) {

    var x = 1;
    var y = 0;
    for (var characterIndex = MAP_OFFSET_BEFORE; characterIndex < map.length - MAP_OFFEST_AFTER; characterIndex++) {
        var token = map[characterIndex];
        if (token === '\n') {
            y++;
            x = 0;
        } else if (token === SYMBOL_ALIEN) {
            game.add.sprite(x * SPRITE_SIZE, y * SPRITE_SIZE, 'alien');
        } else if (token === SYMBOL_FACTORY_MISSILE) {
            game.add.sprite(x * SPRITE_SIZE, y * SPRITE_SIZE, 'factory-missile');
            characterIndex = characterIndex + 2;
            x += 2;
        } else if (token === SYMBOL_FACTORY_ALIEN) {
            game.add.sprite(x * SPRITE_SIZE, y * SPRITE_SIZE, 'factory-alien');
            characterIndex = characterIndex + 2;
            x += 2;
        } else if (token === SYMBOL_MISSILE_ALIEN) {
            game.add.sprite(x * SPRITE_SIZE, y * SPRITE_SIZE, 'missile-alien');
        } else if (token === SYMBOL_MISSILE_OPPONENT) {
            game.add.sprite(x * SPRITE_SIZE, y * SPRITE_SIZE, 'missile-opponent');
        } else if (token === SYMBOL_MISSILE_PLAYER) {
            game.add.sprite(x * SPRITE_SIZE, y * SPRITE_SIZE, 'missile-player');
        } else if (token === SYMBOL_SHIELD) {
            game.add.sprite(x * SPRITE_SIZE, y * SPRITE_SIZE, 'shield');
        } else if (token === SYMBOL_SHIP_OPPONENT) {
            game.add.sprite(x * SPRITE_SIZE, y * SPRITE_SIZE, 'ship-opponent');
            characterIndex = characterIndex + 2;
            x += 2;
        } else if (token === SYMBOL_SHIP_PLAYER) {
            game.add.sprite(x * SPRITE_SIZE, y * SPRITE_SIZE, 'ship-player');
            characterIndex = characterIndex + 2;
            x += 2;
        } else if (token === SYMBOL_WALL) {
            game.add.sprite(x * SPRITE_SIZE, y * SPRITE_SIZE, 'wall');
        }
        x++;
    }

}
