/*
    LOADING SCREEN
    The loading window automatically activates when the asset list is defined.
    This creates a loading window with basic progress text. Once the assets
    are loaded the game will transition to the GameScreen, as designated in the
    main game file using TGE.FirstGameWindow.
*/
Loading = function(width,height)
{
    //Loading screen constructor
    Loading.superclass.constructor.apply(this,arguments);

    //Set background color
    this.backgroundColor = "#FFF";

    //Loading text object
    this.loadingText = this.addChild(new TGE.Text().setup( {
        x:this.percentageOfWidth(0.5),
        y:this.percentageOfHeight(0.5),
        text:"LOADING 0%",
        font:"bold italic 50px sans-serif",
        color:"#0040FF"
    }));
    // Add an event listener for the progress update
    this.addEventListener("progress",this.progressCallback.bind(this));
}

//Loading screen functions
Loading.prototype =
{
    progressCallback: function(event){
        var text = event.percentComplete<1 ? "LOADING " + Math.round(event.percentComplete * 100).toString() + "%" : "";
        this.loadingText.text = text;
    }
}
extend(Loading,TGE.Window);