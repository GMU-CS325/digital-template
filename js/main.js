window.onload = function() {
"use strict";
 var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'Souls', { preload: preload, create: create, update: update } )
function preload() {
    game.load.image('seireitei', 'assets/seireitei.jpg');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('star', 'assets/soul.png');
    game.load.spritesheet('Ichigo', 'assets/Ichigo.png',45,56);
    game.load.image('skull',"assets/skull.png");
    game.load.audio('terminated',"assets/terminated.wav");
    game.load.audio('collected',"assets/collected.mp3");
    game.load.audio('facts',"assets/facts.mp3");
}
var player;
var platforms;
var cursors;
var background;
var gameover;
var win;
var stars;
var score = 0;
var scoreText;
var timer;
var currentTime;
var timerEvent;
var Event;
var skulls;
    
function create() {
    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);
    var facts =game.add.audio('facts');
        facts.play();
    //  A simple background for our game
    background=game.add.sprite(0, 0, 'seireitei');
    background.height=game.height;
    background.width=game.width;
    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();
    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;
    // Here we create the ground.
    var ground = platforms.create(0, game.world.height - 64, 'ground');
    //var ceiling = platforms.create(0,-50,'ground');
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    ground.scale.setTo(2, 2);
   //ceiling.scale.setTo(2,2);
    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;
   // ceiling.body.immovable =true;
    //  Now let's create two ledges
    var ledge = platforms.create(400, 400, 'ground');
    ledge.body.immovable = true;
    ledge = platforms.create(-150, 250, 'ground');
    ledge.body.immovable = true;
    // The player and its settings
    player = game.add.sprite(0, game.world.height - 150, 'Ichigo');
    //  We need to enable physics on the player
    game.physics.arcade.enable(player);
    //  Player physics properties. Give the little guy a slight bounce.
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;
    //  Our two animations, walking left and right.
    player.animations.add('idle', [0,1,2,3],10,true);
  
    player.animations.add('left', [13, 12], 10, false);
    player.animations.add('right', [12, 13], 10, true);
    //  Finally some stars to collect
    stars = game.add.group();
    //  We will enable physics for any star that is created in this group
    stars.enableBody = true;
    //  Here we'll create 20 of them evenly spaced apart
    for (i = 0; i < 20; i++)
    {
        //  Create a star inside of the 'stars' group
        var star = stars.create(i * 70, 1, 'star');
        star.body.velocity.setTo(200,200);
        star.body.collideWorldBounds=true;
        star.body.bounce.y = 0.7 + Math.random() * 0.2;
        star.body.bounce.x=  0.7 + Math.random() * 0.2;
    }
    skulls=game.add.group();
    skulls.enableBody=true;
    var i;
    for (i = 0; i < 2; i++)
    {
        //  Create a star inside of the 'stars' group
        var skull = skulls.create(i * 150, 1, 'skull');
        skull.body.velocity.setTo(200,200);
        skull.body.collideWorldBounds=true;
        skull.body.bounce.y = 0.7 + Math.random() * 0.2;
        skull.body.bounce.x=  0.7 + Math.random() * 0.2;
    }
    //  The score
    scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    timer= game.time.create();
    timerEvent= timer.add(Phaser.Timer.MINUTE*1+ Phaser.Timer.SECOND *30, this.endTimer,this);
    timer.start();
   // timer = game.add.text(game.world.centerX+250, 16, '00:00:00', { fontSize: '32px', fill: '#000' });
     // Our controls.
    cursors = game.input.keyboard.createCursorKeys();
    
}
function update() { 
    //  Collide the player and the stars with the platforms
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(stars, platforms);
    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    game.physics.arcade.overlap(player, stars, collectStar, null, this);
    game.physics.arcade.overlap(player,skulls,explode,null,this);
    //  Reset the players velocity (movement)
    player.body.velocity.x = 0;
    if (cursors.left.isDown)
    {
        //  Move to the left
        player.body.velocity.x = -150;
        player.scale.x=-1;
        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        player.body.velocity.x = 150;
        player.scale.x=1;
        player.animations.play('right');
    }
    else 
    {
        //  Stand still
        player.animations.play('idle');
        //player.frame =4;
    }
    
    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.touching.down)
    {
        player.body.velocity.y = -350;
    }
     if(stars.countLiving()==0 || timer.running()==false)
        {
            timer.stop();
      goText = this.game.add.text(game.world.centerX-100,game.world.centerY,' ', { font: '40px Arial', fill: '#D80000', align: 'center' });
            goText.text="You Win!!";
       goText.visible=true;
        player.kill();
            timer.stop();
        }
render();
}
    function render()
    {
        if (timer.running) {
         currentTime=game.debug.text(this.formatTime(Math.round((timerEvent.delay - timer.ms) / 1000)), game.world.centerX+300, 32,'#000');
        }
    }
  function formatTime (s) {
        // Convert seconds (s) to a nicely formatted and padded time string
        var minutes = "0" + Math.floor(s / 60);
        var seconds = "0" + (s - minutes * 60);
        return minutes.substr(-2) + ":" + seconds.substr(-2);   
    }
function explode(player,skull)
    {
        player.kill();
        var terminated =game.add.audio('terminated');
        terminated.play();
          goText = this.game.add.text(game.world.centerX-100,game.world.centerY,' ', { font: '40px Arial', fill: '#D80000', align: 'center' });
            goText.text="Game Over\n You Died!!";
       goText.visible=true;
        timer.stop();
       // game.input.onTap.addOnce(restart,this);
    }
function collectStar (player, star) {
    
    // Removes the star from the screen
    star.kill();
    var collected =game.add.audio('collected');
        collected.play();
    //  Add and update the score
    score += 10;
    scoreText.text = 'Score: ' + score;
   
  
}
};
