//this game will have only 1 state
var game = new Phaser.Game(360, 640, Phaser.AUTO);

var GameState = {
    //load the game assets before the game starts
    preload: function() {
    // loading the sprites
    this.load.image('oil','assets/images/oil.png');
    this.load.image('coin','assets/images/coin.png');
    this.load.image('player','assets/images/car.png');
    this.load.image('button','assets/images/button-demo.png');
    this.load.image('road','assets/images/road.png');
      
    },
    //executed after everything is loaded
    create: function() {

        //sestting all screens mode
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

        game.stage.backgroundColor = '#943021';
        this.isMoving = false;
        
        //adding the road
        this.roadBG = this.game.add.tileSprite(0,0,360,640,'road');

        //Obsicales group
        var obsticaleData =[
            {key:'oil',text:'Oil'},
            {key:'tyre',text:'Tyre'}
        ];

        //Wins Broups
        var winData = [
            {key:'fuel', text:'Fuel'},
            {key:'coin',text:'Coin'}
        ]

        this.positions = [100,260];
        this.startPos = 0;
        this.position = 0;
        this.timer = 200;

        
        // this.obsicalesGroup = this.game.add.group();
        // this.winsGroup = this.game.add.group();

        this.player = this.game.add.image(this.positions[this.startPos],100,'player');
        this.player.anchor.setTo(0.5);
        this.player.scale.setTo(2);
        // this.movePlayer = this.game.add.tween(this.player);

        //setting the button and functionally 
        this.btn = this.game.add.image(0,this.game.world.height - 200,'button');
        this.btn.costumParams = {position:this.startPos};
        this.btn.inputEnabled = true;
        this.btn.input.pixelPerfect = true;
        this.btn.events.onInputDown.add(this.switchPos,this);
    },
    //this is executed multiple times per second
    update: function() {
        this.roadBG.tilePosition.y +=1; 
        //cerating a new oil enemy

        // console.log(this.newOil);
      
        if(this.game.time.now>this.timer){
            this.createOil();
        }

        this.newOil.position.y+=1;

            


    },

    switchPos: function(sprite,event){
        // console.log(this.isMoving);
        if(this.isMoving){
            return false;
        }
        this.isMoving = true;
        var playerMove = game.add.tween(this.player);
        if(this.position==0){
            this.position = 1;
            playerMove.to({x:this.positions[1]},500);
            playerMove.start();
        }else{
            playerMove.to({x:this.positions[0]},500);
            playerMove.start();
            this.position = 0;
        }
        playerMove.onComplete.add(function(){
            this.isMoving = false;
        },this);
        
    },

    createOil : function(){
        this.newOil = this.game.add.image(this.positions[0],10,'oil');
        this.oilMove = game.add.tween(this.newOil);
        // console.log(this.newOil);
        
        this.timer=this.game.time.now+2000;
    }
    
  
  };
  
  //initiate the Phaser framework
  
  game.state.add('GameState', GameState);
  game.state.start('GameState');