var Menu = {

    preload : function() 
    {
        game.load.image('start', './img/start.png');
    },

    create: function () 
    {
        this.add.button(0, 0, 'start', this.Startgame, this);
    },

    Startgame: function () 
    {
        this.state.start('Game');
    }

};