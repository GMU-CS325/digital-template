window.onload = function() {
    // You might want to start with a template that uses GameStates:
    //     https://github.com/photonstorm/phaser/tree/master/resources/Project%20Templates/Basic
    
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".
    
    //Borrowed assets as followed:
    //Grass sprite: Pokemon Gold screenshot
    //Firefighter: http://vincebetteridge.com/firefighter/player.png 40x30
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update} );
    
    function preload() {
        // 
        game.load.image( 'grass', 'assets/grass.png' );
        game.load.spritesheet( 'firefighter', 'assets/firefighter.png', 40, 30);
    }
    
    var background;
    var player;
    
    function create() {
        background = game.add.tileSprite(0, 0, 800, 600, 'grass');       
        
        //attempting to add player sprite
        player = game.add.sprite(game.world.centerX, game.world.centerY, 'firefighter');
        
        player.animations.add('idleRight', [88, 89, 90, 91], 8, true, true);
        player.animations.add('idleLeft', [92, 93, 94, 95], 8, true, true);
        player.animations.add('runRight', [0, 1, 2, 3, 4, 5, 6, 7], 20, true, true);
        player.animations.add('runLeft', [32, 33, 34, 35, 36, 37, 38, 39], 20, true, true);
        
        //starting animation
        player.animations.play('idleRight');
    }
    
    function update() {
        // Accelerate the 'logo' sprite towards the cursor,
        // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
        // in X or Y.
        // This function returns the rotation angle that makes it visually match its
        // new trajectory.
        if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
        {
            player.x -= 4;
            player.animations.play('runLeft');
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
        {
            player.x += 4;
            player.animations.play('runRight');
        }

        else if (game.input.keyboard.isDown(Phaser.Keyboard.UP))
        {
            player.y -= 4;
        }
        
        else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
        {
            player.y += 4;
        }
        
        else if ((player.animations.name = 'runLeft') && (game.input.keyboard.isDown(Phaser.Keyboard.LEFT) == false))
        {
            player.animations.play('idleLeft');        
        }
        
        else if ((player.animations.name = 'runRight') && (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) == false))
        {
            player.animations.play('idleRight');        
        }

    }
    
};
