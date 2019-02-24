//setup the game area
const canvas = document.getElementById("gameArea");
const ctx = canvas.getContext("2d");
document.addEventListener("keydown", keyPush);
//set speed of snake to 100 ms
setInterval(game, 100);

//initial position of snake
playerX = playerY = 10;
gridSize = tileCount = 25;
foodX = foodY = 15;
//initial speed
speedX = speedY = 0;
trail = [];
//set initial size to 5
tail = 5;

function game() {
    playerX += speedX;
    playerY += speedY;

    //if snake goes out of bounds on left x = 0, make snake come out from right side
    if (playerX < 0) {
        console.log("tilecount -1");
        playerX = tileCount - 1;
    }

    //if snake goes out of bounds on right, make snake exit from left side
    if (playerX > tileCount - 1) {
        playerX = 0;
    }

    //if snake goes out of bounds on y = 0, make snake come out from bottom
    if (playerY < 0) {
        playerY = tileCount - 1;
    }

    //if snake goes out of bounds on bottom, make snake come out from upper boundary
    if (playerY > tileCount - 1) {
        playerY = 0;
    }

    //color canvas black
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //color snake yellow
    ctx.fillStyle = "yellow";
    //draw snake 5 tiles in length initially
    for (var i = 0; i < trail.length; i++) {
        ctx.fillRect(trail[i].x * gridSize, trail[i].y * gridSize, gridSize - 2, gridSize - 2);

        //if snake collides with tail, bring size back down to 5
        if (trail[i].x == playerX && trail[i].y == playerY) {
            tail = 5;
        }
    }

    trail.push({
        x: playerX,
        y: playerY
    });

    //return head position of snake
    while (trail.length > tail) {
        trail.shift();
    }

    //if snake finds food, increase size by 1 and show food on random place in the grid
    if (foodX == playerX && foodY == playerY) {
        tail++;
        foodX = Math.floor(Math.random() * tileCount);
        foodY = Math.floor(Math.random() * tileCount);
    }

    //color the fruit red and initialize size as one tile
    ctx.fillStyle = "red";
    ctx.fillRect(foodX * gridSize, foodY * gridSize, gridSize - 2, gridSize - 2);

}

//determine whihc key was pressed and change direction accordingly
function keyPush(event) {
    switch (event.keyCode) {
        case 37:
            speedX = -1;
            speedY = 0;
            break;
        case 38:
            speedX = 0;
            speedY = -1;
            break;
        case 39:
            speedX = 1;
            speedY = 0;
            break;
        case 40:
            speedX = 0;
            speedY = 1;
            break;

    }
}
