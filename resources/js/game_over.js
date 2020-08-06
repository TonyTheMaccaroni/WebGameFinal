var Game_Over = {

    preload : function() {

        game.load.image('gameover', './img/gameover.png');
    },

    create : function() {


        this.add.button(0, 0, 'gameover', this.startGame, this);


        game.add.text(235, 350, "LAST SCORE", { font: "bold 16px sans-serif", fill: "#222222", align: "center"});
        game.add.text(350, 348, score.toString(), { font: "bold 20px sans-serif", fill: "#222222", align: "center" });

    },

    startGame: function () {


        this.state.start('Game');

    }

};