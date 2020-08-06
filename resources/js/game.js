var snake, fruit, grid, score, speed,
    updateDelay, direction, new_direction,
    addNew, keyControls, scoreTextValue, speedTextValue, textStyle_Key, textStyle_Value;

var Game = {

    preload : function() 
    {
        game.load.image('snake', 'resources/assets/snake.png');
        game.load.image('fruit', 'resources/assets/fruit.png');
    },

    create : function() 
    {
        snake = [];                     
        fruit = {};                     
        grid = 15;                
        score = 0;                      
        speed = 0;                     
        updateDelay = 0;               
        direction = 'right';            
        new_direction = null;           
        addNew = false;                 

        keyControls = game.input.keyboard.createCursorKeys();

        game.stage.backgroundColor = '#9BBC0F';

        for(var i = 0; i < 10; i++){
            snake[i] = game.add.sprite(150+i*grid, 150, 'snake');  // Parameters are (X coordinate, Y coordinate, image)
        }

        this.generatefruit();

        textStyle_Key = { font: "bold 14px sans-serif", fill: "#222222", align: "center" };
        textStyle_Value = { font: "bold 18px sans-serif", fill: "#222222", align: "center" };

        game.add.text(30, 20, "SCORE: ", textStyle_Key);
       	scoreTextValue = game.add.text(90, 18, score.toString(), textStyle_Value);       

    },

    update: function() 
    {

        if (keyControls.right.isDown && direction!='left')
        {
            new_direction = 'right';
        }
        else if (keyControls.left.isDown && direction!='right')
        {
            new_direction = 'left';
        }
        else if (keyControls.up.isDown && direction!='down')
        {
            new_direction = 'up';
        }
        else if (keyControls.down.isDown && direction!='up')
        {
            new_direction = 'down';
        }

        speed = Math.min(6, Math.floor(score/3));

        updateDelay++;

        if (updateDelay % (10 - speed) == 0) 
        {

            var firstCell = snake[snake.length - 1],
                lastCell = snake.shift(),
                oldLastCellx = lastCell.x,
                oldLastCelly = lastCell.y;

            if(new_direction)
            {
                direction = new_direction;
                new_direction = null;
            }

            if(direction == 'right')
            {

                lastCell.x = firstCell.x + 15;
                lastCell.y = firstCell.y;
            }
            else if(direction == 'left'){
                lastCell.x = firstCell.x - 15;
                lastCell.y = firstCell.y;
            }
            else if(direction == 'up'){
                lastCell.x = firstCell.x;
                lastCell.y = firstCell.y - 15;
            }
            else if(direction == 'down')
            {
                lastCell.x = firstCell.x;
                lastCell.y = firstCell.y + 15;
            }

            snake.push(lastCell);
            firstCell = lastCell;

            if(addNew)
            {
                snake.unshift(game.add.sprite(oldLastCellx, oldLastCelly, 'snake'));
                snake.unshift(game.add.sprite(oldLastCellx, oldLastCelly, 'snake'));
                snake.unshift(game.add.sprite(oldLastCellx, oldLastCelly, 'snake'));
                addNew = false;
            }

            this.fruitCollision();

            this.selfCollision(firstCell);

            this.wallCollision(firstCell);
        }


    },

    generatefruit: function()
    {

        var randomX = Math.floor(Math.random() * 35) * grid,
            randomY = Math.floor(Math.random() * 25) * grid;

        fruit = game.add.sprite(randomX, randomY, 'fruit');
    },

    fruitCollision: function() 
    {

        for(var i = 0; i < snake.length; i++){
            if(snake[i].x == fruit.x && snake[i].y == fruit.y){


                addNew = true;


                fruit.destroy();


                this.generatefruit();


                score++;


                scoreTextValue.text = score.toString();

            }
        }

    },

    selfCollision: function(head) 
    {

        for(var i = 0; i < snake.length - 1; i++)
        {
            if(head.x == snake[i].x && head.y == snake[i].y)
            {

                game.state.start('Game_Over');
            }
        }

    },

    wallCollision: function(head) 
    {

        if(head.x >= 640 || head.x < 0 || head.y >= 400 || head.y < 0)
        {

            game.state.start('Game_Over');
        }

    }

};