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
    
    "use strict";
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    var timer;
    var total = 0;

    
    function preload() {
        // Load an image and call it 'logo'.
        game.load.image( 'logo', 'assets/ed2.png' );
        game.load.image('floor', 'assets/wood.png');
        game.load.image('floor', 'assets/dodgeball.png');
    }
    
    var bouncy;
    
    function create() {
        
        flooring = game.add.tileSprite(0, 0, 800, 600, 'wood');
        flooring.fixedToCamera = true;
        
        // Create a sprite at the center of the screen using the 'logo' image.
        bouncy = game.add.sprite( game.world.centerX, game.world.centerY, 'Ed', 'assets/ed2.png' );
        // Anchor the sprite at its center, as opposed to its top-left corner.
        // so it will be truly centered.
        bouncy.anchor.setTo( 0.5, 0.5 );
        
        // Turn on the arcade physics engine for this sprite.
        game.physics.enable( bouncy, Phaser.Physics.ARCADE );
        // Make it bounce off of the world bounds.
        bouncy.body.collideWorldBounds = true;
        
        // Add some text using a CSS style.
        // Center it in X, and position its top 15 pixels from the top of the world.
        var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
        var text = game.add.text( game.world.centerX, 15, "Everything.", style );
        text.anchor.setTo( 0.5, 0.0 );
        
            game.stage.backgroundColor = '#000';

            //  Create our Timer
            timer = game.time.create(false);
        
            //  Set a TimerEvent to occur after 2 seconds
            timer.loop(2000, updateCounter, this);
        
            //  Start the timer running - this is important!
            //  It won't start automatically, allowing you to hook it to button events and the like.
            timer.start();
        
    ball = game.add.sprite(game.world.centerX, game.world.centerY, 'dodgeball', 'assets/dodgeball.png');
    ball.anchor.set(0.5);
    ball.checkWorldBounds = true;

    game.physics.enable(ball, Phaser.Physics.ARCADE);

    ball.body.collideWorldBounds = true;
    ball.body.bounce.set(1);
    ball.body.velocity.y = -300;
    ball.body.velocity.x = -75;
    }
    
    function update() {
        // Accelerate the 'logo' sprite towards the cursor,
        // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
        // in X or Y.
        // This function returns the rotation angle that makes it visually match its
        // new trajectory.
        bouncy.rotation = game.physics.arcade.accelerateToPointer( bouncy, this.game.input.activePointer, 500, 500, 500 );
        
        total++;
    }
    
    
function ballHitPlayer (_ball, _bouncy) {

    var diff = 0;

    ball.body.velocity.setTo(0, 0);
    
    introText.text = 'Game Over!';
    introText.visible = true;

}

function render() {

    game.debug.text('Time until new ball: ' + timer.duration.toFixed(0), 32, 32);
    game.debug.text('Balls: ' + total, 32, 64);
    ball = game.add.sprite(game.world.centerX, game.world.centerY, 'dodgeball', 'assets/dodgeball.png');
    ball.body.velocity.y = -300;
    ball.body.velocity.x = -75;

}

};
