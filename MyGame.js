/*
    TGE SPRITESHEETANIMATION OBJECTS TUTORIAL
    This file demonstrates how to create, setup and control SpriteSheetAnimation
    objects. In this file we are loading a spritesheet image and using it to
    create a SpriteSheetAnimation object. We will also create some buttons that
    will help illustrate the animation controls.
 */
MyGame = function()
{
    //Main game constructor
    MyGame.superclass.constructor.call(this);

    //Load the spritesheet image we are using for our animated sprite
    var gameAssets = [
        {id:'spriteSheetImg',   url:'images/spider_crawl.png'},
        {id:'butterflySprite',   url:'images/butterfly.png'},
		{id:'backgroundImg',   url:'images/background2.png'},
		{id:'startImg',   url:'images/startscreen.jpg'},
		{id: 'color',   url:'images/lightblue.png'},
    ];
    this.assetManager.assignImageAssetList("required", gameAssets);

    //These are default placeholder values for the buttons that will be using
    TGE.Button.DefaultWidth = 150;
    TGE.Button.DefaultHeight = 40;
    TGE.Button.DefaultFont = "24px sans-serif";
    TGE.Button.DefaultIdleColor = "#FFF";
    TGE.Button.DefaultHoverColor = "#C4C4C4";

    //Go to the GameScreen after loading
    TGE.FirstGameWindow = GameScreen;
}

//MyGame functions
MyGame.prototype =
{
    //No global functions in this tutorial
}
extend(MyGame,TGE.Game);