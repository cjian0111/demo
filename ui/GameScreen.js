/*
    GAME SCREEN
    For this demo we create a SpriteSheetAnimation object and
    five buttons to illustrate the animation controls: Play,
    Stop, 24fps, 48fps, and goto First Frame.
 */
GameScreen = function(width,height)
{
    //Constructor
    GameScreen.superclass.constructor.apply(this,arguments);

    //Create a top-level variable for our SpriteSheetAnimation object
    this.spriteSheetAnim;
    this.butterflyAnim;
    this.backgroundAnim;
    this.start;
    this.turning = "";
    this.forward = false;
    this.score = 0;
    this.displayscore;
    this.collide = false;
    this.dx = 3;
    this.dy = 3;
	

    //Just some display text
    this.addChild(new TGE.Text().setup({
        x:320,
        y:100,
        text:"Butterfly Hunt",
        font:"60px Pristina",
        color:"#00ff00"
    })); 

      

    //*********************************************************
    //******     SET UP SPRITESHEET ANIMATION OBJECT     ******
    //*********************************************************
    /*
        This is where we set up our sprite sheet animation object
        with initial properties and position it on the screen.
    */


	this.backgroundColor = "rgb(200,100,200)";
	
	this.start = new TGE.Button().setup({
			textColor: "#ff00ff",
       		text: "Start Game",
			font:"38px Pristina",
        	x:this.percentageOfWidth(0.5),
        	y:350,
			width: 180,
			height: 90,
			pressFunction:this.startgame.bind(this),
	});

	
	this.backgroundAnim = new TGE.SpriteSheetAnimation().setup({
        image:"backgroundImg",
        columns:4,
        rows:4,
        totalFrames:16,
        fps:0.3,
        x: 320,
        y: 400,
		width: 680,
		height: 880,
    	});
	
        
    this.spriteSheetAnim = new TGE.SpriteSheetAnimation().setup({
        image:"spriteSheetImg",
        columns:4,
        rows:5,
        totalFrames:19,
        fps:24,
        x: 320,
        y: 240,
    });


    this.butterflyAnim = new TGE.SpriteSheetAnimation().setup({
        image:"butterflySprite",
        columns:13,
        rows:7,
        totalFrames:87,
        fps:40,
        x: 100,
        y: 100,
    });
	
	
	this.addChild(this.start);


    //Start the SpriteSheetAnimation Object playing
    this.backgroundAnim.play();	
    this.spriteSheetAnim.play();
    this.butterflyAnim.play();
	
    
}

GameScreen.prototype =
{
  
    //Play Animation, executes when the Play button is pressed
    playAnim: function(){
        this.spriteSheetAnim.play();
        this.spriteSheetAnim.x += 100;
    },

    //Stop Animation, executes when the Stop button is pressed
    stopAnim: function(){
        this.spriteSheetAnim.stop();
    },

    //24 and 48 FPS, set the playback speed of the object when the button is pressed
    set24FPS: function(){
        this.spriteSheetAnim.fps = 24;
    },
    set48FPS: function(){
        this.spriteSheetAnim.fps = 48;
    },
   
    gotoFirstFrame: function(){
        this.spriteSheetAnim.gotoAndStop(1);
    },


    startgame: function(){

		this.displayscore = new TGE.Text().setup({
        	x:200,
        	y:100,
		text:"Score: 0",
        	font:"32px sans-serif",
        	color:"#000"
		});

		this.addChild(this.backgroundAnim);
		this.addChild(this.butterflyAnim);
		this.addChild(this.displayscore);
		this.addChild(this.spriteSheetAnim); 
		//this.addChild(this.spriteSheetAnim);
		this.spriteSheetAnim.addEventListener("keydown",this.SetStatusOfSpider.bind(this));
    	this.spriteSheetAnim.addEventListener("keyup",this.ResetStatusOfSpider.bind(this));
    	this.spriteSheetAnim.addEventListener("update",this.UpdateSpider.bind(this));
    	this.butterflyAnim.addEventListener("update",this.Movebutterfly.bind(this));
		this.spriteSheetAnim.addEventListener("update",this.Collision.bind(this));
		this.removeChild(this.start);
		
    },

	SetStatusOfSpider:function(event){
		
		var spider = event.currentTarget;
		if(event.keyCode == 37)
			this.turning = "left";
		if(event.keyCode == 39)
			this.turning = "right";
		if(event.keyCode == 38)
			this.forward = true;
	},

	ResetStatusOfSpider:function(event){
		if(event.keyCode == 37 || event.keyCode == 39){
			this.turning = "";
		}
		if(event.keyCode == 38)
			this.forward = false;
	},

	UpdateSpider:function(event){
	
		var spider = event.currentTarget;
		if(this.turning == "left")
			spider.rotation -= 4;
		if(this.turning == "right")
			spider.rotation += 4;
		if(this.forward){
			var distance = 4;
			var theta = (spider.rotation - 90) * Math.PI / 180;
			spider.x += distance * Math.cos(theta);
			spider.y += distance * Math.sin(theta);
		}
		if(this.turning != "" || this.forward)
			spider.play();
		else
			spider.stop();
	
	},

	Movebutterfly:function(event){

		var butterfly = event.currentTarget;
		
		if(butterfly.x <= 0 || butterfly.x >= 620)
			this.dx *= -1;
		if(butterfly.y <= 0 || butterfly.y >= 832)
			this.dy *= -1;
			
		butterfly.x += this.dx;
		butterfly.y += this.dy;
		

	},
	
	
	
	Collision:function(event){

		
		
		collide = (this.spriteSheetAnim.x<=(this.butterflyAnim.x+40) && this.spriteSheetAnim.x>=(this.butterflyAnim.x-40)) && (this.spriteSheetAnim.y<=(this.butterflyAnim.y+40) && this.spriteSheetAnim.y>=(this.butterflyAnim.y-40));

        	if(collide == true)
			{ 
				collide = false;
			
				this.score += 1;
				this.displayscore.text = "Score: " + this.score;
	
				this.butterflyAnim.x = parseInt(Math.random() * 640);
				this.butterflyAnim.y = parseInt(Math.random() * 832);
		
			} 
		
        }, 
	
		
}
extend(GameScreen,TGE.Window);